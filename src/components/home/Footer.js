import React from "react";
import { AiOutlineTwitter } from "react-icons/ai";
import { FaDiscord } from "react-icons/fa";
import me from "../img/me.png";
const Footer = () => {
  return (
    <div
      className=" text-white z-[59] w-full  text-[0.9rem] text-center h-[5vh] fixed bottom-0 justify-between hidden md:flex py-2 md:py-8 md:items-center
     px-10"
    >
      <p className="text-[0.8rem]">© Copyright 2023 by Thesmophoria .</p>
      <div className="md:flex  hidden gap-4 items-center cursor-pointer">
        <a href="https://magiceden.io/marketplace/tesmophoria">
          <img className="w-6 h-6 object-contain " src={me} alt="me" />
        </a>
        <a href="https://twitter.com/thesmophoria_">
          <AiOutlineTwitter className="text-[26px] text-white  hover:text-sky-500" />
        </a>
        <a href="https://discord.com/invite/tesmophoria">
          <FaDiscord className="text-[26px] text-white hover:text-purple-500" />
        </a>
      </div>
    </div>
  );
};

export default Footer;
