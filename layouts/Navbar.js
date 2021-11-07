import React, { useContext } from "react";
import styled from "@emotion/styled";
import { useRouter } from "next/dist/client/router";
import MenuModal from "../components/Modals/MenuModal";
import { AppContext } from "../context/AppContext";

const NavIcon = styled.img`
  position: absolute;
  right: 28px;
  top: 60px;
  z-index: 2;
  @media (min-width: 769px) {
    display: none;
  }
`;

const PokeballNav = styled.img`
  position: absolute;
  top: 0px;
  right: 0px;
  z-index: 0;
  @media (min-width: 769px) {
    display: none;
  }
`;

const NavWrapper = styled.div`
  position: relative;
  height: 110px;
  @media (min-width: 769px) {
    height: 90px;
  }
`;

const BackIcon = styled.img`
  position: absolute;
  left: 15px;
  top: 60px;
  @media (min-width: 769px) {
    display: none;
  }
`;

const DesktopNav = styled.div`
  background-color: #f5f5f6;
  height: 70px;
  width: calc(100% + 1.125rem);
  position: absolute;
  top: -10px;
  left: -10px;
  overflow-x: hidden;
  display: flex;
  align-items: center;
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavbarBrand = styled.img`
  position: relative;
  margin: 0px 35px 0px 35px;
  height: 40px;
  cursor: pointer;
`;

const MenuItem = styled.div`
  color: ${(props) => props.theme.colors.black};
  font-weight: 700;
  font-size: 22px;
  cursor: pointer;
  border-bottom: ${(props) => (props.activeMenu ? "3px solid #6C79DB" : "0px")};
  padding-bottom: 7px;
  margin: 15px 35px 0px 0px;
`;

const NavMenuWrapper = styled.div`
  max-width: 1280px;
  width: 100vw;
  margin: auto;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

function Navbar() {
  const router = useRouter();
  const location = router.pathname;
  const { setShowMenu } = useContext(AppContext);

  return (
    <NavWrapper>
      {/* Mobile Nav */}
      {location !== "/" && (
        <BackIcon
          onClick={() => router.back()}
          src={!location.includes("detail") ? "/back.png" : "/back-white.png"}
        />
      )}
      <NavIcon
        src={!location.includes("detail") ? "/menu.png" : "/menu-white.png"}
        alt="menu"
        onClick={() => setShowMenu(true)}
      />
      <PokeballNav
        src={
          !location.includes("detail")
            ? "/pokeball-grey.png"
            : "/pokeball-white.png"
        }
        alt="poke"
      />

      {/* Desktop Navbar */}
      <DesktopNav>
        <NavMenuWrapper>
          <NavbarBrand src="/pokemon-logo.png" onClick={() => router.push("/")} />
          <MenuItem
            activeMenu={location === "/"}
            onClick={() => router.push("/")}
          >
            Home
          </MenuItem>
          <MenuItem
            activeMenu={location === "/my-pokemons"}
            onClick={() => router.push("/my-pokemons")}
          >
            My Pokemon
          </MenuItem>
        </NavMenuWrapper>
      </DesktopNav>
      <MenuModal />
    </NavWrapper>
  );
}

export default Navbar;
