import React from "react";
import classNames from "classnames";
import DownloadIcon from '@mui/icons-material/Download';
import VolumeMuteIcon from '@mui/icons-material/VolumeMute';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';

import VipIcon from "../VipIcon/vipicon";
import Table, {IColumn} from "../Table/table";
import { IMusic, IArtist, IAlbum, MUSIC_STATUS, MUSIC_TYPE } from '../../api/types/business'
import album from "../../api/album";
import {formatTime} from '../../helpers/time'
import { createMusic } from '../../helpers/business'
import { PlayMusicStateContext, PlayMusicDispatchContext, AudioContext, ACTIONS, IAudioContext } from '../../reducers/Music_Play'
import styles from './musiclist.module.css'
import { IState } from "../../reducers/Login";

interface IProps {
    data: IMusic[]
    onPlayAll?: (autoPlay?: boolean) => void
}
interface ButtonProps{
    info: IAudioContext
}

const { useContext } = React
function VolumnButton(props: ButtonProps){
    if(props.info.state?.paused){
        return <VolumeMuteIcon />
    }
    return <VolumeUpIcon />
}
const MusicList: React.FC<IProps> = ({ data, onPlayAll }) => {
    const state = useContext(PlayMusicStateContext)
    const dispatch = useContext(PlayMusicDispatchContext)
    const audioInfo = useContext(AudioContext)
    //定义列表中的一个音乐项目
    const columns: IColumn<IMusic, keyof IMusic>[] = [
        {
          title: '',
          key: 'name',
          width: '80px',
          render: (name: string, record: IMusic, index?: number) => {
            return (
              <div className={styles.operations}>
                {state.musicId === record.id ? (
                  <span className={styles.isPlaying}>
                    <VolumnButton info={audioInfo} />
                  </span>
                ) : (
                  <span className={styles.index}>{(index || 0) + 1}</span>
                )}
                <DownloadIcon />
              </div>
            )
          },
        },
        {
            title: '音乐标题',
            key: 'name',
            width: '45%',
            render: (name: string, { alias, id, fee }: IMusic) => {
              return (
                <>
                  <div className={classNames(styles.name, state.musicId === id && styles.active)}>
                    <span>{name}</span>
                    {fee === MUSIC_TYPE.VIP && <VipIcon />}
                  </div>
                  {alias?.length ? <div className={styles.alias}>{alias.join(' ')}</div> : null}
                </>
              )
            },
          },
          {
            title: '歌手',
            key: 'artists',
            width: '15%',
            render: (artists: IArtist[]) => artists?.map(({ name }) => name).join(' / '),
          },
          {
            title: '专辑',
            key: 'album',
            width: '20%',
            render: (album: IAlbum) => album?.name,
          },
          {
            title: '时长',
            key: 'duration',
            width: '10%',
            render: (duration: number) => formatTime(duration / 1000),
          },
    ] 

    const handleDoubleClick = async (item: IMusic) => {
        let { picUrl } = item
    
        if (!picUrl) {
          const result = await album.getAlbum(item.album.id)
          picUrl = result?.album.blurPicUrl
        }
    
        dispatch({
          type: ACTIONS.PLAY,
          payload: {
            musicId: item.id,
            music: createMusic({
              ...item,
              picUrl,
              duration: item.duration / 1000,
            }),
          },
        })
    
        onPlayAll && onPlayAll()
      }
    
      const checkIsRecordRowDisabled = (record: IMusic) => record.status === MUSIC_STATUS.NOT_FOUND

      return (
        <div>
          <Table<IMusic>
            columns={columns}
            data={data}
            onDoubleClick={handleDoubleClick}
            isRecordRowDisabled={checkIsRecordRowDisabled}
          />
        </div>
      )
}

export default MusicList