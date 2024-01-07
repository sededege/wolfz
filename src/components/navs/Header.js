/* eslint-disable multiline-ternary */
import React, { useState } from "react";
import { MdAdd, MdLogout } from "react-icons/md";
import { FiShoppingCart } from "react-icons/fi";
import { motion } from "framer-motion";
import { HiSearch } from "react-icons/hi";
import Logo from "../img/logotesmo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import { GoListUnordered } from "react-icons/go";
import { GiTicket } from "react-icons/gi";
import { BsFillPersonFill } from "react-icons/bs";
import { AiFillLock } from "react-icons/ai";
import { WalletProvider, useWallet } from "@solana/wallet-adapter-react";
import {
  WalletDialogProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-material-ui";
import { AiOutlineTwitter } from "react-icons/ai";
import { FaDiscord } from "react-icons/fa";
import me from '../img/me.png'

const Header = () => {
  const history = useNavigate();
  const [{ user, cartShow, cartItems, dondeestoy }, dispatch] = useStateValue();
  const [isOpen, setIsOpen] = useState(false);
  const [isMenu, setIsMenu] = useState(false);
  const location = useLocation();
  const [menu, setMenu] = React.useState(location.pathname.slice(1));
  const { publicKey } = useWallet();
  const menunav = [
    /* {
      id: 0,
      name: "home",
      tab: "/Home",
    }, */
   /*  {
      id: 77,
      name: "Store",
      tab: "/store",
    }, */
    /* {
      id: 4,
      name: "Watch2earn",
      tab: "/watch2earn",
    }, */
    {
      id: 0,
      name: "home",
      tab: "/",
    },
   /*  {
      id: 1,
      name: "raffles",
      tab: "/raffles",
    }, */
   
    {
      id: 3,
      name: "kingdom",
      tab: "/kingdom",
    },
  ];

  const abrirEdit = () => {
    dispatch({
      type: actionType.SET_EDIT_SHOW,
      editShow: true,
    });
    setIsMenu(false);
  };

  const login = async () => {
    if (!user) {
      dispatch({
        type: actionType.SET_LOGIN_SHOW,
        loginShow: true,
      });
    } else {
      setIsMenu(!isMenu);
    }
  };

  const logout = () => {
    setIsMenu(false);
    localStorage.clear();

    dispatch({
      type: actionType.SET_USER,
      user: null,
    });
  };

  const showCart = () => {
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: !cartShow,
    });
  };

  const variants = {
    open: { width: 300, marginLeft: 40 },
    closed: { width: 0 },
  };

  return (
    <header
     
    >
      {/* desktop & tablet */}

      <div className="hidden p-4 md:flex md:fixed left-0 top-0 md:flex-col h-full items-center justify-between">
       <div>
        <Link
          to={"/Home"}
        >
          <img
            src={Logo}
            className="w-16
           rounded-full object-cover mix-blend-screen "
            alt="ß"
          />
        </Link>
        </div>
        <div className="flex flex-col items-center gap-4">
          {menunav.map((a, index) => (
            <Link key={index} to={a.tab}>
              <div
                onClick={() => setMenu(a.name)}
                key={index}
                className={`${
                  menu === a.name ? "text-yellow-400 " : "text-white"
                }  font-bold font text-[0.8rem] cursor-pointer `}
              >
                {a.name}
              </div>
            </Link>
          ))}
        <WalletMultiButton />

         
        </div>
        <div className="md:flex md:flex-col  hidden gap-4 items-center cursor-pointer">
          <div className="flex gap-2">
        <a href="https://magiceden.io/marketplace/dyor_wolfz">
          <img className="w-6 h-6 object-contain " src={me} alt="me" />
        </a>
        <a href="https://twitter.com/DyorWolfz">
          <AiOutlineTwitter className="text-[26px] text-white  hover:text-sky-500" />
        </a>
        <a href="https://discord.com/invite/KxKAyntQFZ">
          <FaDiscord className="text-[26px] text-white hover:text-purple-500" />
        </a>
        </div>

      </div>

      </div>

      {/* mobile */}
      <div className="flex items-center justify-between md:hidden w-full h-full ">
        <Link
          to={`${dondeestoy === "Dashboard" ? "/Dashboard" : "/Home"}`}
          className="flex items-center gap-2"
        >
          <img src={Logo} className="w-16 object-cover" alt="logo" />
        </Link>

        <div className="flex  gap-2 items-center text-[1rem] text-white">
          <Link to={`/vault`} className="flex items-center gap-2">
            <AiFillLock />
          </Link>
          <Link to={`/raffle`} className="flex items-center gap-2">
            <GiTicket />
          </Link>
          <WalletMultiButton />
        </div>
        {/*  {dondeestoy === "Dashboard" ? (
          <motion.span whileTap={{ scale: 0.75 }}>
            <GoListUnordered
              onClick={() => history("Dashboard/Pedidos")}
              className="text-booty text-2xl  cursor-pointer"
            />
          </motion.span>
        ) : (
          <div className="flex gap-4 relative">
            <div className="flex items-center gap-2">
              <motion.span whileTap={{ scale: 0.75 }}>
                <GoListUnordered
                  onClick={() => history("/Ordenes/Ver")}
                  className="text-booty text-2xl  cursor-pointer"
                />
              </motion.span>
          
            </div>
            <div
              className="relative flex items-center justify-center"
              onClick={showCart}
            >
              <FiShoppingCart
                onClick={showCart}
                className="text-booty text-2xl  cursor-pointer"
              />

              {cartItems && cartItems.length > 0 && (
                <div className=" absolute -top-2 -right-2 w-5 h-5 rounded-full bg-booty flex items-center justify-center">
                  <p className="text-xs text-white font-semibold">
                    {cartItems.length}
                  </p>
                </div>
              )}
            </div>
        

          </div>
        )} */}
      </div>
    </header>
  );
};

export default Header;
