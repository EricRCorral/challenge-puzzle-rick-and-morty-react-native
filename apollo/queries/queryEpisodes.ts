import {gql} from '@apollo/client'

const queryEpisodes = gql`
  query($name: FilterEpisode, $page: Int) {
    episodes(filter: $name, page: $page) {
      result {
        id
        name
        air_date
        episode
        characters {
          name
          image
          id
        }
      }
      info {
        pages
        next
      }
    }
  }
`;

export default queryEpisodes;
