import React from "react";
import { Tweet } from "react-twitter-widgets";
import { GiTwoCoins } from "react-icons/gi";
import Countdown from "react-countdown";
import { database } from "../../firebase.config";
import { ref, set, onValue, get, child, update } from "firebase/database";
import { useWallet } from "@solana/wallet-adapter-react";
import { getUser, updatePoints, getdata } from "../utils/firebaseFunctions";
import Swal from "sweetalert2/dist/sweetalert2.js";
import solscan from ".././img/solscan.png";
import moment from "moment/moment";

const Cardrewardfinish = ({ id, pointsuser, upd, number }) => {
  const { publicKey } = useWallet();
  const [modal, setModal] = React.useState(false);
  const [modalsort, setModalSort] = React.useState(false);
  const [winners2, setWinners] = React.useState(false);
  const [data, setData] = React.useState([]);
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

  const getrealtime = (postId) => {
    const starCountRef = ref(database, "raffles/" + postId + "/sales");
    onValue(starCountRef, (snapshot) => {
      setReal(snapshot.val());
    });
  };

  function updaterealtime(uid) {
    if (pointsuser - data.price >= 0) {
      const datapoints = {
        id: publicKey && publicKey.toBase58(),
        points: pointsuser - data.price,
      };
      updatePoints(datapoints);

      setBuying(true);
      setTimeout(() => {
        setBuying(false);
      }, 2000);
      // Write the new post's data simultaneously in the posts list and the user's post list.
      const updates = {};
      updates["/raffles/" + uid + "/sales"] = [publicKey.toBase58()].concat(
        real
      ); /* [].concat(
        [publicKey.toBase58()],
        buyed) */

      /*   asd(); */

      upd();
      return update(ref(database), updates);
    } else {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 5000);
    }
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

  function DateDifference( date1, date2 ) {
  
    const duration = moment.duration(moment(date2).diff(moment(date1)));
    let difference = '';
    if (duration.asDays() < 7) {
      difference = duration.humanize();
    } else if (duration.asDays() >= 7 && duration.asDays() < 30) {
      difference = Math.floor(duration.asWeeks()) + ' week(s) ago';
    } else if (duration.asDays() >= 30) {
      difference = Math.floor(duration.asMonths()) + ' month(s) ago';
    }
    return <span>{difference} ago</span>;
  }
  const difdays = (a) => {
    const date2 = Math.round(Date.now()/1000)
 
const date1 = parseInt(a);
const diff = moment(date2).diff(moment(date1), 'minutes');
const formattedDiff = moment.duration(diff, 'minutes').humanize();
/* let hoursDiff = diffDuration.hours() + "hrs";
let minDiff = diffDuration.minutes() + "m";
console.log(`${dayDiff} ${hoursDiff} ${minDiff}`); */
return `${diff} days ago`
  }

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
          className=" px-2 ml-2 rounded-l-lg shadow-md text-tesmo "
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
  return (
    <>
      {data.state === "finished" && data.winner && (
        <div className="bg-gray-800 bg-opacity-80 rounded-lg p-4">
          {modal && (
            <div className="w-[90vw] md:w-[700px] h-[400px] left-5 bg-tesmo2 z-[10000] text-white opacity-95 md:left-[calc(50vw-350px)] top-[calc(50vh-200px)] fixed overflow-auto p-8 rounded-lg ">
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
                        <li key={index} className="justify-between bg-tesmo  w-full p-2 items-center flex ">
                          <div>{a.name.slice(0,10)}... 
                          <button 
                          className="bg-white rounded-lg px-2 ml-2 text-tesmo2"
  onClick={() =>  navigator.clipboard.writeText(a.name)}
>
  Copy
</button></div>
                          {/*                       <div>{a.transaction}</div>
                           */}{" "}
                          {a.transaction !== "" ? (
                            <a href={a.transaction}>
                              <img src={solscan} className="w-6" />
                            </a>
                          ) : publicKey &&
                            whitelist.includes(publicKey.toBase58()) ? (
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
                {winners2 && winners2.map((a) => <li>{a}</li>)}
              </ul>
            </div>
          )}
          {/*       <Tweet tweetId="1624841242055004161" options={{ theme: "dark" }} />
           */}
          <p className="text-white font-bold mb-4 text-[1rem]">Raffle # {number + 1}</p>
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
              <p className="text-yellow-300 font-bold">{data.price}</p>
            </div>
          </div>
          <div className="text-center text-[0.8rem] justify-between flex px-4 text-slate-400 mt-2 mb-2">
            <span className="font-bold">Ended:</span>

           {/*  {data.time && (
              <Countdown
                className="text-white font-semibold"
                date={parseInt(data?.snapshot) + parseInt(data?.time)}
                onComplete={() => sort(real)}
              />
            )} */}
            {
              DateDifference(data?.snapshot, Date.now())
            } 
         

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
          
          {real &&
            (data.winner ? (
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
              <div className="text-center text-[0.8rem] justify-between flex px-4 text-slate-400 mt-2 mb-2">
                <span className="font-bold">Entries:</span>
                <button
                  onClick={() => setModal(true)}
                  className="bg-green-300 px-2 rounded-lg text-tesmo"
                >
                  Show
                </button>
              </div>
            ))}

              
        </div>
      )}
    </>
  );
};

export default Cardrewardfinish;
