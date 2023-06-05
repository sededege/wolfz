import React, { useState } from 'react'
import { useStateValue } from '.././context/StateProvider'
import { actionType } from '.././context/reducer'
import { getAllUsuarios, updateAddres } from '../utils/firebaseFunctions'
import { motion } from 'framer-motion'

const SetAddres = () => {
  const [{ user, users }, dispatch] = useStateValue()
  const [alias, setAlias] = React.useState(null)
  const [dire, setDire] = React.useState(null)
  const [puerta, setPuerta] = React.useState(null)
  const [apto, setApto] = React.useState(null)
  const [barrio, setBarrio] = React.useState(null)
  const [userexiste, setUserExiste] = React.useState(null)
  const [existeuser, setExisteUsuario] = React.useState(null)
  const [fields, setFields] = useState(false)
  const [alertStatus, setAlertStatus] = useState('false')
  const [msg, setMsg] = useState(null)

  const recargar = () => {
    if (users && user) {
      const existeusuario = users.filter((a) => a.user === user.email)
      console.log('users')
      console.log(users)
      console.log('user email')
      console.log(user.email)
      console.log('existe usuario')
      console.log(existeusuario)
      setExisteUsuario(users.filter((a) => a.user === user.email))
      if (existeusuario && existeusuario.length > 0) {
        setUserExiste(true)
        setAlias(existeusuario[0].alias)
        setDire(existeusuario[0].dire)
        setPuerta(existeusuario[0].puerta)
        setApto(existeusuario[0].apto)
        setBarrio(existeusuario[0].barrio)
      } else {
        setUserExiste(false)
      }
    }
  }
  React.useEffect(() => {
    recargar()
  }, [user, users])

  const cerrarEdit = () => {
    dispatch({
      type: actionType.SET_EDIT_SHOW,
      editShow: false
    })
  }

  const fetchUsers = async () => {
    await getAllUsuarios().then((data) => {
      dispatch({
        type: actionType.SET_USERS,
        users: data
      })
    })
  }

  const clearData = () => {
    setAlias('')
    setDire('')
    setPuerta('')
    setApto('')
    setBarrio('')
  }

  const guardarEdit = () => {
    if (userexiste) {
      const data = {
        id: existeuser[0].id,
        alias,
        dire,
        puerta,
        apto,
        barrio,
        user: existeuser[0].user,
        cel: existeuser[0].cel
      }
      updateAddres(data)
      clearData()
      fetchUsers()
      setFields(true)
      setMsg('Datos modificados')
      setAlertStatus(false)
      setTimeout(() => {
        setFields(false)
      }, 2000)
      setTimeout(() => {
        cerrarEdit()
      }, 2000)
      recargar()
    }
  }

  return (
    <div className="w-full h-full items-center flex justify-center fixed z-[200] top-0 bg-black bg-opacity-25 ">
      <form className="w-full fixed z-[99]  max-w-lg p-10 bg-white rounded-lg">
        <div className="flex  flex-wrap -mx-3 mb-6">
          {fields && (
            <div className="px-3 flex-wrap w-full mb-3">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={`w-ful p-2 rounded-lg text-center text-lg text-semibold ${
                  alertStatus === 'danger'
                    ? 'bg-red-400 text-red-800'
                    : 'bg-emerald-400 text-emerald-800'
                } `}
              >
                {msg}
              </motion.p>
            </div>
          )}
          <div className="w-full px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Alias*
            </label>
            <input
              value={alias}
              onChange={(e) => setAlias(e.target.value)}
              required
              className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name"
              type="text"
              placeholder="Escribe un nombre"
            />
          </div>
          <div className="w-full px-3 mt-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Calle*
            </label>
            <input
              value={dire}
              onChange={(e) => setDire(e.target.value)}
              required
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-last-name"
              type="text"
              placeholder="Dirección"
            />
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-2">
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Nro de puerta *
            </label>
            <input
              value={puerta}
              onChange={(e) => setPuerta(e.target.value)}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-city"
              type="number"
              placeholder="4134"
            />
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Apartamento
            </label>
            <div className="relative">
              <input
                value={apto}
                onChange={(e) => setApto(e.target.value)}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-city"
                type="text"
                placeholder="A910"
              />
            </div>
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Barrio
            </label>
            <input
              value={barrio}
              onChange={(e) => setBarrio(e.target.value)}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-zip"
              type="text"
              placeholder="Pocitos"
            />
          </div>
        </div>
        <div className="justify-end gap-2 flex items-center mt-4">
          <button
            onClick={cerrarEdit}
            className="relative  items-center justify-center ml-100 bg-red-500 hover:bg-red-700 border-red-500 hover:border-red-700 text-sm border-4 text-white py-1 px-2 rounded"
            type="button"
          >
            Cancelar{' '}
          </button>
          <button
            onClick={guardarEdit}
            className="relative  items-center justify-center ml-100 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
            type="button"
          >
            Guardar
          </button>
        </div>
      </form>
    </div>
  )
}

export default SetAddres
