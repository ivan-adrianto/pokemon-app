import styled from "@emotion/styled";
import { useRouter } from "next/dist/client/router";
import React, { useContext, useEffect, useRef } from "react";
import { AppContext } from "../../context/AppContext";

const MenuContainer = styled.div`
  @keyframes menu-appear {
    0% {
      transform: scaleY(0.8);
    }
    100% {
      transform: scaleY(1);
    }
  }
  background-color: white;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  height: 67px;
  width: 170px;
  position: absolute;
  right: 28px;
  top: 60px;
  padding: 10px 0px 17px 0px;
  display: ${(props) => (props.show ? "block" : "none")};
  animation: menu-appear 70ms linear;
  transform: scaleY(1);
  transform-origin: top;
  z-index: 6;
`;

const MenuItem = styled.div`
  font-size: 16px;
  font-weight: 700;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  padding: 7px 10px;
  cursor: pointer;
  color: #303943;
  &:hover {
    background-color: ${(props) => props.theme.colors.purple};
    color: white;
  }
  &:nth-of-type(1) {
    border-bottom: 0px;
  }
`;

function MenuModal() {
  const router = useRouter();

  const { setShowMenu, showMenu } = useContext(AppContext);

  const menuRef = useRef();

  const handleCloseMenu = (e) => {
    if (menuRef?.current?.contains(e.target)) {
      return;
    }
    setShowMenu(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleCloseMenu);
    return () => {
      document.removeEventListener("mousedown", handleCloseMenu);
    };
  }, []);

  const handleMenu = (target) => {
    setShowMenu(false)
    router.push(target)
  };

  return (
    <MenuContainer ref={menuRef} show={showMenu}>
      <MenuItem onClick={() => handleMenu("/")}>Home</MenuItem>
      <MenuItem onClick={() => handleMenu("/my-pokemons")}>
        My Pokemons
      </MenuItem>
    </MenuContainer>
  );
}

export default MenuModal;
