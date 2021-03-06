import React from 'react'
import { useParams } from 'react-router-dom'
import { useLazyQuery } from '@apollo/client'


import Tabs from '../../components/Tabs'
import MusicList from '../../components/MusicList'
import BasicInfo from './BasicInfo/basicInfo'
import { createMusic } from '../../helpers/business'
import { getSonglistDetail } from '../../graphql/music'
import { IMusic } from '../../api/types/business'
import { PlayMusicDispatchContext, ACTIONS } from '../../reducers/Music_Play'
import styles from './style.module.css'
import CircularProgress from '@mui/material/CircularProgress';
const { useEffect, useContext } = React

const TABS = [
  {
    label: '歌曲列表',
    key: 'songlist',
  },
  {
    label: '评论',
    key: 'comment',
  },
]

const SonglistDetail = () => {
  const dispatch = useContext(PlayMusicDispatchContext)
  const params = useParams<IDictionary<string>>()
  const { songlistId } = params

  const [getSonglistDetailGql, { loading, data }] = useLazyQuery(getSonglistDetail, {
    onError: (error: { message: any }) => {
      alert(error.message)
    },
  })

  const result = data?.getSonglistDetail
  const songs = result?.songs as IMusic[]

  useEffect(() => {
    getSonglistDetailGql({
      variables: {
        id: songlistId,
      },
    })
  }, [songlistId])

  const playAll = (autoPlay?: boolean) => {
    const list = songs.map((item) => {
      return createMusic({
        ...item,
        duration: item.duration / 1000,
      })
    })

    dispatch({
      type: ACTIONS.SET_PLAY_LIST,
      payload: {
        playList: list,
      },
    })

    if (autoPlay) {
      dispatch({
        type: ACTIONS.PLAY,
        payload: {
          musicId: list[0].id,
          music: list[0],
        },
      })
    }
  }

  return (
    <div className={styles.root}>
      {loading ? (
        <CircularProgress/>
      ) : (
        <>
          <div className={styles.basicInfo}>
            <BasicInfo data={result?.songlist} onPlayAll={playAll} />
          </div>

          <div className={styles.content}>
            <div className={styles.tabs}>
              <Tabs tabs={TABS} />
            </div>
            <MusicList data={songs} onPlayAll={playAll} />
          </div>
        </>
      )}
    </div>
  )
}

export default SonglistDetail
