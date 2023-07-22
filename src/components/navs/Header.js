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
    {
      id: 4,
      name: "Watch2earn",
      tab: "/watch2earn",
    },
    {
      id: 1,
      name: "raffles",
      tab: "/",
    },
    {
      id: 3,
      name: "vault",
      tab: "/vault",
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
      className={
        "md:px-10 px-5 w-full flex justify-between  top-0 h-[10vh] fixed bg-transparent z-[100]"
      }
    >
      {/* desktop & tablet */}

      <div className="hidden md:flex w-full h-full items-center justify-between">
        <p className="font-bold font text-[1.6rem] text-white cursor-pointer">
          Thesmophoria
        </p>
        <Link
          to={"/Home"}
          className="flex  items-center gap-2 fixed left-[calc(50%-40px)]"
        >
          <img
            src={Logo}
            className="w-20
           rounded-full object-cover mix-blend-screen testeo"
            alt="ß"
          />
        </Link>

        <div className="flex items-center gap-4">
          {menunav.map((a, index) => (
            <Link key={index} to={a.tab}>
              <div
                onClick={() => setMenu(a.name)}
                key={index}
                className={`${
                  menu === a.name ? "text-yellow-400" : "text-white"
                }  font-bold font text-[1.2rem] cursor-pointer `}
              >
                {a.name}
              </div>
            </Link>
          ))}

          {/*  <div className="relative flex items-center gap-2">
            <motion.div whileTap={{ scale: 0.6 }} className="drop-shadow-md ">
              <BsFillPersonFill
                className={`${
                  user ? "text-booty" : "text-gray-400"
                } w-10 h-10 p-2  bg-white cursor-pointer rounded-full  `}
                alt="userprofile"
                onClick={() => setIsMenu(!isMenu)}
              />
            </motion.div>
         {isMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className="w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-12 right-0"
              >
            
                {user && user.email === "lindadenisova012@gmail.com" && (
                  <Link to={"/Dashboard"}>
                    <p
                      className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base"
                      onClick={() => setIsMenu(false)}
                    >
                      Dashboard
                    </p>
                  </Link>
                )}

                <p
                  className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base"
                  onClick={logout}
                >
                  Logout <MdLogout />
                </p>
              </motion.div>
            )}
          </div> */}
          <WalletMultiButton />
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

        <div className="flex  gap-2 items-center text-[2rem] text-white">
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
