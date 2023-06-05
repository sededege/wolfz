import React from 'react'
import { AiOutlineCheckCircle } from 'react-icons/ai'

const Feedback = () => {


    return (
        <div className='fixed text-center flex flex-col items-center justify-center w-[74vw] mt-[10vh] ml-[14vw] h-[70vh] bg-white z-10'>
            <AiOutlineCheckCircle className='text-[6rem] text-booty' />
         
            <p className='font-semibold text-green-400 '>Tu pedido fue recibido con exito!</p>
            <p className='font-regular text-gray-400 '>Nos contactaremos contigo en el correr <br></br>del día para coordinar la entega!</p>
            <p className='font-semibold text-booty'>Gracias por tu compra :3</p>
        </div>

    )
}

export default Feedback