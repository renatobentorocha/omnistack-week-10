import { gql } from "apollo-boost";

export const SEARCH_DEV = gql`
  query search($filter: DevSearch) {
    searchDevs(input: $filter) {
      _id
      name
      github_username
      bio
      avatar_url
      techs
      location {
        id
        coordinates
        type
      }
    }
  }
`;

export const DEV_ADDED = gql`
  subscription sub($devTechs: DevTechs) {
    devAdded(input: $devTechs) {
      _id
      name
      github_username
      bio
      avatar_url
      techs
      location {
        id
        coordinates
        type
      }
    }
  }
`;
