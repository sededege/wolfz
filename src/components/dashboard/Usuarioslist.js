import React from 'react'
import {
  MdDelete
} from 'react-icons/md'
import { useStateValue } from '../context/StateProvider'
import { borraruser, getAllUsuarios } from '../utils/firebaseFunctions'
import { actionType } from '../context/reducer'
import { BsWhatsapp } from 'react-icons/bs'

const UsuariosList = () => {
  const [{ users }, dispatch] = useStateValue()

  const borrarproduct = (id) => {
    borraruser(id)
    fetchUsers()
  }

  const fetchUsers = async () => {
    await getAllUsuarios().then((data) => {
      dispatch({
        type: actionType.SET_USERS,
        users: data
      })
    })
  }

  const cambiar = (e) => {
    if (e) {
      const text = e.toString()
      return `+598${text.substring(1)}`
    } else {
      return null
    }
  }

  return (
    <div className="flex gap-10 ">
      <div className="mt-4 w-[82vw] drop-shadow-lg  flex items-start justify-center gap-10  h-[80vh] overflow-auto rounded-lg">
        {users && users.length > 0
          ? (
          <table className=" w-full overflow-auto items-center justify-center text-center ">
            <thead className="text-textColor  ">
              <tr>
                <th>Nro</th>
                <th>Email</th>
                <th>Celular</th>
                <th>Barrio</th>
                <th>Direccion</th>
                <th>Puerta</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users && users.length > 0
                ? (
                    users.map((a, index) => (
                  <tr
                    key={index}
                    id={a.id}
                    className="bg-bghome  hover:bg-white rounded-full "
                  >
                    <td className="text-textColor text-lg">{index + 1}</td>
                    <td className="text-textColor text-md">{a.user}</td>
                    <td className="text-textColor text-md ">{a.cel}</td>
                    <td className="text-textColor text-md ">{a.barrio}</td>
                    <td className="text-textColor text-md ">{a.dire}</td>
                    <td className="text-textColor text-md ">{a.puerta}</td>

                    <td className="text-black">
                      <div className="flex gap-2 items-center justify-center">

                          <a
                            href={`https://wa.me/${cambiar(a.cel)}`}
                            className="hidden md:flex"
                          >
                              <BsWhatsapp className="w-6 h-6 " />

                          </a>

                        <div
                          onClick={() => borrarproduct(a.id)}
                          className="bg-red-400 p-2 rounded-lg cursor-pointer drop-shadow-lg shadow-md"
                        >
                          {' '}
                          <MdDelete className="text-white" />
                        </div>
                      </div>
                    </td>
                  </tr>
                    ))
                  )
                : (
                <></>
                  )}
            </tbody>
          </table>
            )
          : (
          <p>No hay datos para mostrar</p>
            )}{' '}
      </div>
    </div>
  )
}

export default UsuariosList
