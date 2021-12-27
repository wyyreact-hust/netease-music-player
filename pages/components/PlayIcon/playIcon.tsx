import React from 'react'
import cn from 'classnames'
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import styles from './style.module.css'

interface IProps {
  className?: string
}

const PlayIcon: React.FC<IProps> = ({ className }) => {
  return (
    <div className={cn(styles.root, className)}>
      <PlayCircleIcon/>
    </div>
  )
}

export default PlayIcon
