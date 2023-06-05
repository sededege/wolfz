import { LiveChat } from "youtube-chat";
import { useWallet } from "@solana/wallet-adapter-react";
import React, { useEffect, useState } from "react";
import { GiTwoCoins } from "react-icons/gi";
import { getUser, saveUser, updateRaidPoints } from "../utils/firebaseFunctions";
import TwitchEmbedVideo from "react-twitch-embed-video";
import Overlay from "../img/traityoutube.png";

const Youtube = ({stream}) => {

  const [user, setUser] = useState(null);




    function Cronometro() {
        const [segundos, setSegundos] = useState(0);
        const [minutos, setMinutos] = useState(0);
        const [horas, setHoras] = useState(0);

        useEffect(() => {
          const intervalId = setInterval(() => {
            setSegundos((segundos) => segundos + 1);
          }, 1000);
    
          return () => clearInterval(intervalId);
        }, []);
    
        if (segundos === 60) {
          setSegundos(0);
          setMinutos((minutos) => minutos + 1);
        }
    
        if (minutos === 60) {
          setMinutos(0);
          setHoras((horas) => horas + 1);
        }
    
        return (
          <div className="text-white flex items-center justify-between">
            <p className="text-[1.2rem]">Time: </p>
            <p>
              {horas}:{minutos}:{segundos}
            </p>
          </div>
        );
      }
      const [claimed, setClaimed] = useState(true);
      const [puntos, setPuntos] = useState(0);
    
      function PuntosPorMinuto() {
        useEffect(() => {
          const intervalId = setInterval(() => {
            setPuntos((puntos) => puntos + 0.2);
          }, 60000);
    
          return () => clearInterval(intervalId);
        }, []);
    
        return (
          <div className="flex  items-center gap-2 justify-between ">
            <p className="text-[1.2rem] text-white">Points: </p>
    
            <div className="flex  items-center gap-2">
              <GiTwoCoins className="text-red-500 font text-[1.4rem]" />
              <p className="text-red-500 font text-[1.2rem]">{puntos && puntos.toFixed(2)}</p>
            </div>
          </div>
        );
      }
    
      const { publicKey } = useWallet();
   
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
    
    
      const playerRef = React.useRef(null);
    
      useEffect(() => {
        const asd = async () => {
          const test2 = await checkuser(publicKey.toBase58());
          setUser(test2);
        };
    
        publicKey && asd();
      }, [publicKey, claimed]);
    
      const claimall = () => {
        const datapoints = {
          id: publicKey && publicKey.toBase58(),
          raidpoints: user?.raidpoints ? user?.raidpoints  + puntos : puntos,
        };
        updateRaidPoints(datapoints);
        setClaimed(!claimed);
        setPuntos(0);
      };


      const handleClick = () => {
        const url = `https://www.youtube.com/live_chat?is_popout=1&v=${stream}`;
        const width = 600;
        const height = 400;
        window.open(url, "_blank", `width=${width}, height=${height}`);
      };
  return (
    <>
      <div className=" flex justify-center top-0 left-0 absolute items-center p-20 mt-4">
        <div className="flex flex-col relative  w-[1100px] h-[640px] items-center justify-center">
          <div>
            <img
              className="absolute object-contain z-50 top-0 left-0 pointer-events-none rounded-lg"
              src={Overlay}
              alt="overlay"
            />
          </div>

          <div className="md:hidden lg:flex ">
            <iframe
               width="1000px"
               height="400px"
              src={`https://www.youtube.com/embed/${stream}?autoplay=1&rel=0`}
              title="YouTube Live Stream"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
            ></iframe>
         
          </div>

          <div className="flex gap-4 w-full mt-4 ml-24">
            <div className="bg-[#18171a] w-[300px] opacity-80 px-14 py-4 rounded-lg font  ">
              <div className="flex  items-center gap-2 justify-between   ">
                <p className="text-[1.2rem] text-white pt-2">Balance: </p>

                <div className="flex  items-center gap-2">
                  <GiTwoCoins className="text-red-500 font text-[1.4rem]" />
                  <p className="text-red-500 font text-[1.2rem]">
                    {user && user?.raidpoints
                      ? user.raidpoints && user?.raidpoints.toFixed(2)
                      : 0}
                  </p>
                </div>
              </div>
              <Cronometro />
              <PuntosPorMinuto />
            </div>
            <button
              onClick={() => claimall()}
              className="text-white  cursor-pointer w-[290px] ml-2 items-center h-[100px] mt-[10px] flex text-center justify-center right-2  rounded-lg border-slate-700 hover:bg-white bg-gradient-to-r from-red-800 via-pink-500 to-red-500 font-bold px-4 font text-[1.6rem]"
            >
              Claim all
            </button>
            <a
         onClick={handleClick}
              className="text-white  cursor-pointer w-[290px] ml-2 items-center h-[100px] mt-[10px] flex text-center justify-center right-2  border-slate-700 hover:bg-white bg-gradient-to-r from-orange-800 via-orange-500 to-yellow-500 font-bold px-4 font text-[1.6rem]"
            >
              Open Live Chat
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Youtube;
