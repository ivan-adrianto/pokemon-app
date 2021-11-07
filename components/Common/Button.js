import styled from "@emotion/styled";

export const Button = styled.button`
  font-weight: 700;
  font-size: ${props => props.fontSize ? props.fontSize : "15px"};
  min-width: ${props => props.minWidth ? props.minWidth : "100px"};
  background-color: ${(props) => (props.danger ? "#DE5050" : "#5DC2A6")};
  margin: ${props => props.margin ? props.margin : "5px 10px"};
  padding: ${props => props.padding ? props.padding : "0px"};
  height: ${props => props.height ? props.height : "39px"};
  border-radius: 12px;
  z-index: ${props => props.zIndex ? props.zIndex : 'auto'};
  position: ${props => props.zIndex ? "relative" : "static"};
  border: 0px;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => (props.danger ? "#ED7474" : "#77EDCC")};
  }
`;
