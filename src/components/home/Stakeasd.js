/* eslint-disable react/react-in-jsx-scope */
import { useState, useEffect } from "react";
import { useStateValue } from ".././context/StateProvider";
import { actionType } from ".././context/reducer";
import { GiTwoCoins } from "react-icons/gi";
import Countdown from "react-countdown";
import { motion } from "framer-motion";
import {
  WalletDialogProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-material-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import {getAllUsuarios, updateNfts, updatePoints, getUser} from '../utils/firebaseFunctions'

const Staked = () => {

  const [{ cartShow, products, dondeestoy }, dispatch] = useStateValue();
  const [scrollValue] = useState(0);
  const [stake, setStake] = useState([]);
  const [staking, setStaking] = useState(null);
  const [user, setUser] = useState(null);

  const [select, setSelect] = useState([]);
  const [select2, setSelect2] = useState([]);
  const [confirm, setConfirm] = useState(false);
  const [deleted, setDeleted] = useState([]);
  const [nfts, setNfts] = useState([])
  const [nfts2, setNfts2] = useState([])
  const [allusers, setAllUsers] = useState([])
  let qtyxhr = 10;
  let supply = 100;
  
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
const { publicKey } = useWallet()
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts =
    products && products.slice(firstPostIndex, lastPostIndex);


    const fetchnfts = async (num) => {
      const body = {
        method: "qn_fetchNFTs",
        params: {
          wallet: publicKey?.toBase58(),
  
/*                   wallet: 'C7W7bccbLUzYZ4xNAaN7DqtZwqnVHS1tdVMXcLJrvMVs',
 */           page: num,
          perPage: 40,
        },
      };
  
      const options = {
        method: "POST",
        body: JSON.stringify(body),
      };
      return await fetch(
        "https://billowing-virulent-gas.solana-mainnet.discover.quiknode.pro/cd78f9ac76e21ebc9a89b54ff106a19bff9ebdb9/",
        options
      )
        .then((res) => res.json())
        .then((res) => {
          return (
            res &&
            res.result &&
            res.result.assets
              /* .filter(
                (b) =>
                  b.collectionAddress ===
                  "HNvbqajUp8tYYRRBwm4cqeRQRbahLLTSLdvgi6QzM4cB"
              ) */
                         .filter((b) => b.collectionName === "Blessed Dogs")
               .map((a) => a)
          );
        });
    };

  useEffect(() => {

    const asd = async () => {  

     const test = await [].concat(
        await fetchnfts(1),
        await fetchnfts(2)
      /*   await fetchnfts(3),
        await fetchnfts(4),
        await fetchnfts(5),
        await fetchnfts(6),
        await fetchnfts(7),
        await fetchnfts(8), */
        
        
        
        )
        setNfts(test)
        setNfts2(test)


        setAllUsers(await getAllUsuarios())
        const test2 = await getUser(publicKey.toBase58())
        setUser(test2)
      setStake(test2)
      };
  
  
  publicKey && asd()

  }, [publicKey]);
 

  const updatestake = (a) => {
    let result = [];

  

    a &&
      a.forEach((e) =>
        nfts2.find((f) => f.tokenAddress === e.tokenAddress)
          ? result.push(e)
          : null
      );
    return result;
  };

  
  let totalstaked = 0;
  const calculatestake = (a) => {
    totalstaked = totalstaked + a;
  };
  const pointsearn = (a, index) => {
    const d = new Date();

    const fecha2 = parseInt(a);

    const fecha1 = Date.now();

    const diferenciaEnMilisegundos = Math.abs(fecha2 - fecha1);
    const diferenciaEnHoras = Math.ceil(
      diferenciaEnMilisegundos / (1000 * 60 * 60)
    );

    const result = (diferenciaEnHoras - 1) * qtyxhr;

    /* let result = 10 */
    puntoss = puntoss + result;
  };
  let thes = 0;
  const pointsearn2 = (a) => {
    /* let result = 10 */
    thes = thes + a;
  };


  const points = (a, index) => {
    const d = new Date();

    const fecha2 = parseInt(a);

    const fecha1 = Date.now();

    const diferenciaEnMilisegundos = Math.abs(fecha2 - fecha1);
    const diferenciaEnHoras = Math.ceil(
      diferenciaEnMilisegundos / (1000 * 60 * 60)
    );

    const result = (diferenciaEnHoras - 1) * qtyxhr;

    /*      const result = 10;
     */ return result;
  };

  let puntoss = 0
  const sendtostake = (a) => {
    if (a === "all") {
      const tostake = filtrar(stake.staked).map((a) => ({
        ...a,
        snapshot: `${Date.now()}`,
        points: a.name.slice(0, 4) === "Ruby" ? 3 * qtyxhr : qtyxhr,
        blocknumber: a.provenance[0].blockNumber,
      }));

      const dataa = {
        id: publicKey && publicKey.toBase58(),
        staked: tostake.concat(stake.staked),
      };
      updateNfts(dataa);
     /*  setNfts([]); */
      setStake({ staked: tostake.concat(stake.staked) });
    } else if (a === "unstakeall") {
      stake && stake.staked.map((e) => setNfts((prev) => [...prev, e]));
      /*  setStake([]); */
      const dataa = {
        id: publicKey && publicKey.toBase58(),
        staked: [],
      };
      updateNfts(dataa);
      setStake({ staked: [] });
    } /*  else if (a === "unstake") {
      select2.map((e) => setNfts((prev) => [...prev, e]));

      setStake(stake.filter((el) => !select2.includes(el)));

      const tounstake = select2.map((a) => ({
        ...a,
        snapshot: `${Date.now()}`,
        points: qtyxhr,
        blocknumber: a.provenance[0].blockNumber,
      }));
    }  */ else if (a === "claimall") {
      let result = [];

      nfts2.forEach((e) =>
        stake.staked.find((f) => f.tokenAddress === e.tokenAddress)
          ? result.push(e)
          : null
      );

      const tostake2 = result.map((a) => ({
        ...a,
        snapshot: `${Date.now()}`,
        points: a.name.slice(0, 4) === "Ruby" ? 3 * qtyxhr : qtyxhr,
        blocknumber: a.provenance[0].blockNumber,
      }));

      const data2 = {
        id: publicKey && publicKey.toBase58(),
        staked: tostake2,
      };

      const datapoints = {
        id: publicKey && publicKey.toBase58(),
        points: stake.points + puntoss,
      };

      updateNfts(data2);
      updatePoints(datapoints);
    } else {
      setNfts(nfts.filter((el) => !select.includes(el)));
      const tostake = select.map((a) => ({
        ...a,
        snapshot: `${Date.now()}`,
        points: a.name.slice(0, 4) === "Ruby" ? 3 * qtyxhr : qtyxhr,
        blocknumber: a.provenance[0].blockNumber,
      }));

      const dataa = {
        id: publicKey && publicKey.toBase58(),
        staked: tostake.concat(stake.staked),
      };
      updateNfts(dataa);
      setStake({ staked: tostake.concat(stake.staked) });
    }
    /* setStaking(true); */
    setSelect([]);
    setSelect2([]);
    /* router.push("/stake"); */
  };

  const addToStake = (a) => {
    if (select.filter((b) => b.tokenAddress === a.tokenAddress).length > 0) {
      setSelect(select.filter((b) => b.tokenAddress !== a.tokenAddress));
    } else {
      setSelect([...select, a]);
    }
  };
  const addToUnStake = (a) => {
    if (select2.filter((b) => b.tokenAddress === a.tokenAddress).length > 0) {
      setSelect2(select2.filter((b) => b.tokenAddress !== a.tokenAddress));
    } else {
      setSelect2([...select2, a]);
    }
  };

  const filtrar = (b) => {
    let result = [];

    // Find unique elements in arr1 & push them into result
    b &&
      nfts2.forEach((e) =>
        b.find((f) => f.tokenAddress === e.tokenAddress) ? null : result.push(e)
      );
    // Find unique elements in arr2 & push them into result
    /*  arr2.forEach((e) => (arr1.find((f) => f === e) ? null : result.push(e))); */

    return result;
  };


  return (
    <div>
    {
      publicKey && nfts2.length > 0 ? 
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          ease: "easeOut",
          duration: 0.5,
          delay: 0.3 / 5,
        }}
        className="flex flex-col w-full h-full "
      >
       {/*  {staking && (
          <div className="w-full justify-center flex items-center h-[90vh] fixed z-[1000]">
            <div className="w-[200px] h-[100px] flex justify-center items-center bg-tesmo opacity-80 rounded-lg fixed">
              <p className="text-white font fixed ">Loading</p>
            </div>
          </div>
        )} */}

        <div className=" pb-4 flex items-center flex-col justify-center ">
          <h1 className="text-white menu text-[1.5rem] font ">Vault</h1>
          {allusers &&
            allusers.map((b) => b.staked && calculatestake(b.staked.length))}
          {totalstaked > 0 && (
            <div className="w-1/2 bg-gray-200 rounded-full dark:bg-gray-700">
              <div
                className="bg-purple-600 text-lg font-bold font text-blue-100 text-center  leading-none rounded-full text-[0.8rem]"
                style={{
                  width: `${Math.round((100 * totalstaked) / supply)}%`,
                }}
              >
                {totalstaked > 0
                  ? Math.round((100 * totalstaked) / supply)
                  : 0}{" "}
                %
              </div>
            </div>
          )}
        </div>
        <div className="flex justify-center items-center w-full h-full mt-8 px-10  bg-tesmo">
          <div className="w-full h-full flex gap-10 ">
            <div className="flex flex-col w-full  ">
              <div className="flex justify-between border-2 p-6 mb-4  shadow-slate-700 shadow-lg rounded-lg items-center">
                <h1 className=" text-[1.6rem] text-slate-300 font">
                  UnLocked: {stake && filtrar(stake.staked).length}
                </h1>

                <div className="flex-col">
                  <h2 className="text-slate-600 font text-[1.4rem]">
                    Balance
                  </h2>
                  <div className="flex  items-center gap-2">
                    <GiTwoCoins className="text-purple-300 font text-[1.4rem]" />
                    <p className="text-purple-300 font text-[1.4rem]">
                      {user && user.points}
                    </p>
                  </div>
                </div>
              </div>
              <div className="shadow-lg relative shadow-slate-700 p-4   rounded-lg w-full h-[400px]">
                <div className=" grid grid-cols-5 h-[300px] overflow-auto gap-2">
                  {/*                   {nfts && nfts.result.assets.map((a, index) => (
                   */}{" "}
                  {/*                     nfts.filter(a => a.tokenAddress !== '2FWVhyTS3vQJUmqT6QJCGzf599batbLTf24mSpWZCf36')
                   */}{" "}
                  {
                    filtrar(stake.staked).map((a, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{
                          ease: "easeOut",
                          duration: 0.5,
                          delay: 0.3 + index / 5,
                        }}
                        onClick={() => addToStake(a)}
                        className={`${
                          select.includes(a)
                            ? "bg-tesmo2 border-2 border-slate-300"
                            : "bg-tesmo"
                        }  mx-auto transition-all 2s ease-in border-tesmo cursor-pointer  h-[185px]  hover:bg-tesmo2  p-2 rounded-lg`}
                      >
                        <img
                          className="w-[100px] object-contain mx-auto rounded-lg"
                          src={a.imageUrl}
                          alt="nft"
                        />
                        <p className="text-white text-center text-[0.9rem] mt-2">
                          {a.name}
                        </p>
                        <div className="text-center text-yellow-300 font-bold flex justify-center  items-center gap-2 ">
                          <GiTwoCoins />{" "}
                          {a.name.slice(0, 4) === "Ruby"
                            ? 3 * qtyxhr
                            : qtyxhr}
                        </div>
                      </motion.div>
                    ))}
                </div>
                <div className="flex justify-between p-4 mt-4 bg-tesmo2  shadow-slate-700 border-2 border-slate-700 rounded-lg items-center absolute bottom-0 left-0 w-full">
                  <div className="flex items-center">
                    <h1 className=" text-[1.2rem] text-slate-300 font">
                      Selected:{" "}
                    </h1>
                    <h1 className=" text-[1.2rem] text-slate-300 font ml-2">
                      {select.length}
                    </h1>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => sendtostake()}
                      className="text-white px-8 py-2 rounded-lg border-2 border-purple-700 hover:bg-white hover:text-purple-700 bg-purple-700 cursor-pointer font text-[1rem]"
                    >
                      Stake
                    </button>
                    <button
                      onClick={() => sendtostake("all")}
                      className="text-white px-8 py-2 rounded-lg border-2 border-purple-700 hover:bg-white hover:text-purple-700 bg-purple-700 cursor-pointer font text-[1rem]"
                    >
                      Stake All
                    </button>
                    <button
                      onClick={() => sendtostake("unstakeall")}
                      className="text-white px-8 py-2 rounded-lg border-2 border-purple-700 hover:bg-white hover:text-purple-700 bg-purple-700 cursor-pointer font text-[1rem]"
                    >
                      Unstake all
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col w-full h-full ">
              <div className="flex justify-between p-6 mb-4 shadow-slate-700 shadow-lg rounded-lg items-center">
                <h1 className=" text-[1.6rem] text-slate-300 font">
                  Locked: {updatestake(stake.staked).length}
                </h1>

                <div className="flex-col flex">
                  <h2 className="text-slate-600 font text-[1.4rem]">
                    Earned
                  </h2>
                  <div className="flex  items-center gap-2">
                    <GiTwoCoins className="text-purple-400 font text-[1.4rem]" />
                    <p className="text-purple-400 font text-[1.4rem]">
                      {updatestake(stake.staked).map((a) =>
                        pointsearn(a.snapshot)
                      )}
                      {puntoss}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => sendtostake("claimall")}
                  className="text-white px-8 py-2 rounded-lg border-2 border-slate-700 hover:bg-white hover:text-slate-700 bg-slate-700 cursor-pointer font text-[1.4rem]"
                >
                  Claim all
                </button>
              </div>
              <div className="shadow-lg relative shadow-slate-700 p-4  rounded-lg w-full h-[400px]">
                <div className=" grid grid-cols-5 h-[300px] overflow-auto gap-2">
                  {updatestake(stake.staked).map((a, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{
                        ease: "easeOut",
                        duration: 0.5,
                        delay: 0.3 + index / 5,
                      }}
                    /*   onClick={() => addToUnStake(a)} */
                      className={`${
                        select2.includes(a)
                          ? "bg-tesmo2 border-2 border-slate-400"
                          : "bg-tesmo"
                      }  mx-auto hover:border-2 transition-all 2s ease-in border-2 cursor-pointer hover:border-tesmo2 hover:bg-tesmo2 border-tesmo p-2 h-[185px] rounded-lg`}
                    >
                      <img
                        className="w-[100px] object-contain mx-auto rounded-lg"
                        src={a.imageUrl}
                        alt="nft"
                      />
                      <p className="text-white text-center text-[0.9rem] mt-2">
                        {a.name}
                      </p>
                      <div className="text-center text-yellow-300 font-bold flex justify-center  items-center gap-2 ">
                        <GiTwoCoins /> {points(a.snapshot, index)}
                      </div>
                      {/* <div></div> */}

                      {/*   <Countdown
                                    className="text-white justify-center flex "
                                    date={Date.now() + 86399000}
                                /> */}
                      {/*  <Countdown
              className="text-white "
              date={parseInt(a.snapshot) + 864000}
            /> */}
                    </motion.div>
                  ))}
                </div>
                <div className="flex justify-between p-4 mt-4 bg-tesmo2 shadow-slate-700 border-2 border-slate-700 rounded-lg items-center absolute bottom-0 left-0 w-full">
                  <div className="flex items-center">
                  <p>Selected</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {/*   <button
    onClick={() => sendtostake("unstake")}
    className="text-white px-8 py-2 rounded-lg border-2 border-blue-700 hover:bg-white hover:text-blue-700 bg-blue-700 cursor-pointer font text-[1.4rem]"
  >
    unStake
  </button>
  <button
    onClick={() => sendtostake("unstakeall")}
    className="text-white px-8 py-2 rounded-lg border-2 border-blue-700 hover:bg-white hover:text-blue-700 bg-blue-700 cursor-pointer font text-[1.4rem]"
  >
    UnStake All
  </button> */}
                    <p className="font-bold text-white">
                      {" "}
                      {stake &&
                        updatestake(stake.staked).map((a) =>
                          pointsearn2(a.points)
                        )}
                      {thes} THES/hr
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div> : <div>
        <p className='text-white'>
         Please login</p>
        <WalletMultiButton/> 
      </div>
    }
      
      </div>
  );
};

export default Staked;
