import styled from "@emotion/styled";
import { useRouter } from "next/dist/client/router";
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

function ReleasePokemonTab({ pokemon }) {
  const { nickname } = useRouter().query;
  const { setReleaseModal } = useContext(AppContext);

  const handleRelease = () => {
    setReleaseModal({
      show: true,
      pokemon: { pokemon },
      onClose: () => {
        setReleaseModal({ show: false, pokemon: {}, onClose: () => {} });
      },
    });
  };

  console.log(`pokemon`, pokemon);

  return (
    <MainContainer>
      <PokeballImage
        src="/pokeball-catch.png"
        alt="pokeball"
        height="70px"
        onClick={handleRelease}
      />
      <Text black bold mt>
        Tap the pokeball to release {toTitleCase(nickname)}
      </Text>
    </MainContainer>
  );
}

export default ReleasePokemonTab;
