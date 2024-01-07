import React from "react";
import { motion } from "framer-motion";

import "tailwindcss/tailwind.css";

const ProgressBar = ({ progress }) => {
  return (
    <div className="relative w-full h-2 rounded-full bg-tesmo2 overflow-hidden ">
      <motion.div
        className="absolute top-0 left-0 h-full bg-yellow-400 "
        style={{ width: `${progress}%` }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5 }}
      ></motion.div>
    </div>
  );
};

export default ProgressBar;
