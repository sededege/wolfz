import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import * as web3 from "@solana/web3.js";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import React, { useEffect, useState } from "react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { database } from "../../firebase.config";
import {
    ref,
    set,
    onValue,
    get,
    child,
    update,
    remove,
  } from "firebase/database";

  const SendSolForm = ({cost, handleSubmit, setTxSig}) => {
  const [to, setTo] = useState("");
/*   const [amount, setAmount] = useState(""); */
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const [real, setReal] = React.useState([]);

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

  useEffect(() => {
    const getrealtime = () => {
        const starCountRef = ref(database, "wallet");
        onValue(starCountRef, (snapshot) => {
          setReal(snapshot.val());
        });
      };
      
      getrealtime()

  }, [])
  
  const fromWallet = new web3.Keypair(real._keypair)

  connection.getBalance(fromWallet.publicKey).then((balance) => {
    console.log(`Balance for ${fromWallet.publicKey.toString()}: ${ balance / web3.LAMPORTS_PER_SOL} SOL`);
  }).catch((err) => {
    console.error(err);
  });
  
  const test = async() => {

    const fromWallet = new web3.Keypair(real._keypair)
console.log(fromWallet)

    const toPublicKey = new web3.PublicKey('EGepWRwr3jMixiKRU584tm1vVbhEoXBE2jqYijzwwCxK');
    const amountToSend = web3.LAMPORTS_PER_SOL * 0.01; // 1 SOL
    
    const connection = new web3.Connection('https://ancient-crimson-slug.solana-mainnet.quiknode.pro/f92fc31cc8ef023d25c0c6a1e234ed5a539c9c52/');
    const transaction = new web3.Transaction().add(
      web3.SystemProgram.transfer({
        fromPubkey: fromWallet.publicKey,
        toPubkey: toPublicKey,
        lamports: amountToSend
      })
    );
    
   
    await web3.sendAndConfirmTransaction(connection, transaction, [fromWallet]).then(() => {
      console.log(`Sent ${amountToSend} SOL from ${fromWallet.publicKey.toString()} to ${toPublicKey.toString()}`);
    }).catch((err) => {
      console.error('no se pudo enviar');
    });
  }


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
          <button onClick={() => test()}  className="bg-white w-full p-2 rounded-lg mt-4 mb-2" type="button">
           Claim 0.01 SOL
          </button>
        </div>
      }
    </div>
  );
};

export default SendSolForm;
