import React from "react";
import test from "./profile.gif";
const Home = () => {
  return (
    <div className="w-[86vw] ml-[14vw] h-full px-20 items-center justify-center flex flex-col">
      {/*       <img src={test} className="w-[400px] mb-4" alt="gif" />
       */}
      <div className="flex flex-col items-center justify-center bg-black bg-opacity-70 p-4 rounded-md">
        <h1 className="font text-white text-center  text-[1.6rem]">
          1st Phase = The Adoption
        </h1>
        <div className="w-[35vw] mt-4">
          <p className="text-white  text-center text-[1rem]">
            In our DAO, decisions are made collaboratively, with everyone
            contributing to prevent scams and execute profitable plays.{" "}
            <br></br>
            With DYOR Wolfz collection, our aim is to expand our community and
            give blockchain value to what once started as an alpha group.{" "}
            <br></br>The artistic contributions to the community will be created
            by each holder.
            <br></br> The second part of this initiative holds exciting
            surprises, but for now, I can't reveal any details.
            <br></br>
            <br></br>
            <span className=" font-bold">
              Welcome to DYOR Wolfz, a fun and curious experiment by{" "}
              <a
                className="underline text-sky-400 cursor-pointer"
                href="https://twitter.com/rkztech"
              >
                @rkztech
              </a>
            </span>
          </p>
          <div className="mt-10 w-full justify-center gap-4 flex">
            <a
              href="https://magiceden.io/marketplace/dyor_wolfz"
              className="p-2 bg-pink-600 rounded-lg text-white"
            >
              Buy on Magiceden
            </a>
            <a
              href="https://www.tensor.trade/trade/dyor_wolfz"
              className="p-2 bg-white rounded-lg text-black"
            >
              Buy on Tensor
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
