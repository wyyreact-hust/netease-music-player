import React from 'react'
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import ProgressBar from '../../ProgressBar/progressbar'
import { AudioContext } from '../../../reducers/Music_Play'
import styles from './style.module.css'
import VolumeMute from '@mui/icons-material/VolumeMute';

const { useContext, useMemo, useCallback } = React

const PlayVolume = () => {
  const audioInfo = useContext(AudioContext)
  const { state, controls } = audioInfo

  const handleBarClick = useCallback(
    (percent: number) => {
      controls?.volume(percent)
    },
    [controls],
  )

  const originDonePercent = useMemo(() => {
    const volume = Number((state?.volume || 0).toFixed(2))
    return Math.floor(volume * 100)
  }, [state?.volume])

  return (
    <div className={styles.root}>
      <VolumeMute />
      <div className={styles.progress}>
        <ProgressBar className={styles.bar} originDonePercent={originDonePercent} onBarClick={handleBarClick} />
      </div>
    </div>
  )
}

export default PlayVolume
