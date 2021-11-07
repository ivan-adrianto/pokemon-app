import styled from "@emotion/styled";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { usePalette } from "react-palette";
import { idConverter } from "../../helpers/helpers";
import { Text, TextPill } from "./Text";

const Card = styled.div`
  position: relative;
  border-radius: 10px;
  background-color: ${(props) => (props.bgColor ? props.bgColor : "white")};
  height: 110px;
  width: calc(48% - 10px);
  margin-bottom: 10px;
  cursor: pointer;
  padding-left: 10px;
  &:nth-of-type(even): {
    margin-left: 10px;
  }
  @media (min-width: 1024px) {
    width: calc(24% - 10px);
    max-width: 300px;
    padding-left: 10px;
    margin: ${(props) => (props.margin ? "5px" : "0px")};
  }
`;

const CardImg = styled.img`
  position: absolute;
  right: 0px;
  bottom: -10px;
  z-index: 2;
`;

const PokeballBg = styled.img`
  position: absolute;
  right: 0px;
  bottom: 0px;
  z-index: 1;
`;

const PokemonNumber = styled.p`
  font-size: 28px;
  font-weight: 700;
  opacity: 0.3;
  color: white;
  position: absolute;
  top: 7px;
  @media (max-width: 769px) {
    top: 10px;
    left: 10px;
    font-size: 20px;
  }
`;

function CardList({ name, image, link, order, owned }) {
  const router = useRouter();
  const location = router.pathname;
  const { data } = usePalette(image);

  return (
    <Card margin bgColor={data?.vibrant} onClick={() => router.push(`${link}`)}>
      <Text white bold ptSm capitalize sizeLg="22px">
        {name}
      </Text>
      {location !== "/" ? (
        <PokemonNumber>{idConverter(order)}</PokemonNumber>
      ) : (
        <TextPill mt="5px" ml="-2px" size="12px">
          Owned: {owned}
        </TextPill>
      )}
      <CardImg src={image} />
      <PokeballBg src="pokeball-md.png" />
    </Card>
  );
}

export default CardList;
