import React from 'react'
import cn from 'classnames'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import MenuIcon from '@mui/icons-material/Menu';
import Image from 'next/image';
import { Tooltip } from '@mui/material';

import Artists from '../../Artists/Artists' //获取作者名
import AudioTimer from './AudioTimer' //获取播放时间
import ProgressBar from './ProgressBar' //获取进度条组件
import PlayRecord from './PlayRecord/playrecord' //获取播放记录组件
import PlayMode from './PlayMode' //获取播放模式组件
import PlayOperations from './PlayOperations/playoperations' //获取播放控制组件
import PlayVolume from './playvolumn' //获取音量控制组件
import { PlayMusicStateContext, PlayMusicDispatchContext, ACTIONS } from '../../../reducers/Music_Play' //获取音乐播放组件
import styles from './Footer.module.css'

const { useContext, useState, useCallback } = React

const Footer = () => {
  const [showPlayRecord, setShowPlayRecord] = useState(false)
  const dispatch = useContext(PlayMusicDispatchContext)
  const state = useContext(PlayMusicStateContext)
  const { musicId, music, showLyric } = state

  const togglePlayRecord = useCallback(() => {
    setShowPlayRecord(!showPlayRecord)
  }, [showPlayRecord, setShowPlayRecord])

  const handleShowLyric = useCallback(() => {
    dispatch({
      type: ACTIONS.SHOW_LYRIC,
    })
  }, [dispatch])

  const handleHideLyric = useCallback(() => {
    dispatch({
      type: ACTIONS.HIDE_LYRIC,
    })
  }, [dispatch])

  return (
    <div className={styles.root}>
      {musicId ? (
        <div className={styles.progressBar}>
          <ProgressBar />
        </div>
      ) : null}

      <div className={styles.songWrap}>
        {!!musicId && (
          <>
            <div className={cn(styles.pic, !showLyric && styles.showLyric)}>
              <img src={music?.picUrl ? `${music?.picUrl}?param=40y40` : undefined} loading='lazy' />
              {!showLyric && (
                <div className={styles.mask} onClick={handleShowLyric}>
                  <KeyboardArrowUpIcon />
                </div>
              )}
              {showLyric && (
                <div className={cn(styles.mask, styles.hideLyric)} onClick={handleHideLyric}>
                  <KeyboardArrowUpIcon />
                </div>
              )}
            </div>
            <div>
              <div className={styles.info}>
                <div className={styles.name}>{`${music?.name || '--'} -`}</div>
                <Artists artists={state?.music?.artists} />
              </div>
              <div className={styles.time}>
                <AudioTimer />
              </div>
            </div>
          </>
        )}
      </div>

      <div className={styles.operations}>
        <PlayOperations />
      </div>

      <div className={styles.otherOperations}>
        <div className={styles.item}>
          <PlayMode />
        </div>
        <div onClick={togglePlayRecord} className={styles.item}>
          <Tooltip title='打开播放列表'>
            <MenuIcon className={showPlayRecord ? 'active' : ''} />
          </Tooltip>
        </div>
        <div className={styles.item}>
          <PlayVolume />
        </div>
      </div>

      <PlayRecord show={showPlayRecord} onClickAway={() => setShowPlayRecord(false)} />
    </div>
  )
}

export default Footer
