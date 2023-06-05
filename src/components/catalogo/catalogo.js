import React, { useCallback } from 'react'
import { useStateValue } from '../context/StateProvider'
import { actionType } from '.././context/reducer'
import Filtros from '../filtros/Filtros'
import Products2 from './catalogoproducts'

const Catalogo = () => {
    const [  dispatch] = useStateValue();

    useCallback( () => {
        dispatch({
            type: actionType.SET_HEADER_SHOW,
            headerShow: false,
        })

        dispatch({
            type: actionType.SET_DONDE_ESTOY,
            dondeestoy: 'Catalogo'
        })
     }, [dispatch]);

    /* React.useEffect(() => {
        headerOff()
       
    }, [dispatch,headerOff]);
 */
    
  
    return (
        <div>
            <div className='w-full flex h-screen md:px-20 '>
                <div className='flex gap-10 py-5 mt-[10vh]'>
                    <Filtros />
                    <Products2 className='flex' />
                </div>
            </div>
        </div>

    )
}

export default Catalogo