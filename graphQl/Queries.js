import { gql } from "@apollo/client";

export const GET_POKEMONS = gql`
  query pokemons($limit: Int, $offset: Int) {
    pokemons(limit: $limit, offset: $offset) {
      count
      nextOffset
      prevOffset
      status
      message
      results {
        id
        url
        name
        image
      }
    }
  }
`;

export const GET_POKEMON_DETAIL = gql`
  query pokemon($name: String!) {
    pokemon(name: $name) {
      id
      name
      base_experience
      height
      weight
      message
      stats {
        base_stat
        stat {
          name
        }
      }
      abilities {
        ability {
          name
        }
      }
      forms {
        name
        url
      }
      sprites {
        front_default
      }
      moves {
        move {
          name
        }
      }
      types {
        type {
          name
        }
      }
    }
  }
`;

export const GET_POKEMON_EVOLUTION = gql`
  query evolutionChain($id: String!) {
    evolutionChain(id: $id) {
      params
      status
      message
      response
    }
  }
`;
