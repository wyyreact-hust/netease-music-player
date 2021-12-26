import axios from '../../helpers/axios'
import { IAlbum } from './business'

export interface IGetAlbumResponse {
  album: IAlbum
  songs: any[]
}

