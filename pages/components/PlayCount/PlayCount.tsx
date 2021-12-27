import React from 'react'
import cn from 'classnames'
import PlayCircleIcon from '@mui/icons-material/PlayCircle';

import { formatNum } from '../../helpers/num'
import styles from './style.module.css'

interface IProps {
  count: number
  className?: string
}

const PlayCount: React.FC<IProps> = ({ count, className }) => {
  return (
    <div className={cn(styles.root, className)}>
      <PlayCircleIcon/>
      {formatNum(count)}
    </div>
  )
}

export default PlayCount
