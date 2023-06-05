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
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";


const network = WalletAdapterNetwork.Devnet;
const endpoint = "https://api.devnet.solana.com";

const wallets = [new PhantomWalletAdapter()];

function MyApp() {
  const { publicKey, connect } = useWallet();

  return (
    <div>
      <p>Public Key: {publicKey ? publicKey.toBase58() : "Not connected"}</p>
      <button onClick={() => connect()}>Connect</button>
    </div>
  );
}

function AppWithProvider() {
  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <MyApp />
      </WalletProvider>
    </ConnectionProvider>
  );
}


ReactDOM.render(<AppWithProvider />, document.getElementById("root"));

reportWebVitals();
