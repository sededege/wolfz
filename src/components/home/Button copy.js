import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import * as web3 from "@solana/web3.js";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { FC, useState } from "react";

const SendSolForm = ({cost, handleSubmit, setTxSig}) => {
  const [to, setTo] = useState("");
/*   const [amount, setAmount] = useState(""); */
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
/*   const link = () => {
    return txSig
      ? `https://explorer.solana.com/tx/${txSig}?cluster=devnet`
      : "";
  }; */

  const sendSol = (event) => {
    /*   event.preventDefault() */
    if (!connection || !publicKey) {
      return;
    }
    const transaction = new web3.Transaction();
    const recipientPubKey = new web3.PublicKey('FZdtDwHhnh4Ja18Ma4i27uu2KbL5NgPHm7GXwk1hxHuK');

    const sendSolInstruction = web3.SystemProgram.transfer({
      fromPubkey: publicKey,
      toPubkey: recipientPubKey,
      lamports: LAMPORTS_PER_SOL * 0.01,
    });

    transaction.add(sendSolInstruction);
    sendTransaction(transaction, connection).then((sig) => {
      setTxSig(sig);
    });
  };

  return (
    <div>
      {/*  {
                publicKey ?
            <>
                        <label htmlFor="amount">Amount (in SOL) to send:</label>
                        <input id="amount" type="text" onChange={(e) => setAmount(e.target.value)} value={amount}  placeholder="e.g. 0.1" required />
                        <br />
                        <label htmlFor="recipient">Send SOL to:</label>
                        <input id="recipient" type="text" onChange={(e) => setTo(e.target.value)} value={to} placeholder="e.g. 4Zw1fXuYuJhWhu9KLEYMhiPEiqcpKd6akw3WRZCv84HA" required />
                        <button onClick={() => sendSol()} type="submit">Send</button>
                        </>  :
                    <span>Connect Your Wallet</span>
            } */}
      {
        <div>
          <button onClick={() => sendSol()}  className="bg-white w-full p-2 rounded-lg mt-4 mb-2" type="button">
            Pay {cost} SOL
          </button>
        </div>
      }
    </div>
  );
};

export default SendSolForm;
