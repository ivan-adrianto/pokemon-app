import styled from "@emotion/styled";

export const Container = styled.div`
  padding: ${(props) => (props.padding ? props.padding : "0px 15px")};
  background-color: ${(props) => (props.bgColor ? props.bgColor : "none")};
  max-width: 1240px;
  margin: auto;
  margin-top: ${(props) => (props.mt ? props.mt : "0px")};
  @media (min-width: 769px) {
    margin-top: ${(props) =>
      props.lgMt ? props.lgMt : props.mt ? props.mt : "0px"};
  }
`;
