import styled from "@emotion/styled";
import React, { useContext } from "react";
import { AppContext } from "../../../context/AppContext";
import { toTitleCase } from "../../../helpers/helpers";
import { Text } from "../../Common/Text";

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 50px;
`;

const PokeballImage = styled.img`
  cursor: pointer;
  border-radius: 50%;
  border: 5px solid white;
  &:hover {
    border: 5px solid ${(props) => props.theme.colors.purple};
  }
`;
function CatchPokemonTab({ pokemon }) {
  const { toggleCatchModal } = useContext(AppContext);

  return (
    <MainContainer>
      <PokeballImage
        src="/pokeball-catch.png"
        alt="pokeball"
        height="70px"
        onClick={toggleCatchModal}
      />
      <Text black bold mt>
        Tap the pokeball to catch {toTitleCase(pokemon?.name)}
      </Text>
    </MainContainer>
  );
}

export default CatchPokemonTab;
