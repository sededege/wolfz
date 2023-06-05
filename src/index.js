import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import { initialState } from "./components/context/initialState";
import reducer from "./components/context/reducer";
import { StateProvider } from "./components/context/StateProvider";
import {
  ConnectionProvider,
  WalletProvider,
  useAnchorWallet,
  useWallet,
} from "@solana/wallet-adapter-react";
import {
  WalletDialogProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-material-ui";

/* import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
 */
import { PhantomWalletAdapter, SlopeWalletAdapter, SolflareWalletAdapter } from "@solana/wallet-adapter-wallets";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { AnimatePresence } from "framer-motion";

const endpoint = 'https://billowing-virulent-gas.solana-mainnet.quiknode.pro/cd78f9ac76e21ebc9a89b54ff106a19bff9ebdb9/';



const AppWithProvider = () => {
  const wallets = [new PhantomWalletAdapter(), new SlopeWalletAdapter(), new SolflareWalletAdapter()];

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletDialogProvider>
          <Router>
            <StateProvider initialState={initialState} reducer={reducer}>
              <AnimatePresence>
                <App />
              </AnimatePresence>
            </StateProvider>
          </Router>
        </WalletDialogProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

ReactDOM.render(<AppWithProvider />, document.getElementById("root"));

reportWebVitals();
