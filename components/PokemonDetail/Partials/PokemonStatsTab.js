import styled from "@emotion/styled";
import React from "react";
import { toTitleCase } from "../../../helpers/helpers";

const MainContainer = styled.div`
  padding: 10px;
  margin: auto;
  display: flex;
  justify-content: center;
`;

const StatItem = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
`;

const StatTitle = styled.p`
  color: #303943;
  opacity: 60%;
  width: 70px;
  font-weight: 700;
  @media (min-width: 1024px) {
    width: 150px;
  }
`;

const StatNumber = styled.p`
  color: #303943;
  width: 35px;
  @media (min-width: 1024px) {
    width: 60px;
  }
`;

const StatProgress = styled.progress`
  -webkit-appearance: none;
  -moz-appearance: none;
  height: 5px;
  width: calc(100vw - 135px);
  max-width: 665px;
  &::-webkit-progress-bar {
    background-color: #ededed;
    height: 5px;
    border-radius: 2px;
  }
  &::-webkit-progress-value {
    background-color: ${(props) => (props.highValue ? "#4BC07A" : "#FB6C6C")};
    border-radius: 2px;
  }
  @media (min-width: 769px) {
    height: 10px;
    &::-webkit-progress-bar {
      height: 10px;
      border-radius: 5px;
    }
    &::-webkit-progress-value {
      border-radius: 5px;
    }
  }
`;

function PokemonStatsTab({ pokemon }) {
  return (
    <MainContainer>
      <div>
        {pokemon?.stats?.map((stat) => (
          <StatItem>
            <StatTitle>
              {stat?.stat?.name === "hp" ? "HP" : toTitleCase(stat?.stat?.name)}
            </StatTitle>
            <StatNumber>{stat?.base_stat}</StatNumber>
            <StatProgress
              max={150}
              value={stat?.base_stat}
              highValue={stat?.base_stat > 50}
            />
          </StatItem>
        ))}
      </div>
    </MainContainer>
  );
}

export default PokemonStatsTab;
