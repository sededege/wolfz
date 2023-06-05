/* eslint-disable react/react-in-jsx-scope */
import { useState, useEffect } from 'react'
import { useStateValue } from '.././context/StateProvider'
import { actionType } from '.././context/reducer'


const MainContainer = () => {
  const [{ cartShow, products, dondeestoy }, dispatch] = useStateValue()
  const [scrollValue] = useState(0)

  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage] = useState(10)

  const lastPostIndex = currentPage * postsPerPage
  const firstPostIndex = lastPostIndex - postsPerPage
  const currentPosts =
    products && products.slice(firstPostIndex, lastPostIndex)

  useEffect(() => {
    dispatch({
      type: actionType.SET_DONDE_ESTOY,
      dondeestoy: 'Home'
    })
    dispatch({
      type: actionType.SET_HEADER_SHOW,
      headerShow: true
    })
  }, [scrollValue, cartShow, dispatch])

  return (
    <div className="w-full flex h-full md:px-20 mt-[10vh] ">
     
    </div>
  )
}

export default MainContainer
