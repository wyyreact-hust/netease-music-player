import React from 'react'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';

import { PlayMusicStateContext, PlayMusicDispatchContext, AudioContext, ACTIONS } from '../../../../reducers/Music_Play'
import { playList as playListLocalStorage } from '../../../../helpers/play'
import styles from './playoperations.module.css'

const { useContext, useMemo, useCallback } = React
interface playButtonProps{
    isPaused: boolean | undefined
}
export function PlayButton(props: playButtonProps){
    if(typeof(props.isPaused) === undefined)
        return null;
    if(!props.isPaused)
        return <PauseIcon />
    return <PlayArrowIcon />
}

const PlayOperations = () => {
  const audioInfo = useContext(AudioContext)
  const { state: audioState, controls } = audioInfo

  const dispatch = useContext(PlayMusicDispatchContext)
  const state = useContext(PlayMusicStateContext)
  const { musicId } = state

  const playList = useMemo(() => playListLocalStorage.getItem(), [musicId])

  const togglePlayStatus = useCallback(() => {
    if (audioState?.paused) {
      controls?.play()
    } else {
      controls?.pause()
    }
  }, [audioState?.paused, controls])

  const play = useCallback(
    (prev?: boolean) => {
      const len = playList.length
      if (!len) {
        return
      }

      const index = playList.findIndex(({ id }) => id === musicId)
      let nextIndex = -1

      if (index > -1) {
        nextIndex = prev ? (index - 1 + len) % len : (index + 1) % len
      } else {
        nextIndex = 0
      }

      dispatch({
        type: ACTIONS.PLAY,
        payload: {
          musicId: playList[nextIndex].id,
          music: playList[nextIndex],
        },
      })
    },
    [playList, musicId, dispatch],
  )

  const playPrev = useCallback(() => play(true), [play])
  const playNext = useCallback(() => play(), [play])

  return (
    <>
      <div className={styles.prev} onClick={playPrev}>
          <ArrowBackIosIcon />
      </div>
      <div className={styles.pause} onClick={togglePlayStatus}>
        <PlayButton isPaused={audioInfo.state?.paused} />
      </div>
      <div className={styles.next} onClick={playNext}>
          <ArrowForwardIosIcon />
      </div>
    </>
  )
}

export default PlayOperations
