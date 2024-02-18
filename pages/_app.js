import { CartContextProvider } from "@/components/CartContext";
import { createGlobalStyle } from "styled-components";
import { SessionProvider } from "next-auth/react";

const GlobalStyles = createGlobalStyle`
  body {
    background-color: #eee;
    padding: 0;
    margin: 0;
    font-family: "Fredoka", sans-serif;
    font-optical-sizing: auto;
    font-style: normal;
    font-variation-settings:
    "wdth" 100;
  }
  hr {
    display: block;
    border: 0;
    border-top: 1px solid #ccc;
  }

  .desktop-header {
  display: none;
}

.mobile-bottom-nav {
  display: block;
}

@media (min-width: 768px) {
  .desktop-header {
    display: block;
  }

  .mobile-bottom-nav {
    display: none;
  }
}
`;

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <>
      <GlobalStyles />
      <SessionProvider session={session}>
        <CartContextProvider>
          <Component {...pageProps} />
        </CartContextProvider>
      </SessionProvider>
    </>
  );
}
