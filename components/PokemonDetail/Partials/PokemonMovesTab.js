import styled from "@emotion/styled";
import React from "react";
import { kebabToCapitalize } from "../../../helpers/helpers";
import { TextPill } from "../../Common/Text";

const MainContainer = styled.div`
  padding: 20px 10px;
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
  max-width: 900px;
  margin: auto;
`;
function PokemonMovesTab({ pokemon, color }) {

  return (
    <MainContainer>
      {pokemon?.moves?.map((move, key) => (
        <TextPill key={key} bgColor={color?.vibrant} >{kebabToCapitalize(move?.move?.name)}</TextPill>
      ))}
    </MainContainer>
  );
}

export default PokemonMovesTab;
