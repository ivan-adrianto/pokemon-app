import styled from "@emotion/styled";
import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import { usePalette } from "react-palette";
import Navbar from "../../layouts/Navbar";
import { Container } from "../Common/Container";
import { Text, TextPill } from "../Common/Text";
import ModalReleasePokemon from "../Modals/ModalReleasePokemon";
import DetailTabs from "./Partials/DetailTabsMyPokemon";

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

function MyPokemonDetailModule() {
  const { nickname } = useRouter().query;

  const [dataPokemon, setDataPokemon] = useState({});

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("myPokemon"))?.find(
      (pokemon) => pokemon?.nickname === nickname
    );
    setDataPokemon(data);
  }, [nickname]);

  const { data: dataPalette } = usePalette(
    dataPokemon?.pokemon?.sprites?.front_default
  );

  return (
    <div>
      <Navbar />
      <MainContainer bgColor={dataPalette?.vibrant}>
        <Container>
          <BriefWrapper>
            <Text lg bold capitalize lgCentered>
              {dataPokemon?.nickname}
            </Text>
            <TypeSection>
              {dataPokemon?.pokemon?.types?.map((type, key) => (
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
                src={dataPokemon?.pokemon?.sprites?.front_default}
                alt="pokemon"
                height="223px"
              />
            </ImageWrapper>
          </BriefWrapper>
          <DetailTabs color={dataPalette} pokemon={dataPokemon?.pokemon} />
          <ModalReleasePokemon pokemon={dataPokemon?.pokemon} />
        </Container>
      </MainContainer>
    </div>
  );
}

export default MyPokemonDetailModule;
