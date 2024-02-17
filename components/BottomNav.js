import Link from "next/link";
import { styled, css } from "styled-components";
import Center from "./Center";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "./CartContext";
import SearchIcon from "./icons/SearchIcon";
import HomeIcon from "./icons/HomeIcon";
import ProductIcon from "./icons/ProductIcon";
import AccountIcon from "./icons/AccountIcon";
import CartIcon from "./icons/CartIcon";
import { useRouter } from "next/router";
import CategoryIcon from "./icons/CategoryIcon";
import { useSession } from "next-auth/react";

const StyledHeader = styled.header`
  background-color: #222;
  position: sticky;
  top: 0;
  z-index: 100;
`;

const Logo = styled(Link)`
  color: #fff;
  text-decoration: none;
  position: relative;
  z-index: 3;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 20px;
`;

const BottomNavs = styled.nav`
  display: flex;
  justify-content: space-around;
  gap: 15px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px 20px 20px;
  background-color: #222;
`;

const NavLink = styled(Link)`
  position: relative;
  display: block;
  color: #aaa;
  text-decoration: none;
  svg {
    height: 20px;
  }
  ${({ active }) =>
    active &&
    css`
      &::after {
        content: "";
        position: absolute;
        top: -10px; // Adjust as needed
        left: 50%;
        transform: translateX(-50%);
        width: 60px; // Adjust size as needed
        height: 40px; // Adjust size as needed
        background-color: #fff;
        border-radius: 20%;
      }
      svg {
        color: #000;
        position: relative;
        z-index: 1;
      }
    `}
`;

const CartCount = styled.span`
  position: absolute;
  top: -15px; // Adjust as needed
  right: -15px; // Adjust as needed
  background-color: red;
  color: white;
  border-radius: 50%;
  width: 20px; // Adjust size as needed
  height: 20px; // Adjust size as needed
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  z-index: 10;
`;

const SideIcons = styled.div`
  display: inline-flex;
  align-items: center;
  background-color: #fff;
  border-radius: 8%;
  a {
    display: inline-block;
    min-width: 20px;
    color: #000;
    padding-left: 10px;
    svg {
      width: 20px;
      height: 20px;
    }
  }
  span {
    margin-top: -100px;
    padding: 0;
  }
`;

const StyledLink = styled(Link)`
  border: 0;
  padding: 5px 0;
  border-radius: 5px;
  cursor: pointer;
  display: inline-flex;
  text-decoration: none;
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  font-size: 15px;
  svg {
    height: 16px;
    margin-right: 5px;
  }
  box-sizing: border-box;
`;

export default function BottomNav() {
  const { cartProducts } = useContext(CartContext);
  const [name, setName] = useState("Sign In");
  const { data: session } = useSession();

  useEffect(() => {
    if (!session) {
      return;
    }
    setName(session?.user?.name);
  }, [session]);

  const router = useRouter();
  const { pathname } = router;

  return (
    <StyledHeader>
      <Center>
        <Wrapper>
          <Logo href={"/"}>Parichay Designer</Logo>
          {/* <StyledNav mobileNavActive={mobileNavActive}>
            <NavLink href={"/"}>Home</NavLink>
            <NavLink href={"/products"}>All Products</NavLink>
            <NavLink href={"/categories"}>Categories</NavLink>
            <NavLink href={"/account"}>Account</NavLink>
            <NavLink href={"/cart"}>Cart ({cartProducts.length})</NavLink>
          </StyledNav>*/}
          <SideIcons>
            <StyledLink href={"/account"}>
              {name}
              <AccountIcon />
            </StyledLink>
          </SideIcons>
        </Wrapper>
        <Wrapper>
          <BottomNavs>
            <NavLink href={"/"} active={pathname === "/"}>
              <HomeIcon />
            </NavLink>
            <NavLink href={"/products"} active={pathname === "/products"}>
              <ProductIcon />
            </NavLink>
            <NavLink href={"/search"} active={pathname === "/search"}>
              <SearchIcon />
            </NavLink>
            <NavLink href={"/categories"} active={pathname === "/categories"}>
              <CategoryIcon />
            </NavLink>
            <NavLink href="/cart" active={pathname === "/cart"}>
              <CartIcon />
              {cartProducts.length > 0 && (
                <CartCount>{cartProducts.length}</CartCount>
              )}
            </NavLink>
          </BottomNavs>
        </Wrapper>
      </Center>
    </StyledHeader>
  );
}
