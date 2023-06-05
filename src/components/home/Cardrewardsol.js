import React from "react";
import { Tweet } from "react-twitter-widgets";
import { GiTwoCoins } from "react-icons/gi";
import Countdown from "react-countdown";
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
import { useWallet } from "@solana/wallet-adapter-react";
import { getUser, updatePoints, getdata } from "../utils/firebaseFunctions";
import Swal from "sweetalert2/dist/sweetalert2.js";
import solscan from ".././img/solscan.png";
 import * as web3 from '@solana/web3.js';
import { Buffer } from 'buffer';

const Cardrewardsol = ({ id, pointsuser, upd, number }) => {
  global.Buffer = Buffer;
  const { publicKey } = useWallet();
  const [modal, setModal] = React.useState(false);
  const [modalsort, setModalSort] = React.useState(false);
  const [winners2, setWinners] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [isVisible, setIsVisible] = React.useState(true);

  /*  const [qtysort, setQtySort] = React.useState(
    data && parseInt(data.qtywinners)
  ); */
  const [buying, setBuying] = React.useState(false);
  const [real, setReal] = React.useState([]);
  const [user, setUser] = React.useState(null);
  const [error, setError] = React.useState(false);
  const whitelist = [
    "EGepWRwr3jMixiKRU584tm1vVbhEoXBE2jqYijzwwCxK",
    "BZeYLWwXLzKBYA7E3om8J1ShmSZ2VQz2c19yM8RrMhe3",
    "AK3EpwLuTLsRqoMDz2hqCv5rq6tPfaWcVSNqKcrY7sGK",
    "z624HRfLVoPUCcGZmaRXctwzoYJ2qCmb1CxBHSbEKqn",
  ];

  const [count, setCount] = React.useState(0);

  function UnitCounter() {
    const handleIncrement = () => {
      setCount(count + 1);
    };

    const handleDecrement = () => {
      if (count > 0) {
        setCount(count - 1);
      }
    };

    return (
      <div className="gap-2 flex">
        <button
          className="bg-btn text-white p-2 rounded-lg "
          onClick={handleDecrement}
        >
          -
        </button>
        <input
          className="w-[30px] text-center bg-transparent border-2 border-slate-500 rounded-lg text-white mx-auto"
          type="text"
          defaultValue={count}
        />
        <button
          className="bg-btn text-white p-2 rounded-lg"
          onClick={handleIncrement}
        >
          +
        </button>
      </div>
    );
  }

  const getrealtime = (postId) => {
    const starCountRef = ref(database, "raffles/" + postId + "/sales");
    onValue(starCountRef, (snapshot) => {
      setReal(snapshot.val());
    });
  };

  function updaterealtime(uid) {
  

   

    (async () => {
      // Connect to cluster
      var connection = new web3.Connection(web3.clusterApiUrl("devnet"));
      // Construct a `Keypair` from secret key
      var from = web3.Keypair.generate();
      // Generate a new random public key
      var to = web3.Keypair.generate();
      // Add transfer instruction to transaction
      var transaction = new web3.Transaction().add(
          web3.SystemProgram.transfer({
              fromPubkey: from.publicKey,
              toPubkey: to.publicKey,
              lamports: web3.LAMPORTS_PER_SOL / 100,
          })
      );
      // Sign transaction, broadcast, and confirm
      var signature = await web3.sendAndConfirmTransaction(
          connection,
          transaction,
          [from]
      );
      console.log("SIGNATURE", signature);
      console.log("SUCCESS");
  })();

    if (pointsuser - data.price * count >= 0) {
      /*    const datapoints = {
        id: publicKey && publicKey.toBase58(),
        points: pointsuser - (data.price*count),
      };
      updatePoints(datapoints); */

      setBuying(true);
      setTimeout(() => {
        setBuying(false);
      }, 2000);
      // Write the new post's data simultaneously in the posts list and the user's post list.
      const updates = {};
      let qty = [];
      for (let index = 0; index < count; index++) {
        qty.push(publicKey.toBase58());
      }
      /*  console.log(qty)
      console.log(real) */
      updates["/raffles/" + uid + "/sales"] = qty.concat(real); /* [].concat(
        [publicKey.toBase58()],
        buyed) */

      /*   asd(); */

      setCount(0);
      upd();
      return update(ref(database), updates);
    } else {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 5000);
    }
  }
  function updaterealtimeespecial(uid) {
    // Write the new post's data simultaneously in the posts list and the user's post list.
    const updates = {};
    console.log(real);
    const news = real.filter(
      (a) => !a.includes("AK3EpwLuTLsRqoMDz2hqCv5rq6tPfaWcVSNqKcrY7sGK")
    );
    updates["/raffles/" + uid + "/sales"] = news;

    asd();

    upd();
    return update(ref(database), updates);
  }

  function updatewinners(uid, selected) {
    // Write the new post's data simultaneously in the posts list and the user's post list.
    const updates = {};
    updates["/raffles/" + uid + "/winner"] = selected;

    /* [].concat(
      [publicKey.toBase58()],
      buyed) */

    /*   asd(); */

    upd();
    return update(ref(database), updates);
  }
  function updatefinish(uid) {
    // Write the new post's data simultaneously in the posts list and the user's post list.
    const updates = {};
    updates["/raffles/" + uid + "/state"] = "finished";
    updates["/raffles/" + uid + "/snapshot"] = Date.now();

    /* [].concat(
      [publicKey.toBase58()],
      buyed) */

    /*   asd(); */

    upd();
    return update(ref(database), updates);
  }
  function updatetx(uid, tx, index) {
    // Write the new post's data simultaneously in the posts list and the user's post list.
    const updates = {};
    updates["/raffles/" + uid + "/winner/" + index + "/transaction"] = tx;
    /* [].concat(
      [publicKey.toBase58()],
      buyed) */

    /*   asd(); */

    upd();
    return update(ref(database), updates);
  }

  function writeholder(tokenAddress) {
    set(ref(database, "raffles/" + tokenAddress + "/sales"), {
      wallt: "test",
    });
  }

  const asd = async () => {
    setUser(await getUser(publicKey.toBase58()));
  };

  const getdata = (userId) => {
    const dbRef = ref(database);
    get(child(dbRef, `raffles/${userId}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setData(snapshot.val());
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  React.useEffect(() => {
    getdata(id);
    getrealtime(id);

    publicKey && asd();

    const intervalId = setInterval(() => {
      setIsVisible((prevState) => !prevState);
    }, 500);

    return () => clearInterval(intervalId);
  }, [publicKey]);

  const sort = (real) => {
    if (data.state === "live") {
      const winners = [];
      while (winners && winners.length < data.qtywinners) {
        const randomIndex = Math.floor(Math.random() * real.length);
        if (!winners.includes(randomIndex)) {
          winners.push(randomIndex);
        }
      }

      // Now winners array contains 5 unique random indexes
      // We can select the winners from the original array
      const selectedWinners = winners.map((winnerIndex) => ({
        name: real[winnerIndex],
        transaction: "",
      }));
      setWinners([]);
      setWinners(selectedWinners);
      updatewinners(id, selectedWinners);
      updatefinish(id);
    }
  };

  const calculatetickets = (arr, target) => {
    let count = 0;

    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === target) {
        count++;
      }
    }

    return count;
  };

  const InputTx = ({ index }) => {
    const [tx, setTx] = React.useState([]);

    return (
      <div className="flex">
        <input
          type="text"
          defaultValue={tx}
          onChange={(e) => setTx(e.target.value)}
          className=" px-2 ml-2 rounded-l-lg shadow-md "
          placeholder="Input the Tx"
        />
        <button
          onClick={() => updatetx(id, tx, index)}
          className="bg-tesmo2 text-white p-2 rounded-r-lg"
        >
          Send
        </button>
      </div>
    );
  };

  const deleteraffle = (uid) => {
    const taskref = ref(database, `/raffles/${uid}`);
    remove(taskref);
    getdata(id);
  };

  return (
    <>
      {data.state === "live" && data.type === "solana" && (
        <div className="bg-tesmo border-2 border-purple-500 bg-opacity-80 rounded-lg p-4">
          <div className="flex justify-between items-center">
            {whitelist.includes(publicKey && publicKey.toBase58()) && (
              <button
                onClick={() => deleteraffle(id)}
                className="bg-red-400 text-white p-2 rounded-lg mb-4"
              >
                Delete
              </button>
            )}
            <h1 className="text-white font-bold mb-4">
              Raffle # {number + 1}{" "}
            </h1>
            <h1 className="text-white font-bold mb-4 flex gap-2">
              Live{" "}
              <div className="w-2">
                <span
                  className={`blinking-point ${
                    isVisible ? "visible" : "hidden"
                  }`}
                />
              </div>
            </h1>
          </div>
          <img src={data && data.image} className="rounded-lg w-180" />

          <p className="text-center text-[1rem] text-white font-bold mt-2 mb-2">
            {data.name}
          </p>
          <p className="text-center text-[0.8rem] justify-between flex px-4 text-slate-400 mt-2 mb-2">
            <span className="font-bold">Tickets:</span> {real ? real.length : 0}
            /{data.supply}
          </p>
          <div className="text-center text-[0.8rem]  justify-between flex px-4 text-slate-400 mt-2 mb-2">
            <span className="font-bold">Price:</span>
            <div className="flex items-center gap-2 justify-center">
              <GiTwoCoins className="text-purple-500 text-[1.2rem]" />
              <p className="text-yellow-300 font-bold">{data.price} SOL</p>
            </div>
          </div>
          <div className="text-center text-[0.8rem] justify-between flex px-4 text-slate-400 mt-2 mb-2">
            <span className="font-bold">Countdown:</span>

            {data.time && (
              <Countdown
                className="text-white font-semibold"
                date={
                  parseInt(data?.snapshot) + parseInt(data?.time)
                  /*  Date.now() + 10000 */
                }
/*                 onComplete={() => sort(real)}
 */              />
            )}

            {/*  <Countdown
          className="text-white font-semibold"
          date={Date.now() + 12300}
        /> */}
            {/* <p>{data.time}</p> */}
          </div>
          {publicKey && (
            <div className="text-center text-[0.8rem] justify-between flex px-4 text-slate-400 mt-2 mb-2">
              <span className="font-bold">Your tickets:</span>
              <p>{real ? calculatetickets(real, publicKey?.toBase58()) : 0}</p>
            </div>
          )}
          {real ? (
            data.winner ? (
              <div className="text-center text-[0.8rem] justify-between flex px-4 text-slate-400 mt-2 mb-2">
                <span className="font-bold">Winner:</span>
                <button
                  onClick={() => setModal(true)}
                  className="bg-green-300 px-2 rounded-lg text-tesmo"
                >
                  Show
                </button>
              </div>
            ) : (
              <></>
            )
          ) : (
            <></>
          )}

          <div className="flex items-center gap-2 mx-auto justify-center">
            {/*   <p className="text-white">Winner:</p>
        <p className="text-white font-bold">
          {publicKey.toBase58().slice(0, 20)}
        </p> */}
          </div>

          <div className="flex gap-2 mt-4 flex-col">
            {error && (
              <p className="text-center text-[0.8rem] text-red-500">
                Not enough points. Lock your NFTs to earn points.
              </p>
            )}

            {publicKey && !buying ? (
              real?.length - data.supply === 0 ? (
                <button
                  /*                 onClick={() => updaterealtime(id)}
                   */ className="bg-btn text-white font-semibold hover:bg-tesmo2 border-2 border-btn hover:border-tesmo2 hover:text-white w-full rounded-lg text-center p-2 cursor-pointer"
                >
                  Sold out
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <UnitCounter />
                  <button
                    onClick={() => updaterealtime(id)}
                    className="bg-yellow-300 text-tesmo font-semibold hover:bg-tesmo2 border-2 border-yellow-300 hover:border-tesmo2 hover:text-white w-full rounded-lg text-center p-2 cursor-pointer"
                  >
                    Buy in SOL
                  </button>
                  {/*   <button
                onClick={() => updaterealtimeespecial(id)}
                className="bg-yellow-300 text-tesmo font-semibold hover:bg-tesmo2 border-2 border-yellow-300 hover:border-tesmo2 hover:text-white w-full rounded-lg text-center p-2 cursor-pointer"
              >
                update
              </button> */}
                </div>
              )
            ) : (
              publicKey && (
                <button className="bg-tesmo2 border:tesmo2 text-white font-semibold hover:bg-tesmo2 border-2 border-tesmo2 hover:border-tesmo2 hover:text-white w-full rounded-lg text-center p-2 cursor-pointer">
                  Buying...
                </button>
              )
            )}

            {whitelist.includes(publicKey?.toBase58()) && (
              <div className="flex gap-2">
                {/*  <button
              onClick={() => setModal(!modal)}
              className="bg-green-300 text-[0.8rem] font-semibold text-tesmo w-full rounded-lg text-center p-2 cursor-pointer"
            >
              Show Entries
            </button> */}
                {/*  <button
              onClick={() => setModal(!modal)}
              className="bg-red-500 text-[0.8rem] font-semibold text-tesmo w-full rounded-lg text-center p-2 cursor-pointer"
            >
              Show winners
            </button> */}
                {/*  <button
              onClick={() => setModalSort(!modalsort)}
              className="bg-orange-500 text-[0.8rem] font-semibold text-tesmo w-full rounded-lg text-center p-2 cursor-pointer"
            >
              Sort a Winner
            </button> */}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Cardrewardsol;
