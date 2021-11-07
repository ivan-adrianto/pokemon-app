import styled from "@emotion/styled";
import React from "react";

const SpinnerWrapper = styled.div`
  width: 100%;
  height: ${(props) => (props.fullpage ? "calc(100vh - 300px)" : "auto")};
  display: flex;
  align-items: center;
  justify-content: center;
`;
function LoadingSpinner({ fullpage }) {
  return (
    <SpinnerWrapper fullpage={fullpage}>
      <img src="/pokeball.gif" alt="pokeball" height="100px" />
    </SpinnerWrapper>
  );
}

export default LoadingSpinner;
