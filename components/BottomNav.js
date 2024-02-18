import Link from "next/link";
import styled, { css } from "styled-components";
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
import Head from "next/head";

const StyledHeader = styled.header`
  background-color: #222;
  position: sticky;
  top: 0;
  z-index: 100;
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

const NavLinkContainer = styled.div`
  position: relative;
  display: inline-flex;
  color: #aaa;
  text-decoration: none;
  svg {
    height: 20px;
  }
  ${({ $active }) =>
    $active &&
    css`
      &::after {
        content: "";
        position: absolute;
        top: -10px;
        left: 50%;
        transform: translateX(-50%);
        width: 60px;
        height: 40px;
        background-color: #fff;
        padding-right: 50px;
        padding-left: 10px;
        border-radius: 12%;
      }
      svg {
        color: #000;
        position: relative;
        z-index: 1;
      }
      span {
        padding-left: 5px;
        padding-right: 5px;
        z-index: 1;
      }
    `}
`;

const CartCount = styled.span`
  position: absolute;
  top: -15px;
  right: -15px;
  background-color: red;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
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
  padding-left: 10px;
  svg {
    width: 20px;
    height: 20px;
  }
`;

const Logo = styled.span`
  color: #fff;
  font-size: large;
  text-decoration: none;
  cursor: pointer;
`;

const StyledLink = styled.span`
  display: inline-flex;
  color: #000;
  text-decoration: none;
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  font-size: 15px;
  padding: 5px;
  cursor: pointer;
  svg {
    margin-left: 5px;
  }
`;

const LogoImg = styled.img`
  width: 30px;
  height: 30px;
`;

export default function BottomNav() {
  const { cartProducts } = useContext(CartContext);
  const [name, setName] = useState("Sign In");
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      setName(session.user?.name ?? "Sign In");
    }
  }, [session]);

  const router = useRouter();

  // Function to get the title based on the path
  function getTitle(path, cartProducts) {
    switch (path) {
      case "/":
        return "Home | Parichay Designer";
      case "/products":
        return "Products | Parichay Designer";
      case "/search":
        return "Search | Parichay Designer";
      case "/categories":
        return "Categories | Parichay Designer";
      case "/bag":
        return `Bag (${cartProducts.length}) | Parichay Designer`;
      case "/account":
        return "Account | Parichay Designer";
      default:
        return "Parichay Designer";
    }
  }

  return (
    <StyledHeader>
      <Head>
        <title>{getTitle(router.pathname, cartProducts)}</title>
      </Head>
      <Center>
        <Wrapper>
          <Link
            href="/"
            passHref
            style={{ textDecoration: "none", paddingTop: "10px" }}
          >
            <Logo>Parichay Designer</Logo>
          </Link>
          <SideIcons>
            <Link href="/account" passHref>
              <StyledLink>
                {name}
                <AccountIcon />
              </StyledLink>
            </Link>
          </SideIcons>
        </Wrapper>
        <Wrapper>
          <BottomNavs>
            {[
              { href: "/", icon: <HomeIcon />, label: "Home" },
              { href: "/products", icon: <ProductIcon />, label: "Products" },
              { href: "/search", icon: <SearchIcon />, label: "Search" },
              {
                href: "/categories",
                icon: <CategoryIcon />,
                label: "Categories",
              },
              { href: "/bag", icon: <CartIcon />, label: "Bag" },
            ].map(({ href, icon, label }) => (
              <Link
                key={href}
                href={href}
                style={{ textDecoration: "none" }}
                passHref
              >
                <NavLinkContainer $active={router.pathname === href}>
                  {icon}
                  {router.pathname === href && (
                    <span
                      style={{
                        color: "#000",
                        zIndex: 1000,
                      }}
                    >
                      {label}
                    </span>
                  )}
                  {href === "/bag" && cartProducts.length > 0 && (
                    <CartCount>{cartProducts.length}</CartCount>
                  )}
                </NavLinkContainer>
              </Link>
            ))}
          </BottomNavs>
        </Wrapper>
      </Center>
    </StyledHeader>
  );
}
