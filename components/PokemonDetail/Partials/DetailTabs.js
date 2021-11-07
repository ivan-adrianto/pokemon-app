import styled from "@emotion/styled";
import React, { useState } from "react";
import CatchPokemonTab from "./CatchPokemonTab";
import PokemonMovesTab from "./PokemonMovesTab";
import PokemonStatsTab from "./PokemonStatsTab";

const MainContainer = styled.div`
  background-color: white;
  width: calc(100vw - 15px);
  border-radius: 25px 25px 0px 0px;
  position: absolute;
  left: 7.5px;
  margin-top: 40px;
  min-height: calc(100vh - 350px);
  @media(min-width: 769px) {
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
  cursor: pointer;
  &:hover {
    color: ${props => props.theme.colors.black}
  }
`;

const TabHeader = styled.div`
  display: flex;
`;

function DetailTabs({ color, pokemon }) {
  const [activeTab, setActiveTab] = useState("catch");

  const getActiveTab = (tab) => {
    if (tab === "catch") {
      return <CatchPokemonTab pokemon={pokemon} />;
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
          onClick={() => setActiveTab("catch")}
          active={activeTab === "catch"}
        >
          Catch
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

export default DetailTabs;
