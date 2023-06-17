import React, {useState} from 'react'
import { getUser, updatePoints } from '../utils/firebaseFunctions';

const Sendpoints = () => {
    const [modal, setModal] = React.useState(false);
    const [name, setName] = useState("");
    const [points, setPoints] = useState(0);
    const [user, setUser] = useState("");

    const checkuser = async (a) => {
        const res = await getUser(a);
        if (res) {
          setUser(res)
        } else {
         setUser(false)
        }
      };

    const savepoints = () => {
        const datapoints = {
            id: name,
            points: points,
          };
          updatePoints(datapoints);
    checkuser(name)
      };

   
  return (
    <div className='flex flex-col gaop-4'>
          {modal && (
        <div className="w-[500px] opacity-95 border-2 bg-tesmo fixed left-[calc(50vw-250px)] overflow-auto p-8 rounded-lg ">
          <button
            onClick={() => setModal(!modal)}
            className="absolute right-10 top-4 text-white bg-tesmo2 p-2 w-8 h-8 rounded-full items-center flex justify-center"
          >
            x
          </button>
          <div className="flex">
        <input
          type="text"
          defaultValue={name}
          onChange={(e) => setName(e.target.value)}
          className=" px-2 ml-2 rounded-l-lg shadow-md "
          placeholder="Search wallet"
        />
        <button
          onClick={() => checkuser(name)}
          className="bg-tesmo2 text-white p-2 rounded-r-lg"
        >
          Search
        </button>
        
      </div>
      {
        user ?   <div className='flex flex-col text-white mt-4'>
        <p>{user.id}</p>
        <p>Nfts staked: {user.staked.length}</p>
        <p>Points: {user.points}</p>
        <div className="flex">
        <input
          type="number"
          defaultValue={name}
          onChange={(e) => setPoints(e.target.value)}
          className=" px-2 rounded-l-lg shadow-md mt-2 text-tesmo"
          placeholder="Put points to send"
        />
        <button
          onClick={() => savepoints(points)}
          className="bg-tesmo2 text-white p-2 rounded-r-lg mt-2"
        >
          Send points
        </button>
        
      </div>
        </div> : <p className='text-white mt-4'>Wallet not found</p>
      }
    
        </div>
      )}
          <button
                  onClick={() => setModal(!modal)}
                  className="bg-tesmo2 font-bold text-white p-2 rounded-lg"
                >
                 Send points
                </button>

    </div>
  )
}

export default Sendpoints