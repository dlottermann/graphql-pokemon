import { ApolloClient, InMemoryCache } from '@apollo/client';
import { gql } from "@apollo/client";

export const client = new ApolloClient({
  uri: "https://graphql-pokemon.now.sh/",
  cache: new InMemoryCache()
});

export const GET_ALL = gql`
  query getAll($first: Int!) {
    pokemons(first: $first) {
      id
      name
      image
      types
      attacks {
        fast{
          name
          type
          damage
        }
        special {
          name
          type
          damage
        }
      }
    }
  }
`;



export const GET = gql`
  query get($name: String!) {
    pokemon(name: $name) {
      id
      name
      image
      types
      attacks {
        fast{
          name
          type
          damage
        }
        special {
          name
          type
          damage
        }
      }
    }
  }
`;