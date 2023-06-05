/* eslint-disable no-unused-vars */
import React from 'react'
import { useStateValue } from '../context/StateProvider'
import { actionType } from '../context/reducer'
import UsuariosList from './Usuarioslist'

const Usuarios = () => {
  // eslint-disable-next-line comma-spacing
  const [{ users } , dispatch] = useStateValue()

  React.useEffect(() => {
    dispatch({
      type: actionType.SET_DONDE_ESTOY,
      dondeestoy: 'Dashboard'
    })
  }, [dispatch])

  return (
        <div className='md:px-8 h-[90vh] md:mt-[10vh] w-full flex fixed gap-4'>

            <div className='flex flex-col w-[86vw] ml-[14vw]'>

                <div className=' flex '>
                     <UsuariosList/>
               </div>
            </div>

        </div>
  )
}

export default Usuarios
