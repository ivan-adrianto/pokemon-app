import styled from "@emotion/styled";
import { useRouter } from "next/dist/client/router";
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { toTitleCase } from "../../helpers/helpers";
import { Button } from "../Common/Button";
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

function ModalError({ message }) {
  const router = useRouter();
  const { pokemonName } = router.query;

  const { toggleErrorModal, showErrorModal } = useContext(AppContext);

  const closeError = () => {
    toggleErrorModal(false);
    router.pathname !== "/"  && router.push("/");
  };

  const errorConverter = () => {
    if (message === "Failed to fetch") {
      return "Please check your connection";
    } else if (message === "Request failed with status code 404") {
      return `There's no pokemon with name ${toTitleCase(pokemonName)} `;
    } else {
      return "Something went wrong. Try again later...";
    }
  };

  return (
    <ModalContainer show={showErrorModal}>
      <ModalContent>
        <Text black bold sm center>
          Error
        </Text>
        <Text black bold center>
          {errorConverter()}
        </Text>
        <FailedIconWrapper>
          <img src={"/cross.png"} height="30px" alt={"failed"} />
        </FailedIconWrapper>
        <ButtonWrapper>
          <Button onClick={closeError}>OK</Button>
        </ButtonWrapper>
      </ModalContent>
    </ModalContainer>
  );
}

export default ModalError;
