import { NetworkStatus, useQuery } from "@apollo/client";
import styled from "@emotion/styled";
import { useRouter } from "next/dist/client/router";
import React, { useContext, useEffect } from "react";
import { usePalette } from "react-palette";
import { AppContext } from "../../context/AppContext";
import { GET_POKEMON_DETAIL } from "../../graphQl/Queries";
import Navbar from "../../layouts/Navbar";
import { Container } from "../Common/Container";
import LoadingSpinner from "../Common/LoadingSpinner";
import { Text, TextPill } from "../Common/Text";
import ModalCatchPokemon from "../Modals/ModalCatchPokemon";
import ModalError from "../Modals/ModalError";
import DetailTabs from "./Partials/DetailTabs";

const MainContainer = styled.div`
  background-color: ${(props) => (props.bgColor ? props.bgColor : "none")};
  min-height: 100vh;
  margin-top: -22px;
  @media (max-width: 769px) {
    margin-top: -110px;
  }
`;

const TypeSection = styled.div`
  display: flex;
  @media (min-width: 769px) {
    width: 100%;
    justify-content: center;
  }
`;

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 27px;
`;

const PokeballImageWrapper = styled.div`
  position: absolute;
  width: 100vw;
  display: flex;
  justify-content: center;
  z-index: 0;
`;

const DetailMainImage = styled.img`
  z-index: 1;
`;

const BriefWrapper = styled.div`
  position: relative;
  top: 80px;
  @media (min-width: 769px) {
    top: 30px;
  }
`;

function PokemonDetailModule() {
  const router = useRouter();
  const { pokemonName } = router.query;

  const { setErrorModal } = useContext(AppContext);

  const gqlVariables = { name: pokemonName };
  const { loading, error, data } = useQuery(GET_POKEMON_DETAIL, {
    variables: gqlVariables,
  });

  useEffect(() => {
    if (loading) return <p>Loading...</p>;
    if (error)
      return setErrorModal({
        show: true,
        message: error?.message,
        onClose: () => {
          setErrorModal({ show: false, message: "", onClose: () => {} }),
          router.push("/")
        }
      });
  }, [loading, error, data]);

  const {
    data: dataPalette,
    loading: loadingPalette,
    error: errorPalette,
  } = usePalette(data?.pokemon?.sprites?.front_default);

  return (
    <div>
      <Navbar />
      <MainContainer bgColor={dataPalette?.vibrant}>
        {loading ? (
          <LoadingSpinner fullpage />
        ) : (
          <Container>
            <BriefWrapper>
              <Text lg bold capitalize lgCentered>
                {data?.pokemon?.name}
              </Text>
              <TypeSection>
                {data?.pokemon?.types?.map((type, key) => (
                  <TextPill key={key}>{type?.type?.name}</TextPill>
                ))}
              </TypeSection>
              <ImageWrapper>
                <PokeballImageWrapper>
                  <img
                    src={"/pokeball-detail.png"}
                    alt="pokeball"
                    height="183px "
                  />
                </PokeballImageWrapper>
                <DetailMainImage
                  src={data?.pokemon?.sprites?.front_default}
                  alt="pokemon"
                  height="223px"
                />
              </ImageWrapper>
            </BriefWrapper>
            <DetailTabs color={dataPalette} pokemon={data?.pokemon} />
            <ModalCatchPokemon pokemon={data?.pokemon} />
            <ModalError message={error?.message} />
          </Container>
        )}
      </MainContainer>
    </div>
  );
}

export default PokemonDetailModule;
