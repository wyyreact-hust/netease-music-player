import React from 'react'
import { ISonglist } from '../../../api/types/business'
import Image from 'next/image';
import { formatDatetime } from '../../../helpers/time'
import { formatNum } from '../../../helpers/num'
import styles from './style.module.css'

interface IProps {
  data?: ISonglist
  onPlayAll: (autoPlay?: boolean) => void
}

const BasicInfo: React.FC<IProps> = ({ data, onPlayAll }) => {
  return (
    <div className={styles.root}>
      <div className={styles.pic}>
        {data?.coverImgUrl && <Image src={data?.coverImgUrl} alt="" className='cover' loading='lazy' />}
      </div>

      <div className={styles.info}>
        <div className={styles.title}>
          <div className={styles.tag}>歌单</div>
          <div className={styles.name}>{data?.name}</div>
        </div>

        <div className={styles.creator}>
          <div className={styles.avatar}>
            {data?.creator?.avatarUrl && <Image src={`${data?.creator?.avatarUrl}?param=25y25`} alt="" loading='lazy' />}
          </div>
          <div className={styles.name}>{data?.creator.nickname}</div>
          <div>{formatDatetime(data?.createTime)}创建</div>
        </div>

        <div className={styles.operations}>
          <div className={styles.btn} onClick={() => onPlayAll(true)}>
            播放全部
          </div>
        </div>

        <div className={styles.detail}>
          <div>
            <span className={styles.label}>标签: </span>
            {data?.tags.join(' / ') || '--'}
          </div>
          <div>
            <span className={styles.label}>歌曲数: </span>
            {data?.trackCount}&nbsp;&nbsp;
            <span className={styles.label}>播放数: </span>
            {formatNum(data?.playCount)}
          </div>
          <div>
            <span className={styles.label}>简介: </span>
            {data?.description || '--'}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BasicInfo
