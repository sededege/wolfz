import React, { useState } from 'react'
import { MdLogout } from 'react-icons/md'
import { motion } from 'framer-motion'
import Avatar from './img/avatar.png'
import { Link } from 'react-router-dom'
import { useStateValue } from './context/StateProvider'
import { actionType } from './context/reducer'

const UserAuth = () => {
  const [{ user }, dispatch] = useStateValue()
  const [isMenu, setIsMenu] = useState(false)
  const abrirEdit = () => {
    dispatch({
      type: actionType.SET_EDIT_SHOW,
      editShow: true
    })
    setIsMenu(false)
  }

  const logout = () => {
    setIsMenu(false)
    localStorage.clear()

    dispatch({
      type: actionType.SET_USER,
      user: null
    })
  }

  return (
        <div className="relative">
            <motion.img
                whileTap={{ scale: 0.6 }}
                src={user ? user.photoURL : Avatar}
                className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer rounded-full"
                alt="userprofile"
                // eslint-disable-next-line no-undef
            />
            {isMenu && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.6 }}
                    className="w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-12 right-0"
                >

                    <p
                        className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base"
                        onClick={() => abrirEdit()}
                    >
                        Editar datos
                    </p>

                    {user && user.email === 'lindadenisova012@gmail.com' && (
                        <Link to={'/Dashboard'}>
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
        </div>
  )
}

export default UserAuth
