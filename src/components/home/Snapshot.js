import React, { useState, useEffect } from "react";
import { AiFillCamera } from "react-icons/ai";
import Overlay from "../img/snapshot.png";
import axios from "axios";
import { saveAs } from "file-saver";
import { set } from "firebase/database";

const Snapshot = () => {
  const snapshot = require("./snapshot.json").splice(0, 40);
  /*   console.log(snapshot); */
  const [nfts, setNfts] = useState([]);
  const [ready, setReady] = useState(false);
  const [search, setSearch] = useState(false);
  const [modal, setModal] = useState(false);
  const [address, setAddress] = useState("");
  const [helloId, setHelloId] = useState(false);
  const [collections, setCollections] = useState("");
  const [owners, setOwners] = useState([]);

  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const exportToJson = () => {
    const data = nfts; // Replace with your array

    const json = JSON.stringify(data, null, 2); // Convert array to JSON string

    const blob = new Blob([json], { type: "application/json" }); // Create a Blob object

    saveAs(blob, "snapshot.json"); // Save the file using FileSaver
  };

  useEffect(() => {}, []);

  const asd = async (id) => {
    setNfts("");
    setReady(false);
    setSearch(true);
    for (let i = 1; i <= 10; i++) {
      await fetchnfts(i, id);
    }

    setTimeout(() => {
      setReady(true);
      setSearch(false);
    }, 7000);
  };

  const fetchnfts = async (num, id) => {
    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        authorization: "Bearer 41d5a889-a8e6-4f4d-9183-4d594ca01992",
      },
      body: JSON.stringify({
        helloMoonCollectionId: id,
        isListed: false,
        limit: 1000,
        page: num,
      }),
    };

    fetch("https://rest-api.hellomoon.io/v0/nft/listing-status", options)
      .then((response) => response.json())
      .then(
        (res) =>
          res &&
          res.data &&
          res.data.map((a) => {
            setNfts((prev) => [
              ...prev,
              { mint: a.nftMint, holder: a.ownerAccount },
            ]);
          })
      );
  };

  console.log(nfts);

  const name = (id) => {
    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        authorization: "Bearer 41d5a889-a8e6-4f4d-9183-4d594ca01992",
      },
      body: JSON.stringify({
        searchStrategy: "default",
        collectionName: id,
      }),
    };

    fetch("https://rest-api.hellomoon.io/v0/nft/collection/name", options)
      .then((response) => response.json())
      .then((response) => setCollections(response.data))
      .catch((err) => console.error(err));
  };

  console.log(collections);

  const doscosas = (b) => {
    setHelloId(b.helloMoonCollectionId)
    setAddress(b.collectionName)
  setModal(false)
  asd(b.helloMoonCollectionId)
  }


  const handleAddressChange = (value) => {
    setAddress(value);
    name(value)
setModal(true)
  };
  
  return (
    <>
      <img
        className="h-full object-cover w-full absolute z-10 top-0 left-0 pointer-events-none"
        src={Overlay}
        alt="overlay"
      />
      <div className="w-full flex flex-col z-[100]">
        <div className="flex w-1/2 gap-2 items-center justify-center mx-auto ">
          <h1 className="font text-[4rem] opacity-80 text-tesmo justify-center">
            Tesmoshot
          </h1>
          {/*         <AiFillCamera className="  text-[4rem] opacity-60 text-tesmo   "/>
           */}{" "}
        </div>

        <div className="w-1/2 overflow-auto p-2 text-center text-white mb-4 bg-orange-500 rounded-lg opacity-100 mx-auto flex flex-col gap-2 ">
          <p>
          Take a snapshot of the delisted holder's from your collection.

          </p>
        </div>
        <div className="w-1/2 relative  flex-col flex justify-between mx-auto items-center gap-4 ">
          {/*  <div>
            <select
              className="p-2 rounded-lg w-[200px] text-gray-400 "
              value={selectedOption}
              onChange={handleOptionChange}
            >
              <option className="text-gray-100" value="">
                Select a Collection
              </option>
              <option value="thesmophoria1">Thesmophoria 1</option>
              <option value="thesmophoria2">Thetext-gray-100smophoria 2</option>
              <option value="thesmophoria3">Thesmophoria 3</option>
            </select>
          </div> */}
          <div className="flex w-full ">
            <div className="relative flex w-full">
              <input
                type="text"
                value={address}
             
               
                onChange={(e) => handleAddressChange(e.target.value)}

                className=" p-2 rounded-lg shadow-md w-full "
                placeholder="Input the Collection Address"
              />

             {/*  { !helloId ? (
                   <button
                   onClick={() => asd()}
                   className="bg-tesmo2 text-white p-2 rounded-r-lg"
                 >
                   Send
                 </button>
              
              ) : (
                <button
                    className="bg-gray-500 text-white p-2 rounded-r-lg"
                  >
                    Searching
                  </button>
               
              )
            } */}
            </div>
          </div>
          {
            modal &&
          <div className="w-full mx-auto absolute z-[100] top-14 p-4 rounded-lg h-[200px] overflow-auto bg-white bg-opacity-90 justify-between">
           {
          collections &&  collections.map(a => 
              <li onClick={() => 
              doscosas(a)
              } className='justify-between flex items-center cursor-pointer hover:bg-gray-300 p-2 rounded-lg '>
            <p>{a.collectionName}</p>
            <p className='text-gray-500'>id: {a.helloMoonCollectionId} </p>
            </li> 
              )
           }
          

          </div>
}
        </div>
        <div className="w-1/2 overflow-auto p-2 h-[300px] text-white mt-4 bg-black rounded-lg opacity-80 mx-auto flex flex-col gap-2 ">
          <ul className="justify-between  text-[1rem]  hover:bg-slate-600 w-full p-2 shadow-md rounded-lg cursor-pointer shadow-slate-800 text-center grid grid-cols-4">
            <li>Id</li>
            <li>Token</li>
            <li>Holder</li>
            <li>State</li>
          </ul>
          {ready && nfts ? (
            nfts.map((a, index) => (
              <ul className="justify-between  text-[1rem]  hover:bg-slate-600 w-full p-2 shadow-md rounded-lg cursor-pointer shadow-slate-800 text-center grid grid-cols-4">
                <li>{index}</li>
                <li>{a.mint.substr(0, 15)}...</li>
                <li>{a.holder.substr(0, 15)}...</li>
                <li>Delisted</li>
              </ul>
            ))
          ) : nfts.length > 0 ? (
            <div className="w-full h-full mx-auto flex items-center justify-between ">
              <div className="flex justify-between items-center flex-col gap-2 mx-auto">
                <svg
                  role="status"
                  className="inline w-10 h-10 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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
                <p className="flex items-center w-full text-center justify-between">
                  Searching...
                </p>
              </div>
            </div>
          ) : (
            <div className="w-full h-full mx-auto flex items-center justify-between ">
              <div className="flex justify-between items-center flex-col gap-2 mx-auto">
                <p className="flex items-center w-full text-center justify-between">
                  Take a snapshot of the delisted holder's from your collection.
                </p>
              </div>
            </div>
          )}
        </div>
        <div className="flex gap-4 w-1/2  mx-auto justify-end mt-4">
          <p className="text-white px-2 md:px-8 py-2 rounded-lg cursor-pointer font text-[1rem]">
            Export
          </p>
          <button className="text-tesmo w-[140px] px-2 md:px-8 py-2 rounded-lg   hover:bg-white hover:text-slate-700 bg-yellow-300 cursor-pointer font text-[1rem]">
            .csv
          </button>
          <button
            onClick={() => exportToJson()}
            className="text-tesmo w-[140px] px-2 md:px-8 py-2 rounded-lg  hover:bg-white hover:text-slate-700 bg-yellow-300 cursor-pointer font text-[1rem]"
          >
            .json
          </button>
        </div>
      </div>
    </>
  );
};

export default Snapshot;
