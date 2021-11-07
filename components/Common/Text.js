import styled from "@emotion/styled";

export const Text = styled.p`
  color: ${(props) =>
    props.black
      ? props.theme.colors.black
      : props.white
      ? "white"
      : props.theme.colors.grey};
  margin-bottom: ${(props) => (props.mb ? "1rem" : "0")};
  margin-top: ${(props) => (props.mt ? "1rem" : "0")};
  padding-bottom: ${(props) => (props.pb ? "1rem" : "0")};
  padding-top: ${(props) => (props.pt ? "1rem" : props.ptSm ? "5px" : "0")};
  padding-left: ${(props) => (props.pl ? "1rem" : props.plSm ? "10px" : "0")};
  text-align: ${(props) =>
    props.rightAligned ? "right" : props.center ? "center" : "left"};
  font-weight: ${(props) =>
    props.bold ? "700" : props.bolder ? "900" : "normal"};
  text-shadow: ${(props) =>
    props.shadow ? "0 0 2px rgba(255, 255, 255, 0.8)" : ""};
  font-size: ${(props) =>
    props.lg ? "30px" : props.md ? "1.75rem" : props.sm ? "1.25rem" : "1rem"};
  text-transform: ${(props) => (props.capitalize ? "capitalize" : "none")};
  @media (min-width: 769px) {
    text-align: ${(props) =>
      props.lgCentered
        ? "center"
        : props.rightAligned
        ? "right"
        : props.center
        ? "center"
        : "left"};
    font-size: ${(props) =>
      props.sizeLg
        ? props.sizeLg
        : props.lg
        ? "40px"
        : props.md
        ? "1.75rem"
        : props.sm
        ? "1.25rem"
        : "1rem"};
    padding-left: ${(props) => (props.pl ? "1rem" : props.plSm ? "5px" : "0")};
  }
`;

export const TextPill = styled.div`
  background-color: ${(props) =>
    props.bgColor ? props.bgColor : "rgba(255, 255, 255, 0.3)"};
  color: white;
  font-weight: 700;
  text-transform: capitalize;
  font-size: ${props => props.size ? props.size : "14px"};
  display: inline-block;
  border-radius: 38px;
  width: ${props => props.width ? props.width : "unset"};
  margin-right: 7px;
  margin-bottom: 10px;
  margin-top: ${props => props.mt ? props.mt : "0px"};
  margin-left: ${props => props.ml ? props.ml : "0px"};
  padding: 3px 10px;
  position: relative;
  z-index: 5;
  &:nth-last-of-type(1) {
    margin-right: 0px;
  }
  @media (min-width: 769px) {
    font-size: 14px;
  }
`;
