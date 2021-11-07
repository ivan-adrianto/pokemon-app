import styled from "@emotion/styled";

export const Button = styled.button`
  font-weight: 700;
  font-size: 15px;
  min-width: 100px;
  background-color: ${(props) => (props.danger ? "#DE5050" : "#5DC2A6")};
  margin: 5px 10px;
  height: 39px;
  border-radius: 12px;
  border: 0px;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => (props.danger ? "#ED7474" : "#77EDCC")};
  }
`;
