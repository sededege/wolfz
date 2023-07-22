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
import { whitelist } from "./Whitelist";
import normal from "../img/normal.png";
import ruby from "../img/ruby.png";
import sap from "../img/sap.png";

const Lootbox = ({ id, pointsuser, upd, number, type }) => {
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

  const [count, setCount] = React.useState(0);

  const UnitCounter = () => {
    const [count2, setCount2] = React.useState(0);

    const handleIncrement = () => {
      setCount2(count2 + 1);
    };

    const handleDecrement = () => {
      if (count2 > 0) {
        setCount2(count2 - 1);
      }
    };

    const handleInputChange = (event) => {
      const inputValue = event.target.value;
      const newCount = parseInt(inputValue);
      if (!isNaN(newCount)) {
        setCount2(newCount);
      }
    };
    return (
      <div className="gap-2 flex w-full">
        <button
          className="bg-btn text-white p-2 rounded-lg"
          onClick={() => handleDecrement()}
        >
          -
        </button>
        <input
          className="w-[60px] text-center bg-transparent border-2 border-slate-500 rounded-lg text-white mx-auto"
          type="text"
          value={count2}
          onChange={(e) => handleInputChange(e)}
        />
        <button
          className="bg-btn text-white p-2 rounded-lg"
          onClick={() => handleIncrement()}
        >
          +
        </button>
        <button
          onClick={() => updaterealtime(id, count2)}
          className={` ${
            type === "Normal" && "bg-yellow-300 border-yellow-300"
          } ${type === "Ruby" && "bg-red-500 border-red-500"} ${
            type === "Sapphire" && "bg-sky-500 border-sky-500"
          } text-tesmo font-semibold font hover:bg-tesmo2 border-2  hover:border-tesmo2 hover:text-white w-full rounded-lg text-center p-2 cursor-pointer`}
        >
          Buy crate
        </button>
      </div>
    );
  };

  const getrealtime = (postId) => {
    const starCountRef = ref(database, "raffles/" + postId + "/sales");
    onValue(starCountRef, (snapshot) => {
      setReal(snapshot.val());
    });
  };

  function updaterealtime(uid, count2) {
    console.log(count2);
    if (pointsuser - data.price * count2 >= 0) {
      const datapoints = {
        id: publicKey && publicKey.toBase58(),
        points: Math.floor(parseInt(pointsuser)) - data.price * count2,
      };
      updatePoints(datapoints);

      setBuying(true);
      setTimeout(() => {
        setBuying(false);
      }, 2000);
      // Write the new post's data simultaneously in the posts list and the user's post list.
      const updates = {};
      let qty = [];
      for (let index = 0; index < count2; index++) {
        qty.push(publicKey?.toBase58());
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
    setUser(await getUser(publicKey?.toBase58()));
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

    /*  const intervalId = setInterval(() => {
      setIsVisible((prevState) => !prevState);
    }, 500);

    return () => clearInterval(intervalId); */
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
      {
        <div className="bg-tesmo bg-opacity-80 rounded-lg p-4">
          {modal && (
            <div className=" px-4 md:w-[700px] h-[400px] bg-tesmo2  text-white opacity-95 md:left-[calc(50vw-350px)] md:top-[calc(50vh-200px)] fixed overflow-auto p-8 rounded-lg ">
              <button
                onClick={() => setModal(!modal)}
                className="absolute right-10 top-4"
              >
                X
              </button>
              <h1 className="font-bold">
                {data.winner ? "Winners" : "Entries"}
              </h1>
              <ul>
                {!data.winner ? (
                  real.map((a, index) => (
                    <li key={index}>
                      {index + 1} - {a}...
                    </li>
                  ))
                ) : (
                  <li>
                    <ul className="gap-4 p-2  flex flex-col">
                      {data.winner.map((a, index) => (
                        <li
                          key={index}
                          className="justify-between bg-tesmo  w-full p-2 items-center flex "
                        >
                          <div>{a.name.slice(0, 20)}...</div>
                          {/*                       <div>{a.transaction}</div>
                           */}{" "}
                          {a.transaction !== "" ? (
                            <a href={a.transaction}>
                              <img src={solscan} className="w-6" />
                            </a>
                          ) : publicKey &&
                            whitelist.includes(
                              publicKey && publicKey?.toBase58()
                            ) ? (
                            <div className="flex items-center justify-center">
                              <InputTx index={index} />
                            </div>
                          ) : (
                            <p className="text-red-500 text-[0.8rem]">
                              Prize not delivered yet
                            </p>
                          )}
                        </li>
                      ))}
                    </ul>
                  </li>
                )}
              </ul>
            </div>
          )}

          {modalsort && (
            <div className="p-20 bg-tesmo fixed opacity-95 border-2 left-[calc(50vw-250px)] overflow-auto p-8 rounded-lg ">
              <button
                onClick={() => setModalSort(!modalsort)}
                className="absolute right-10 top-4 text-white"
              >
                X
              </button>
              {/*  <input
            type="number"
            value={qtysort}
            onChange={(e) => setQtySort(e.target.value)}
            className="bg-white p-2 rounded-lg "
            placeholder="Qty of winners"
          /> */}
              <button
                onClick={() => sort(real)}
                className=" p-2 ml-2 rounded-lg bg-tesmo2 text-white"
              >
                Sort
              </button>
              <ul className="mt-2 text-white">
                {winners2 &&
                  winners2.map((a, index) => <li key={index}>{a}</li>)}
              </ul>
            </div>
          )}
          {/*       <Tweet tweetId="1624841242055004161" options={{ theme: "dark" }} />
           */}
          <div className="flex justify-between items-center text-center">
            {/*  {
               whitelist.includes(publicKey && publicKey.toBase58()) && <button onClick={() => deleteraffle(id)} className="bg-red-400 text-white p-2 rounded-lg mb-4">Delete</button>
            } */}
            <p className="text-white font-bold mb-4 w-full font ">{type} Crate</p>
            {/* <p className="text-white font-bold mb-4 flex gap-2">
              Live{" "}
              <div className="w-2">
                <span
                  className={`blinking-point ${
                    isVisible ? "visible" : "hidden"
                  }`}
                />
              </div>
            </p> */}
          </div>
          <img src={ type === "Normal" && normal ||  type === "Ruby" && ruby || type === "Sapphire" && sap}  className="rounded-lg w-180" />

          <p className="text-center text-[1rem] font text-white font-bold mt-2 mb-2">
            Details
          </p>

          <ul className="mt-4 mb-4 grid grid-cols-1 text-center text-white font-200 gap-2 text-[0.8rem]">
            <li className="text-purple-400">Shotgun epic #1234</li>
            <li className="text-sky-400">Shotgun rare #1234</li>
            <li>Gun normal #1234</li>
          </ul>

          <div className="text-center text-[0.8rem]  justify-between flex px-4 text-slate-400 mt-2 mb-2">
            <span className="font-bold">Price:</span>
            <div className="flex items-center gap-2 justify-center">
              <GiTwoCoins  className={` ${
                  type === "Normal" && "text-yellow-300"
                } ${type === "Ruby" && "text-red-500"} ${
                  type === "Sapphire" && "text-sky-500"
                } text-[1.2rem]`} />
              <p
                className={` ${
                  type === "Normal" && "text-yellow-300"
                } ${type === "Ruby" && "text-red-500"} ${
                  type === "Sapphire" && "text-sky-500"
                } font-bold`}
              >
                1000
              </p>
            </div>
          </div>

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
      }
    </>
  );
};

export default Lootbox;
