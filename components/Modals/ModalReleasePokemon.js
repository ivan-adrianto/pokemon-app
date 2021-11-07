import styled from "@emotion/styled";
import { useRouter } from "next/dist/client/router";
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { toTitleCase } from "../../helpers/helpers";
import { Button } from "../Common/Button";
import LoadingSpinner from "../Common/LoadingSpinner";
import { Text } from "../Common/Text";

const ModalContainer = styled.div`
  z-index: 5;
  height: 100vh;
  width: 100vw;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: ${(props) => (props.show ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  @media (min-width: 769px) {
    height: calc(100vh + 105px);
  }
`;

const ModalContent = styled.div`
  min-height: 350px;
  background-color: white;
  width: 88%;
  max-width: 300px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0px 10px;
`;

const PokeballRelease = styled.img`
  height: 115px;
  margin: 15px 0px;
`;

const ButtonWrapper = styled.div`
  display: flex;
`;

function ModalReleasePokemon() {
  const { releaseModal, setReleaseModal } = useContext(AppContext);
  const pokemon = releaseModal?.pokemon?.pokemon;

  const router = useRouter();
  const nickname = router.query?.nickname || releaseModal?.pokemon?.nickname;

  const [loadingRelease, setLoadingRelease] = useState(false);
  const [successRelease, setSuccessRelease] = useState(false);

  const closeReleaseModal = () => {
    setLoadingRelease(false);
    setReleaseModal({ show: false, pokemon: {} });
    setSuccessRelease(false);
    router.push("/my-pokemons/");
  };

  const releasePokemon = () => {
    setLoadingRelease(true);
    const myPokemon = JSON.parse(localStorage.getItem("myPokemon"));
    const newPokemon = myPokemon?.filter(
      (pokemon) => pokemon.nickname !== nickname
    );
    localStorage.setItem("myPokemon", JSON.stringify(newPokemon));
    setTimeout(() => {
      setLoadingRelease(false);
      setSuccessRelease(true);
    }, 1000);
  };

  const cancelRelease = () => {
    setReleaseModal({ show: false, pokemon: {}, onClose: () => {} });
  };

  const renderLoading = () => {
    return (
      <>
        <LoadingSpinner />
        <Text black bold pl md center>
          Releasing {toTitleCase(nickname)}...
        </Text>
      </>
    );
  };

  const renderSuccessRelease = () => {
    return (
      <>
        <Text black bold sm center>
          {toTitleCase(nickname)} has been released
        </Text>
        <PokeballRelease
          src={"/pokeball-open.png"}
          height="150px"
          alt={nickname}
        />
        <Button onClick={closeReleaseModal}>OK</Button>
      </>
    );
  };

  const renderConfirm = () => {
    return (
      <>
        <Text black bold sm center>
          Are you sure to release {toTitleCase(nickname)}?
        </Text>
        <img
          src={pokemon?.sprites?.front_default}
          height="150px"
          alt={"pokemon"}
        />
        <ButtonWrapper>
          <Button onClick={releasePokemon} danger>Release</Button>
          <Button onClick={cancelRelease}>Cancel</Button>
        </ButtonWrapper>
      </>
    );
  };

  const renderContent = () => {
    if (loadingRelease) {
      return renderLoading();
    } else if (successRelease) {
      return renderSuccessRelease();
    } else {
      return renderConfirm();
    }
  };

  return (
    <ModalContainer show={releaseModal?.show}>
      <ModalContent>{renderContent()}</ModalContent>
    </ModalContainer>
  );
}

export default ModalReleasePokemon;
