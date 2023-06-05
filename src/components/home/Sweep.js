import React, { useState } from "react";
import Cardreward from "./Cardreward";
import Cardrewardfinish from "./Cardrewardfinish";
import { getdata, getrealtime, saveUser } from "../utils/firebaseFunctions.js";
import { database } from "../../firebase.config";
import { ref, set, onValue, get, child, update } from "firebase/database";
import { useWallet } from "@solana/wallet-adapter-react";
import { getUser } from "../utils/firebaseFunctions";
import { GiTwoCoins } from "react-icons/gi";
import { data } from "browserslist";
import { AnimatePresence, motion } from "framer-motion";
import logo from "../img/logo.jpg";
import Cardrewardsol from "./Cardrewardsol";
import Cardrewardsweep from "./Cardrewardsweep";
import { hashlist } from "./hashlist";

const Rewards = () => {
  const [user, setUser] = React.useState(null);
  const [dataall, setDataall] = React.useState([]);
  const [tx, setTx] = React.useState([]);
  const [modal, setModal] = React.useState(false);
  const [loading, setLoading] = useState(true);
  const checkuser = async (a) => {
    const res = await getUser(a);
    if (res) {
      return res;
    } else {
      const dataa = {
        id: publicKey && publicKey.toBase58(),
        snapshot: `${Date.now()}`,
        nickname: "test",
        points: 0,
        twitter: null,
        discord: null,
        staked: [],
      };
      saveUser(dataa);

      return await getUser(a);
    }
  };

  const whitelist = [
    "EGepWRwr3jMixiKRU584tm1vVbhEoXBE2jqYijzwwCxK",
    "BZeYLWwXLzKBYA7E3om8J1ShmSZ2VQz2c19yM8RrMhe3",
    "AK3EpwLuTLsRqoMDz2hqCv5rq6tPfaWcVSNqKcrY7sGK",
    "z624HRfLVoPUCcGZmaRXctwzoYJ2qCmb1CxBHSbEKqn",
    "HLvnJn6rspYZhWLLqcW657zBsRxUnsReB523BxL6Aqg1"
  ];
  const { publicKey } = useWallet();
  function writeUserData(
    tokenAddress,
    name,
    image,
    supply,
    price,
    time,
    qtywinners,
    type
  ) {
    set(ref(database, "raffles/" + tokenAddress), {
      tokenAddress: tokenAddress,
      name: name,
      image: image,
      supply: supply,
      price: price,
      qtywinners: qtywinners,
      time: time,
      sales: [],
      state: "live",
      entries: [],
      snapshot: Date.now(),
      winners: [],
      type: type,
      snapshotsweep: ""
    });
  }

  const getdataall = () => {
    const dbRef = ref(database);
    get(child(dbRef, `raffles`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setDataall([]);
          for (const x in snapshot.val()) {
            setDataall((prev) => [...prev, x]);
          }
        } else {
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const upd = async () => {
    setUser(await getUser(publicKey?.toBase58()));
  };

  const test = async() => {
    const from = 1679709626;
    const to = 1679716826;
    const limit = 100;

    fetch(`https://public-api.solscan.io/account/splTransfers?account=${publicKey?.toBase58()}&fromTime=${from}&toTime=${to}&limit=${limit}&offset=0`, {
  headers: {
    Accept: "application/json",
    Token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjcmVhdGVkQXQiOjE2Nzk4NjM0NjkwMDQsImVtYWlsIjoic2ViYWdvbnphbGV6Xzk3QGhvdG1haWwuY29tIiwiYWN0aW9uIjoidG9rZW4tYXBpIiwiaWF0IjoxNjc5ODYzNDY5fQ.WP268eDjNfaoAbkpJ548CVptmsyPHcvpj0Eluu2YjRQ"
  }
}).then((response) => response.json())
.then((data) => setTx(data))

  }

/*   .filter(b => hashlist.includes(b.tokenAddress))
 */  React.useEffect(() => {
  const asd = async () => {
    const test2 = await checkuser(publicKey.toBase58());
      setUser(test2);
  
    };
asd()
    upd();
    getdataall();
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    test()

    fetch('http://localhost:8000/sales')
    .then(response => response.json())
    .then(data => console.log(data));

  }, [publicKey]);

  const Form = () => {
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [supply, setSupply] = useState("");
    const [price, setPrice] = useState("");
    const [time, setTime] = useState("");
    const [type, setType] = useState('sweep');
    const [winners, setWinners] = useState("");
    const [duration, setDuration] = useState(259200000); // default to 1 day in seconds

    const handleSubmit = (event) => {
      writeUserData(
        `${Date.now()}`,
        name,
        image,
        supply,
        price,
        duration,
        winners,
        type
      );
    };

    const handleChange = (event) => {
      const { value } = event.target;
      switch (value) {
        case "1 day":
          setDuration(86400000);
          break;
        case "3 days":
          setDuration(259200000);
          break;
        case "1 week":
          setDuration(604800000);
          break;
        default:
          setDuration(86400000);
      }
    };

    const SelectOption = () => {
      return (
        <div>
          <select
            id="duration"
            defaultValue={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="bg-tesmo2 w-full text-white p-2 rounded-lg test-white font-bold"
          >
            <option value={86400000}>1 day</option>
            <option value={259200000}>3 days</option>
            <option value={604800000}>1 week</option>
          </select>
        </div>
      );
    };

    const SelectOption2 = () => {
      return (
        <div>
          <select
            id="duration"
            defaultValue={type}
            onChange={(e) => setType(e.target.value)}
            className="bg-tesmo2 w-full text-white p-2 rounded-lg test-white font-bold"
          >
            <option value='sweep'>Sweep</option>
          </select>
        </div>
      );
    };

    return (
      <form className="flex flex-col  " onSubmit={handleSubmit}>
        <label className="text-white font-bold p-2" htmlFor="name">
          Raffle
        </label>
        <input
          type="text"
          id="name"
          defaultValue={name}
          onChange={(e) => setName(e.target.value)}
          className="text-white bg-tesmo2 p-2 rounded-lg test-white font-bold"
          placeholder="Okay Bear #2123 / Sol Casino 10 WL Spots"
          required
        />

        <label className="text-white font-bold p-2" htmlFor="email">
          Image URL
        </label>
        <input
          type="string"
          id="img"
          defaultValue={image}
          onChange={(e) => setImage(e.target.value)}
          className="text-white bg-tesmo2 p-2 rounded-lg test-white font-bold"
          placeholder="Copy URL NFT img from ME"
          required
        />

        <label className="text-white font-bold p-2" htmlFor="phone">
          Supply
        </label>
        <input
          type="number"
          id="number"
          defaultValue={supply}
          onChange={(e) => setSupply(e.target.value)}
          className="text-white bg-tesmo2 p-2 rounded-lg test-white font-bold"
          placeholder="Supply to raffle"
          required
        />

        <label className="text-white font-bold p-2" htmlFor="address">
          Price
        </label>
        <input
          type="number"
          id="price"
          defaultValue={price}
          onChange={(e) => setPrice(e.target.value)}
          className="text-white bg-tesmo2 p-2 rounded-lg test-white font-bold"
          placeholder="Price per tickets in points"
          required
        />

        <label className="text-white font-bold p-2" htmlFor="address">
          Winners
        </label>
        <input
          type="number"
          id="qty"
          defaultValue={winners}
          onChange={(e) => setWinners(e.target.value)}
          className="text-white bg-tesmo2 p-2 rounded-lg test-white font-bold"
          placeholder="Qty of winners"
          required
        />

        <label className="text-white font-bold p-2" htmlFor="city">
          Type
        </label>
        <SelectOption2 />
        <label className="text-white font-bold p-2" htmlFor="city">
          Time
        </label>
        <SelectOption />

        <button className="bg-white p-2 rounded-lg mt-4 mb-2" type="submit">
          Submit
        </button>
      </form>
    );
  };

  return (
    <div className="h-[90vh] mt-[10vh] md:mt-0 md:h-[82vh] overflow-auto pb-10 w-full px-4 md:px-20 ">
      {loading && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-screen flex h-screen bg-tesmo z-[8000] left-0 top-0 justify-center items-center flex-col fixed"
            role="status"
          >
            <img src={logo} alt="logo" className="w-20" />
            <svg
              aria-hidden="true"
              className="inline w-24 h-24 text-gray-200 animate-spin dark:text-tesmo fill-tesmo2 absolute"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </motion.div>
        </AnimatePresence>
      )}
      {modal && (
        <div className="w-[500px] opacity-95 border-2 bg-tesmo fixed left-[calc(50vw-250px)] overflow-auto p-8 rounded-lg ">
          <button
            onClick={() => setModal(!modal)}
            className="absolute right-10 top-4 text-white bg-tesmo2 p-2 w-8 h-8 rounded-full items-center flex justify-center"
          >
            x
          </button>
          <Form />
        </div>
      )}
      <div className="flex w-full ">
        <div className="w-full ">
          <div className="flex items-center justify-between mt-4 gap-2  ">
            <div className="flex items-center justify-center">
              <h1 className="font text-[1.4rem]  text-white ">WE ARE TESTING THIS AREA, PLEASE DONT BUY ANYTHING</h1>
             {/*  <GiTwoCoins className="ml-4 text-yellow-400 font text-[1.2rem]" />
              <p className="text-purple-500 font text-[1.2rem] ml-2">
                {user && Math.round(user.points)}
              </p> */}
            </div>
            {whitelist.includes(publicKey?.toBase58()) && (
              <button
                onClick={() => setModal(!modal)}
                className="bg-tesmo2 font-bold text-white p-2 rounded-lg"
              >
                New +
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 gap-4 w-full mt-2 ">
            {/*  <Cardtweet /> */}
            {dataall &&
              dataall.map((a, index) => (
                <Cardrewardsweep
                key={index}
                  id={a}
                  number={index}
                  upd={upd}
                  pointsuser={user && user.points}
                  sweep={tx?.data?.filter(a => a.changeType === 'inc').filter(b => hashlist.includes(b.tokenAddress))}
                />
              ))}
            
          </div>
          {dataall.length === 0 && (
            <div className="w-full h-full justify-center items-center flex">
              <p className="font text-white text-[2rem]">No raffles yet</p>
            </div>
          )}
          {/*  <div className="flex items-center justify-between mt-4 gap-2  ">
            <div className="flex items-center justify-center">
              <h1 className="font text-[2rem]  text-white ">Finished</h1>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 w-full pb-20">
            {dataall &&
              dataall.map((a, index) => (
                <Cardrewardfinish
                  id={a}
                  number={index}
                  upd={upd}
                  pointsuser={user && user.points}
                />
              ))}
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Rewards;
