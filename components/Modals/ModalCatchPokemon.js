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
  overflow-y: hidden;
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
  width: 90%;
  max-width: 300px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const InputName = styled.input`
  width: 80%;
  border-radius: 15px;
  height: 39px;
  padding-left: 15px;
  margin: 10px 0px;
  border-color: rgb(122, 122, 122, 0.3);
  &:focus {
    border-radius: 15px;
    outline: none;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
`;

const FailedIconWrapper = styled.div`
  background-color: #fb6c6c;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: 100px;
  margin: 25px;
`;

const FormInput = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

function ModalCatchPokemon({ pokemon }) {
  const { pokemonName } = useRouter().query;

  const { toggleCatchModal, showCatchModal, setErrorModal, errorModal } =
    useContext(AppContext);

  const [loadingCatch, setLoadingCatch] = useState(true);
  const [successSave, setSuccessSave] = useState(false);
  const [isCaught, setIsCaught] = useState(false);
  const [nickname, setNickname] = useState("");

  useEffect(() => {
    if (showCatchModal) {
      setTimeout(() => {
        Math.random() > 0.5 ? setIsCaught(true) : setIsCaught(false);
        setLoadingCatch(false);
      }, 1500);
    }
  }, [showCatchModal]);

  const closeCatchModal = () => {
    setIsCaught(false);
    setLoadingCatch(true);
    toggleCatchModal();
    setSuccessSave(false);
  };

  const savePokemon = (e) => {
    e.preventDefault();
    const newPokemon = {
      nickname,
      pokemon,
    };
    const myPokemon = JSON.parse(localStorage.getItem("myPokemon"));
    const isNicknameExist = myPokemon.find(
      (pokemon) =>
        pokemon?.nickname?.toLowerCase() === newPokemon?.nickname?.toLowerCase()
    );
    if (isNicknameExist) {
      setErrorModal({
        show: true,
        message: `You're already have pokemon with nickname ${toTitleCase(nickname)}. Try another nickname!`,
        onClose: () =>
          setErrorModal({ show: false, message: "", onClose: () => {} }),
      });
    } else {
      myPokemon?.push(newPokemon);
      localStorage.setItem("myPokemon", JSON.stringify(myPokemon));
      setSuccessSave(true);
    }
  };

  const renderLoading = () => {
    return (
      <>
        <LoadingSpinner />
        <Text black bold pl md center>
          Catching {toTitleCase(pokemonName)}...
        </Text>
      </>
    );
  };

  const renderSuccessCatch = () => {
    return (
      <>
        <Text black bold sm center>
          Congratulations! You did it!
        </Text>
        <Text black bold center>
          Give it a nickname!
        </Text>
        <img
          src={pokemon?.sprites?.front_default}
          height="150px"
          alt={pokemonName}
        />
        <FormInput onSubmit={savePokemon}>
          <InputName
            type="text"
            required
            placeholder="Enter your pokemon's nickname here"
            onChange={(e) => setNickname(e.target.value)}
          />
          <ButtonWrapper>
            <Button type="submit">OK</Button>
            <Button danger onClick={closeCatchModal}>
              Release
            </Button>
          </ButtonWrapper>
        </FormInput>
      </>
    );
  };

  const renderFailedCatch = () => {
    return (
      <>
        <Text black bold sm center>
          Failed to catch {toTitleCase(pokemonName)}
        </Text>
        <Text black bold center>
          Try again next time!
        </Text>
        <FailedIconWrapper>
          <img src={"/cross.png"} height="30px" alt={"failed"} />
        </FailedIconWrapper>
        <ButtonWrapper>
          <Button onClick={closeCatchModal}>OK</Button>
        </ButtonWrapper>
      </>
    );
  };

  const renderSuccessSave = () => {
    return (
      <>
        <Text black bold sm center>
          {toTitleCase(nickname)} has been added to your pokemon list!
        </Text>
        <img
          src={pokemon?.sprites?.front_default}
          height="150px"
          alt={"pokemon"}
        />
        <ButtonWrapper>
          <Button onClick={closeCatchModal}>OK</Button>
        </ButtonWrapper>
      </>
    );
  };

  const renderContent = () => {
    if (loadingCatch) {
      return renderLoading();
    } else if (successSave) {
      return renderSuccessSave();
    } else if (isCaught) {
      return renderSuccessCatch();
    } else {
      return renderFailedCatch();
    }
  };

  const handleCloseError = () => {
    setErrorModal(false);
  };

  return (
    <ModalContainer show={showCatchModal}>
      <ModalContent>{renderContent()}</ModalContent>
    </ModalContainer>
  );
}

export default ModalCatchPokemon;
