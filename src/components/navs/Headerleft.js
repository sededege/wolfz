import React from 'react'
import * as MaterialDesign from 'react-icons/md'
import { menu, dashboard } from '../utils/data'
import { motion } from 'framer-motion'
import { useStateValue } from '../context/StateProvider'
import { actionType } from '../context/reducer'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../img/logo.jpg'

const Headerleft = () => {
  const [{ dondeestoy }, dispatch] = useStateValue()
  const history = useNavigate()
  const [selected, setSelected] = React.useState('')

  React.useEffect(() => {
    setSelected(dondeestoy)
  }, [dondeestoy])

  const enviar = (a) => {
    setSelected(a)
    if (a === 'Catalogo') {
      history('/Catalogo')
      dispatch({
        type: actionType.SET_CATEGORY,
        categoryselect: 'todas'
      })
    } else if (a === 'Home') {
      history('/Home')
    } else if (a === 'Añadir') {
      history('/nuevoproducto')
    } else if (a === 'Dashboard') {
      history('/Dashboard')
    } else if (a === 'Ordenes') {
      history('/Ordenes/ver')
    } else if (a === 'Pedidos') {
      history('/Dashboard/Pedidos')
    } else if (a === 'Usuarios') {
      history('/Dashboard/Usuarios')
    }
  }

  return (
        <div>
            {/* escritorio */}
            <motion.div
                key='2'
                exit={{ opacity: 0, x: -200 }}
                initial={{ opacity: 0, x: -200 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className='h-screen top-0 fixed z-[100] md:w-[14vw] hidden border-2 bg-white  drop-shadow-lg items-center  md:flex flex-col  '>
                {/*  {
                    dondeestoy === 'Dashboard' ? <></> : <div onClick={headerOff} className='p-1 absolute mt-10 first-line:rounded-full'>
                        <BsArrowRight style={{ fontSize: 22 }} />
                    </div>
                }
 */}

                <div className='flex-col  mt-60 flex gap-5 md:items-center py-6  cursor-pointer'>
                    <Link to={'/Home'} className="flex  items-center gap-2">
                        <img src={Logo} className="w-20 object-cover" alt="ß" />
                    </Link>

                    {
                        dondeestoy === 'Dashboard'
                          ? dashboard.map(a => (
                                <motion.div key={a.id} onClick={() => enviar(a.name)} className={` ${selected === a.name ? 'bg-booty px-4 ' : 'bg-transparent'} : p-1 rounded-lg transition duration-200 ease-in-out cursor-pointer`}>
                                    <div className={` ${selected === a.name ? 'text-white' : 'text-gray-400'} :  py-1 rounded-full flex gap-2 justify-center items-center cursor-pointer`} style={{ fontSize: 22 }}>{React.createElement(MaterialDesign[a.icon])}
                                        <p className={` ${selected === a.name ? 'font-bold text-sm hidden md:flex' : 'text-sm hidden md:flex '}`}>{a.name}</p></div>
                                </motion.div>
                          ))
                          : menu.map(a => (
                                <motion.div key={a.id}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => enviar(a.name)} className={` ${selected === a.name ? 'bg-booty px-4 ' : 'bg-transparent hover:text-white '} : p-1 rounded-lg hover:shadow-lg transition duration-100 ease-in-out`}>
                                    <div className={` ${selected === a.name ? 'text-white' : 'text-gray-400 '} :  py-1 rounded-full flex gap-2 justify-center items-center `} style={{ fontSize: 22 }}>{React.createElement(MaterialDesign[a.icon])}
                                        <p className={` ${selected === a.name ? 'font-bold text-sm hidden md:flex' : 'text-sm hidden md:flex '}`}>{a.name}</p></div>
                                </motion.div>
                          ))
                    }

                </div>
                <div className='py-10 absolute bottom-0  cursor-pointer'>
                    <div className='text-gray-400' style={{ fontSize: 22 }}>{React.createElement(MaterialDesign.MdLogout)}</div>
                </div>
            </motion.div>

        </div>
  )
}

export default Headerleft
