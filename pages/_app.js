import { CartContextProvider } from "@/components/CartContext";
import { createGlobalStyle } from "styled-components";
import { SessionProvider } from "next-auth/react";

const GlobalStyles = createGlobalStyle`
  body {
    background-color: #eee;
    padding: 0;
    margin: 0;
    font-family: 'Poppins', sans-serif;
  }
  hr {
    display: block;
    border: 0;
    border-top: 1px solid #ccc;
  }

  .highlight {
  position: absolute;
  bottom: 0;
  height: 4px; // Adjust as needed
  background-color: #fff;
  transition: left 0.3s ease, width 0.3s ease; // Smooth transition for movement and resizing
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
