/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { BiMinus, BiPlus } from 'react-icons/bi'
import { motion } from 'framer-motion'
import { useStateValue } from '../context/StateProvider'
import { actionType } from '../context/reducer'

let items = []

const CartItem = ({ item, setFlag, flag }) => {
  const [{ cartItems }, dispatch] = useStateValue()
  const [qty, setQty] = useState(item[0].unidades)

  const cartDispatch = () => {
    localStorage.setItem('cartItems', JSON.stringify(items))
    dispatch({
      type: actionType.SET_CARTITEMS,
      cartItems: items
    })
  }

  const updateQty = (action, id) => {
    if (action === 'add') {
      setQty(qty + 1)
      // eslint-disable-next-line array-callback-return
      cartItems.map((item) => {
        if (item[0].item.id === id) {
          item[0].unidades = qty + 1
          setFlag(flag + 1)
        }
      })
      cartDispatch()
    } else {
      // initial state value is one so you need to check if 1 then remove it
      if (qty === 1) {
        items = cartItems.filter((item) => item[0].item.id !== id)
        setFlag(flag + 1)
        cartDispatch()
      } else {
        setQty(qty - 1)
        // eslint-disable-next-line array-callback-return
        cartItems.map((item) => {
          if (item[0].item.id === id) {
            item[0].unidades = qty - 1
            setFlag(flag + 1)
          }
        })
        cartDispatch()
      }
    }
  }

  useEffect(() => {
    items = cartItems
  }, [qty, items])

  return (
    <div className="w-full p-4 px-2 rounded-lg shadow-md flex items-center gap-2">
       <img
        src={item && (item[0].item.color.filter(a => a.name === item[0].colorselected)[0].images[0])}
        className="w-20 h-20 max-w-[60px]  object-contain"
        alt={item && (item[0].item.name)}
      />

      {/* name section */}
      <div className="flex flex-col gap-2">
        <p className="text-base text-[0.8rem] text-gray-500">{item[0].item.name}</p>
        <div className="flex flex-col">

          <p className="text-[0.8rem] font-semibold">
            Talle: <span>{item[0].size}</span>
          </p>
          <p className="text-[0.8rem] font-semibold">
            Color: <span>{item[0].colorselected}</span>
          </p>

        </div>

      </div>

      {/* button section */}
      <div className="group flex flex-col items-center  ml-auto cursor-pointer">
        <div className="flex gap-2">
          <motion.div
            className="bg-booty  p-1 items-center rounded-lg"
            whileTap={{ scale: 0.75 }}
            onClick={() => updateQty('remove', item[0].item.id)}
          >
            <BiMinus className="text-white " />
          </motion.div>

          <p className="w-6 h-6 rounded-lg bg-white border-2  text-textColor flex items-center justify-center">
            {qty}
          </p>

          <motion.div
            className="bg-booty  p-1 items-center rounded-lg"
            whileTap={{ scale: 0.75 }}
            onClick={() => updateQty('add', item[0].item.id)}
          >
            <BiPlus className="text-white " />
          </motion.div>

        </div>
        <div className="flex mt-8">
          <p className="text-sm block text-gray-800 font-semibold">
            $ {parseFloat(item[0].precio) * qty}
          </p>
        </div>

      </div>
    </div>
  )
}

export default CartItem
