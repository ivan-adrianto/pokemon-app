import styled from "@emotion/styled";
import { useRouter } from "next/dist/client/router";
import React, { useContext } from "react";
import { usePalette } from "react-palette";
import { AppContext } from "../../context/AppContext";
import { Button } from "./Button";
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

const ButtonWrapper = styled.div`
  position: absolute;
  bottom: 10px;
`;

function CardList({ name, image, link, owned, pokemon }) {
  const router = useRouter();
  const location = router.pathname;

  const { setReleaseModal } = useContext(AppContext);
  const { data } = usePalette(image);

  const handleRelease = (e) => {
    e.cancelBubble = true;
    if (e.stopPropagation) {
      e.stopPropagation();
    }
    setReleaseModal({ show: true, pokemon });
  };

  return (
    <Card margin bgColor={data?.vibrant} onClick={() => router.push(`${link}`)}>
      <Text white bold ptSm capitalize sizeLg="22px">
        {name}
      </Text>
      {location !== "/" ? (
        <ButtonWrapper>
          <Button
            minWidth="unset"
            margin="0px"
            fontSize="12px"
            height="20px"
            zIndex="5"
            padding="3px 10px 5px 10px"
            danger
            onClick={(e) => handleRelease(e)}
          >
            Release
          </Button>
        </ButtonWrapper>
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
