import React from 'react'
import { useNavigate } from 'react-router-dom' // v6中useHistory被useNavigate替代
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


import Searcher from './Searcher/searcher'
import { PlayMusicStateContext, PlayMusicDispatchContext, ACTIONS } from '../../../reducers/Music_Play'
import { REPOSITORY } from '../../../constants/github'
import styles from './style.module.css'

const { useContext } = React

const Header = () => {
  const history = useNavigate()
  const dispatch = useContext(PlayMusicDispatchContext)
  const state = useContext(PlayMusicStateContext)
  const { showLyric } = state

  const handleGoBack = () => history(-1)
  const handleGoForward = () => history(1)

  const hideLyric = () => {
    dispatch({
      type: ACTIONS.HIDE_LYRIC,
    })
  }

  return (
    <div className={styles.root}>
      <div className={styles.actions}>
        <div className={styles.iconsWrap}>
          {showLyric && (
            <div className={styles.down} onClick={hideLyric}>
              <ExpandMoreIcon />
            </div>
          )}
        </div>
        {!showLyric && (
          <div className={styles.backForward}>
            <div onClick={handleGoBack}>
              <ChevronLeftIcon />
            </div>
            <div onClick={handleGoForward}>
              <ChevronRightIcon />
            </div>
          </div>
        )}
      </div>

      <div className={styles.content}>
        <div className={styles.operations}>
          <Searcher />
          <div className={styles.githubLogo} onClick={() => window.open(REPOSITORY)} />
        </div>
      </div>
    </div>
  )
}

export default Header
