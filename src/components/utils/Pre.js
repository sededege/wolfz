/* eslint-disable react/prop-types */
import { motion } from 'framer-motion'
import React from 'react'
function Pre (props) {
  return <motion.div className='transition 2s ease-in-out'

    id={props.load ? 'preloader' : 'preloader-none'}>

    </motion.div>
}

export default Pre
