import {
  ThirdwebProvider,
  metamaskWallet,
  embeddedWallet,
} from "@thirdweb-dev/react";
import { createGlobalStyle } from "styled-components";
import { CartContextProvider } from "../components/CartContext";
import "../styles/globals.css";

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
  body{
    background-color: #eee;
    padding:0;
    margin:0;
    font-family: 'Poppins', sans-serif;
  }
`;

const activeChain = "sepolia";
function MyApp({ Component, pageProps }) {
  return (
    <ThirdwebProvider
      activeChain={activeChain}
      clientId={process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID}
      supportedWallets={[
        metamaskWallet(),
        embeddedWallet({
          auth: {
            options: ["google", "facebook", "email"],
          },
        }),
      ]}
    >
      <GlobalStyles />
      <CartContextProvider>
        <Component {...pageProps} />
      </CartContextProvider>
    </ThirdwebProvider>
  );
}

export default MyApp;
