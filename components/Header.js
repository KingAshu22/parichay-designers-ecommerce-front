import Link from "next/link";
import styled from "styled-components"; // Corrected the import
import Center from "./Center";
import { useContext, useState } from "react";
import { CartContext } from "./CartContext";
import SearchIcon from "./icons/SearchIcon";

const StyledHeader = styled.header`
  background-color: #222;
  position: sticky;
  top: 0;
  z-index: 10;
`;

const Logo = styled.span`
  color: #fff;
  text-decoration: none;
  position: relative;
  z-index: 3;
  cursor: pointer;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
`;

const StyledNav = styled.nav`
  display: "block";
  gap: 15px;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 70px 20px 20px;
  background-color: #222;
  @media screen and (min-width: 768px) {
    display: flex;
    position: static;
    padding: 0;
  }
`;

const NavLink = styled.span`
  display: block;
  color: #aaa;
  text-decoration: none; // Ensure no underline
  cursor: pointer;
  svg {
    padding-top: 10%;
    height: 20px;
  }
  padding: 10px 0;
  @media screen and (min-width: 768px) {
    padding: 0;
  }
`;

const SideIcons = styled.div`
  display: flex;
  align-items: center;
  svg {
    width: 14px;
    height: 14px;
    color: white; // Ensure SVG icons are white
    cursor: pointer; // Make icons look clickable
  }
`;

const Links = styled(Link)`
  text-decoration: none;
`;

export default function Header() {
  const { cartProducts } = useContext(CartContext);

  return (
    <StyledHeader>
      <Center>
        <Wrapper>
          <Links href="/" passHref>
            <Logo>Parichay Designer</Logo>
          </Links>
          <StyledNav>
            {["/", "/products", "/categories", "/account", "/cart"].map(
              (path, index) => (
                <Links key={index} href={path} passHref>
                  <NavLink>
                    {path === "/" && "Home"}
                    {path === "/products" && "All Products"}
                    {path === "/categories" && "Categories"}
                    {path === "/account" && "Account"}
                    {path === "/cart" && `Cart (${cartProducts.length})`}
                  </NavLink>
                </Links>
              )
            )}
          </StyledNav>
          <SideIcons>
            <Links href="/search" passHref>
              <SearchIcon />
            </Links>
          </SideIcons>
        </Wrapper>
      </Center>
    </StyledHeader>
  );
}
