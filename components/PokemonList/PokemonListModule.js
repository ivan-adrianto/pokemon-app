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
import ModalError from "../Modals/ModalError";
import { AppContext } from "../../context/AppContext";

const CardListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  @media (min-width: 769px) {
    justify-content: flex-start;
  }
`;

const ListTitle = styled.div`
  @media (min-width: 769px) {
    display: none;
  }
`;
function PokemonListModule() {
  const [nextOffset, setNextOffset] = useState(0);
  const [activePage, setActivePage] = useState(0);
  const [pokemons, setPokemons] = useState([]);
  const [firstRender, setFirstRender] = useState(true);

  const gqlVariables = {
    limit: 20,
    offset: activePage,
  };

  const { setErrorModal } = useContext(AppContext);

  const { loading, error, data } = useQuery(GET_POKEMONS, {
    variables: gqlVariables,
  });

  useEffect(() => {
    if (loading) return <p>Loading...</p>;
    if (error)
      return setErrorModal({
        show: true,
        message: error?.message,
        onClose: () => 
          setErrorModal({ show: false, message: "", onClose: () => {} }),
      });
    const myPokemon = JSON.parse(localStorage.getItem("myPokemon"));

    let newPokemons = pokemons
      .concat(data.pokemons.results)
      ?.map((pokemon) => ({
        ...pokemon,
        owned: myPokemon.filter(
          (localPokemon) => localPokemon?.pokemon?.id === pokemon?.id
        )?.length,
      }));
    setPokemons(newPokemons);
    setNextOffset(data.pokemons.nextOffset);
    setFirstRender(false);
  }, [loading, error, data]);

  console.log(`pokemons`, pokemons);

  return (
    <div>
      <Navbar />
      <Container mt="5px" lgMt="-10px" padding="0px">
        <ListTitle>
          <Text black bold lg mb>
            Pokemon App
          </Text>
        </ListTitle>
        {loading && firstRender && !error ? (
          <LoadingSpinner fullpage />
        ) : (
          <InfiniteScroll
            pageStart={0}
            loadMore={() => setActivePage(nextOffset)}
            hasMore={true}
            loader={loading ? <LoadingSpinner key={0} /> : null}
          >
            <CardListContainer>
              {pokemons.map((pokemon, key) => (
                <CardList
                  key={key}
                  image={pokemon?.image}
                  name={pokemon?.name}
                  link={`pokemon-detail/${pokemon?.name}`}
                  owned={pokemon?.owned}
                />
              ))}
            </CardListContainer>
          </InfiniteScroll>
        )}
        <ModalError message={error?.message} />
      </Container>
    </div>
  );
}

export default PokemonListModule;
