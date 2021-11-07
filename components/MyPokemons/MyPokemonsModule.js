import { useQuery } from "@apollo/client";
import styled from "@emotion/styled";
import React, { useContext, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { GET_POKEMONS } from "../../graphQl/Queries";
import { Container } from "../Common/Container";
import LoadingSpinner from "../Common/LoadingSpinner";
import { Text } from "../Common/Text";
import CardList from "../Common/CardList";
import Navbar from "../../layouts/Navbar";
import ModalReleasePokemon from "../Modals/ModalReleasePokemon";
import { AppContext } from "../../context/AppContext";

const CardListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  @media (min-width: 769px) {
    justify-content: flex-start;
  }
`;

const EmptyList = styled.div`
  height: 300px;
  width: 100%;
  margin-top: 60px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: ${props => props.theme.colors.grey};
  color: ${(props) => props.theme.colors.black};
`;

const EmptyListWrapper = styled.div`
  position: absolute;
`;
function MyPokemonsModule() {
  const { releaseModal } = useContext(AppContext)
  const [pokemons, setPokemons] = useState([]);
  useEffect(() => {
    setPokemons(JSON.parse(localStorage.getItem("myPokemon")));
  }, [releaseModal]);

  return (
    <div>
      <Navbar />
      <Container>
        <Text black bold lg mb>
          My Pokemons List
        </Text>
        <CardListContainer>
          {pokemons?.length < 1 ? (
            <EmptyList>
              <Text bold lg black center>...</Text>
              <Text bold lg black center>
                It's empty here
              </Text>
              <Text bold sm black center mt>
                You don't have any Pokemon yet
              </Text>
            </EmptyList>
          ) : (
            pokemons?.map((pokemon, key) => (
              <CardList
                image={pokemon?.pokemon?.sprites?.front_default}
                name={pokemon?.nickname}
                link={`/my-pokemon-detail/${pokemon?.nickname}`}
                key={key}
                pokemon={pokemon}
              />
            ))
          )}
        </CardListContainer>
        <ModalReleasePokemon/>
      </Container>
    </div>
  );
}

export default MyPokemonsModule;
