import { graphql } from 'react-apollo'

export const getSonglistDetail = graphql.caller`
  query GetSonglistDetail($id: String) {
    getSonglistDetail(id: $id) {
      songlist {
        id
        name
        coverImgUrl
        createTime
        creator {
          nickname
          avatarUrl
        }
        tags
        trackCount
        playCount
        description
      }
      songs {
        id
        name
        fee
        artists {
          name
        }
        album {
          id
          name
        }
        duration
        picUrl
      }
    }
  }
`