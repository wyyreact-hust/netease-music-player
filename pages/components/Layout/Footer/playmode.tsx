import React from 'react'
import { Tooltip } from '@mui/material';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import ShuffleOutlinedIcon from '@mui/icons-material/ShuffleOutlined';
import RepeatOneOutlinedIcon from '@mui/icons-material/RepeatOneOutlined';

import { MODE } from '../../../helpers/play'
import { PlayMusicStateContext, PlayMusicDispatchContext, ACTIONS } from '../../../reducers/Music_Play'
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'

const MODE_ORDER = [MODE.PLAY_IN_ORDER, MODE.SINGLE_CYCLE, MODE.SHUFFLE_PLAYBACK]

const MODE_MAP: IDictionary<{
  label: string
  icon: ReactJSXElement
}> = {
  [MODE.PLAY_IN_ORDER]: {
    label: '顺序播放',
    icon: <FormatListBulletedIcon />,
  },
  [MODE.SINGLE_CYCLE]: {
    label: '单曲循环',
    icon: <RepeatOneOutlinedIcon />,
  },
  [MODE.SHUFFLE_PLAYBACK]: {
    label: '随机播放',
    icon: <ShuffleOutlinedIcon />,
  },
}

const { useContext, useCallback } = React

const PlayMode = () => {
  const dispatch = useContext(PlayMusicDispatchContext)
  const state = useContext(PlayMusicStateContext)
  const { playMode } = state

  const handleClick = useCallback(() => {
    const idx = MODE_ORDER.findIndex((m) => m === playMode)
    const nextMode = MODE_ORDER[(idx + 1) % MODE_ORDER.length]

    dispatch({
      type: ACTIONS.SET_PLAY_MODE,
      payload: {
        playMode: nextMode,
      },
    })
  }, [dispatch, playMode])

  return (
    <Tooltip title={MODE_MAP[playMode].label}>
        {MODE_MAP[playMode].icon}
    </Tooltip>
  )
}

export default PlayMode
