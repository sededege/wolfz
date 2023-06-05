import React from "react";
import { Tweet } from "react-twitter-widgets";
import { GiEyeOfHorus, GiTwoCoins } from "react-icons/gi";
import { AiFillEye, AiFillYoutube } from "react-icons/ai";
import { BsTwitch } from "react-icons/bs";

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
import {
  getUser,
  updatePoints,
  getdata,
  updateSweep,
} from "../utils/firebaseFunctions";
import Swal from "sweetalert2/dist/sweetalert2.js";
import solscan from ".././img/solscan.png";
import * as web3 from "@solana/web3.js";
import { Buffer } from "buffer";
import { hashlist } from "./hashlist";
import { useNavigate } from "react-router-dom";

const CardTwitch = ({ id, setStream, stream, setLivetwitch, setPlataform, setUserplaying, userplaying}) => {
  global.Buffer = Buffer;
  const { publicKey } = useWallet();
  const [modal, setModal] = React.useState(false);
  const [modalsort, setModalSort] = React.useState(false);
  const [winners2, setWinners] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [isVisible, setIsVisible] = React.useState(true);
  const [tx, setTx] = React.useState([]);
  const [real, setReal] = React.useState([]);

  /*  const [qtysort, setQtySort] = React.useState(
    data && parseInt(data.qtywinners)
  ); */
  const [buying, setBuying] = React.useState(false);
  const [live, setLive] = React.useState(false);
  const [viewers, setViewers] = React.useState(false);
  const [viewersyb, setViewersyb] = React.useState(false);
  const [user, setUser] = React.useState(null);
  const [error, setError] = React.useState(false);
  const [btnsweep, setBtnSweep] = React.useState(true);
  const whitelist = [
    "EGepWRwr3jMixiKRU584tm1vVbhEoXBE2jqYijzwwCxK",
    "BZeYLWwXLzKBYA7E3om8J1ShmSZ2VQz2c19yM8RrMhe3",
    "AK3EpwLuTLsRqoMDz2hqCv5rq6tPfaWcVSNqKcrY7sGK",
    "z624HRfLVoPUCcGZmaRXctwzoYJ2qCmb1CxBHSbEKqn",
  ];

  const getrealtime = () => {
    const starCountRef = ref(database, "twitch/viewers");
    onValue(starCountRef, (snapshot) => {
      setReal(snapshot.val());
    });
  };

  /* const streamselect = (name) => {
    setStream(name)

    const updates = {};
    let qty = [{
      channel: name,
      wallet: publicKey.toBase58()
    }]
   
    

    updates["/twitch/viewers"] = qty.concat(real)
    return update(ref(database), updates);
  } */

  const [count, setCount] = React.useState(0);
  const history = useNavigate();

  const asd = async () => {
    setUser(await getUser(publicKey.toBase58()));
  };

  const getdata = (userId) => {
    const dbRef = ref(database);
    get(child(dbRef, `streams/${userId}`))
      .then(async (snapshot) => {
        if (snapshot.exists()) {
          setData(snapshot.val());
          getviewersyb(snapshot.val());
          fetch(
            `https://api.twitch.tv/helix/streams?user_login=${
              snapshot.val().channel
            }`,
            {
              headers: {
                "Client-ID": "jdmd4fc2qz2w8r0egnnlsuoiul5pui",
                Authorization: "Bearer 00cnt4ib1wnd7x0s0rtkvl73dtys4z", // Optional: only needed for user-level requests
              },
            }
          )
            .then((response) => response.json())
            .then((data) => {
              // Check if the stream is live
              /*   console.log(data.data[0].viewer_count) */
              /* console.log(data) */

              /*  console.log(snapshot.val().channel, data.data[0].type) */
              if (data.data.length > 0 && data.data[0].type === "live") {
                setLive(true);
                setViewers(data.data[0].viewer_count);
              } else {
                setLive(false);
              }
            })
            .catch((error) => {
              console.error(error);
            });
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getviewersyb = (data) => {
    const apiUrl = `https://www.googleapis.com/youtube/v3/videos?part=liveStreamingDetails&id=${data.idchannel}&key=AIzaSyDg70xPKxpo8Olq0urj58wj0cfsg9uc3hA`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        const viewerCount =
          data?.items[0]?.liveStreamingDetails?.concurrentViewers;

        setViewersyb(viewerCount);
      });
  };

  React.useEffect(() => {
    getdata(id);

    getrealtime();
    publicKey && asd();
  }, [publicKey, btnsweep]);

  const navegar = (a) => {
    history(`/twitch2earn/${a}`);
  };

  const send = (a) => {
    if (data.plataform === "youtube") {
      console.log(data.idchannel);
      setStream(data.idchannel);
    } else {
      setStream(a);
      if (data.channel === 'armaniferrante'){
        const walletsRef = ref(database, "/tx");
        get(walletsRef).then((snapshot) => {
          const nextIndex = snapshot.exists() ? snapshot.val().length : 0;
          const newWallet = {
            id: publicKey.toBase58(),
          };
          set(child(walletsRef, nextIndex.toString()), newWallet)
      })
    }
  }
    setUserplaying(data.channel);
    setPlataform(data.plataform);

  };
  return (
    <>
      <li
        onClick={() => send(data.channel)}
        className={`${
          data.channel === userplaying
            ? " bg-red-700  bg-opacity-90 text-white"
            : "bg-tesmo text-white "
        }  w-full p-2 px-6 items-center list-none flex justify-between cursor-pointer`}
      >
        <img
          className="w-10 h-10 rounded-full"
          src={data.image}
          alt={data.channel}
        />
        <h1 className="text-[0.8rem] font-bold text-center  w-[100px]">{data.channel}</h1>
        <div className="flex items-center gap-2 justify-center text-[0.9rem] ">
          {data?.plataform === "youtube" && (
            <div className="w-[100px] flex items-center justify-start gap-2 ">
              <AiFillYoutube className="text-[1.2rem]" />
              <AiFillEye className="text-red-500 text-[1.2rem]" />
              <p className="text-red-500 font-bold">{viewersyb} </p>
            </div>
          )}
          {data?.plataform === "twitch" && (
                        <div className="w-[100px] flex items-center justify-start gap-2 ">
              <BsTwitch className="text-[1.2rem]" />
              <AiFillEye className="text-red-500 text-[1.2rem]" />
              <p className="text-red-500 font-bold">{viewers ? viewers : 'Offline'} </p>
            </div>
          )}
        </div>
      </li>

      {/*   <div className="bg-tesmo2 z-[1000] shadow-lg bg-opacity-80 shadow-yellow-300 w-full relative pb-20 flex p-4 rounded-lg flex-col">
        <div className="w-full flex justify-between">
        <h1 className="font font-bold text-white text-[1.4rem]">{data.channel}</h1>
        <div className="flex items-center gap-2 justify-center">
              <GiTwoCoins className="text-red-500 text-[1.2rem]" />
              <p className="text-red-500 font-bold">{data.reward} <span className="font-normal text-slate-600">/min</span></p>
            </div>
        </div>
        <div className="w-full grid grid-cols-3 gap-4 mt-4 ">
        <div className=" flex brounded-lg w-[100px] h-[100px] ">
        <img src={data.image} className='rounded-lg object-cover w-[100px] ' alt='profile'/>
        </div>
        <p className="text-white h-[100px] ml-4 overflow-auto col-span-2  ">
          {data.description}
        </p>
        <button
                  onClick={() => navegar(data.channel)}
                  className="bg-purple-500 bottom-4 right-4 absolute text-white font-bold cursor-pointer h-[40px] w-[100px] px-2 rounded-lg"
                >
                  View
                </button>
      
        

        </div>
       
        
      </div> */}
    </>
  );
};

export default CardTwitch;
