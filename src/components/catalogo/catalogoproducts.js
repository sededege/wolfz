import React from 'react'
import { FiShoppingCart } from 'react-icons/fi'
import { useStateValue } from '.././context/StateProvider'
import Carrousel from '../home/Carousel'

const Products2 = () => {
  const [{ products }] = useStateValue()

  return (
        <div className=' grid grid-cols-2 md:grid-cols-4  w-full gap-10 h-screen'>
            {
                products && products.length > 0
                  ? products.map(a => (
                        <div key={a.id}>
                            <div className='gap-2 flex flex-col'>
                                <div>
                                    <Carrousel imagenes={a.color} id={a.id} />

                                </div>
                                <div className='p-2 rounded-b-lg relative'>
                                    <div className='flex justify-between items-center'>
                                        <p className='font-regular text-textColor w-[200px] text-[1.rem]'>{a.name}</p>
                                    </div>
                                    <div className='flex mt-2 h-full justify-between  items-center '>
                                        <p className='font-bold text-[1.2rem] text-black'>$ {a.precio}</p>
                                        {/*                                         <MdArrowForwardIos className='text-[2rem] text-booty bg-bghome p-2 rounded-full ' />
 */}
                                        <FiShoppingCart className='text-[1.4rem] text-booty  ' />
                                    </div>

                                </div>
                            </div>
                        </div>
                  ))
                  : <div className='flex w-[60vw] h-[70vh] items-center justify-center'><p>No hay datos con estas caracteristicas</p></div>
            }
        </div>

  )
}

export default Products2
