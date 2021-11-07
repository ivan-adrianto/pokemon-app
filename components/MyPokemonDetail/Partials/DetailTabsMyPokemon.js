import styled from "@emotion/styled";
import React, { useState } from "react";
import ReleasePokemonTab from "./RelasePokemonTab";
import PokemonMovesTab from "../../PokemonDetail/Partials/PokemonMovesTab";
import PokemonStatsTab from "../../PokemonDetail/Partials/PokemonStatsTab";

const MainContainer = styled.div`
  background-color: white;
  width: calc(100vw - 15px);
  border-radius: 25px 25px 0px 0px;
  position: absolute;
  left: 7.5px;
  margin-top: 40px;
  min-height: calc(100vh - 350px);
  @media (min-width: 769px) {
    width: calc(100vw - 15px);
  }
`;

const TabTitle = styled.div`
  color: ${(props) => (props.active ? "#303943" : "#B3B7BB")};
  padding: 40px 0px 20px 0px;
  border-bottom: ${(props) => (props.active ? "2px solid #6C79DB" : "none")};
  font-weight: 700;
  font-size: 16px;
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3;
  &:hover {
    color: ${props => props.theme.colors.black}
  }
`;

const TabHeader = styled.div`
  display: flex;
  cursor: pointer;
`;

function DetailTabsMyPokemon({ color, pokemon }) {
  const [activeTab, setActiveTab] = useState("release");

  const getActiveTab = (tab) => {
    if (tab === "release") {
      return <ReleasePokemonTab />;
    } else if (tab === "stats") {
      return <PokemonStatsTab pokemon={pokemon} />;
    } else {
      return <PokemonMovesTab pokemon={pokemon} color={color} />;
    }
  };
  return (
    <MainContainer>
      <TabHeader>
        <TabTitle
          onClick={() => setActiveTab("release")}
          active={activeTab === "release"}
        >
          Release
        </TabTitle>
        <TabTitle
          onClick={() => setActiveTab("stats")}
          active={activeTab === "stats"}
        >
          Base Stats
        </TabTitle>
        <TabTitle
          onClick={() => setActiveTab("moves")}
          active={activeTab === "moves"}
        >
          Moves
        </TabTitle>
      </TabHeader>
      {getActiveTab(activeTab)}
    </MainContainer>
  );
}

export default DetailTabsMyPokemon;
