/* eslint-disable object-curly-spacing */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { useStateValue } from '.././context/StateProvider'
import { motion } from 'framer-motion'
import { MdDelete, MdCloudUpload, MdAttachMoney } from 'react-icons/md'
import { colors } from '.././utils/data'
import { categorias } from '.././utils/databooty'
import Loader from '../utils/Loader'
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { storage } from '../../firebase.config'
import { saveItem, getAllFoodItems } from '.././utils/firebaseFunctions'
import { actionType } from '../../components/context/reducer'

const CreateContainer = () => {
  const [title, setTitle] = useState('')
  const [fields, setFields] = useState(false)
  const [alertStatus, setAlertStatus] = useState('false')
  const [msg, setMsg] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isLoading1, setIsLoading1] = useState(false)
  const [isLoading2, setIsLoading2] = useState(false)
  const [descripcion, setDescription] = useState('Escribe aqui las caracteristicas')
  const [caracteristicas, setCaracteristicas] = useState('pega el link de la guia de talles')
  const [price, setPrice] = useState('')
  const [oferta, setOferta] = useState(0)
  const [category, setCategory] = useState(null)
  const [imageAsset, setImageAsset] = useState(null)
  const [imageAsset1, setImageAsset1] = useState(null)
  const [imageAsset2, setImageAsset2] = useState(null)
  const [color, setColor] = useState('Negro')
  const [qtyS, setS] = useState('')
  const [qtyM, setM] = useState('')
  const [qtyL, setL] = useState('')
  const [miniaturavideo, setMiniaturaVideo] = useState('')
  const [video, setVideo] = useState('')
  const [colores, setColores] = useState([])

  const [{products}, dispatch] = useStateValue()
  const fetchData = async () => {
    await getAllFoodItems().then((data) => {
      dispatch({
        type: actionType.SET_FOOD_ITEMS,
        foodItems: data
      })
    })
  }

  React.useEffect(() => {
    dispatch({
      type: actionType.SET_DONDE_ESTOY,
      dondeestoy: 'Dashboard'
    })
  }, [])

  const deleteImage = () => {
    setIsLoading(true)
    const deleteRef = ref(storage, imageAsset)
    deleteObject(deleteRef).then(() => {
      setImageAsset(null)
      setIsLoading(false)
      setFields(true)
      setMsg('Image deleted succesfully!')
      setAlertStatus('Succes')
      setTimeout(() => {
        setFields(false)
      }, 4000)
    })
  }

  const uploadImage = (e) => {
    setIsLoading(true)
    const imageFile = e.target.files[0]
    const storageRef = ref(storage, `images/${Date.now()}-${imageFile.name}`)
    const uploadTask = uploadBytesResumable(storageRef, imageFile)
    uploadTask.on('state_changed', (snapshot) => {
    }, () => {
      setFields(true)
      setMsg('Error while uploading: Try again')
      setAlertStatus('danger')
      setTimeout(() => {
        setFields(false)
        setIsLoading(false)
      }, 4000)
    }, () => {
      getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
        setImageAsset(downloadURL)
        setIsLoading(false)
        setFields(true)
        setMsg('Image upload sueccesfully!')
        setAlertStatus('Succes')
        setTimeout(() => {
          setFields(false)
        }, 4000)
      })
    })
  }
  const uploadImage2 = (e) => {
    setIsLoading2(true)
    const imageFile = e.target.files[0]
    const storageRef = ref(storage, `images/${Date.now()}-${imageFile.name}`)
    const uploadTask = uploadBytesResumable(storageRef, imageFile)
    uploadTask.on('state_changed', (snapshot) => {
    }, () => {
      setFields(true)
      setMsg('Error while uploading: Try again')
      setAlertStatus('danger')
      setTimeout(() => {
        setFields(false)
        setIsLoading(false)
      }, 4000)
    }, () => {
      getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
        setImageAsset2(downloadURL)
        setIsLoading2(false)
        setFields(true)
        setMsg('Image upload sueccesfully!')
        setAlertStatus('Succes')
        setTimeout(() => {
          setFields(false)
        }, 4000)
      })
    })
  }
  const uploadImage1 = (e) => {
    setIsLoading1(true)
    const imageFile = e.target.files[0]
    const storageRef = ref(storage, `images/${Date.now()}-${imageFile.name}`)
    const uploadTask = uploadBytesResumable(storageRef, imageFile)
    uploadTask.on('state_changed', (snapshot) => {
    }, () => {
      setFields(true)
      setMsg('Error while uploading: Try again')
      setAlertStatus('danger')
      setTimeout(() => {
        setFields(false)
        setIsLoading(false)
      }, 4000)
    }, () => {
      getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
        setImageAsset1(downloadURL)
        setIsLoading1(false)
        setFields(true)
        setMsg('Image upload sueccesfully!')
        setAlertStatus('Succes')
        setTimeout(() => {
          setFields(false)
        }, 4000)
      })
    })
  }

  const update = (e) => {
    setL(e.target.value)
  }
  const push = () => {
    console.log(colores)
    if (colores.filter(a => a.name === color) !== '') {
      setColores(prevState => [...prevState, {
        id: Date.now(),
        name: color,
        images: [
          imageAsset,
          imageAsset1,
          imageAsset2

        ],
        video: [
          video
        ],
        miniaturavideo: [
          miniaturavideo
        ],
        tallas: [
          {
            id: 1,
            name: 'S',
            stock: qtyS,
            ventas: 0
          },
          {
            id: 2,
            name: 'M',
            stock: qtyM,
            ventas: 0
          },
          {
            id: 3,
            name: 'L',
            stock: qtyL,
            ventas: 0
          }

        ]

      }])
    } else {
      console.log('ya existe')
    }
  }

  const dataa = {
    id: `${Date.now()}`,
    name: title,
    descripcion,
    caracteristicas,
    precio: price,
    categoria: category,
    color: colores,
    oferta
    /*  comentarios: [
             {
                 nombre: 'Florencia Moraes',
                 msg: 'Hermosa calza',
                 rate: 5,
                 date: "2012-04-21T18:25:43-05:00",
             },
             {
                 nombre: 'Antonia Diaz',
                 msg: 'Me encanto!',
                 rate: 4,
                 date: "2012-04-21T18:25:43-05:00",

             },
             {
                 nombre: 'Antonia Diaz',
                 msg: 'Me encanto!',
                 rate: 4,
                 date: "2012-04-21T18:25:43-05:00",
             },

         ] */
  }

  /* console.log(imageAsset) */
  /*     setData(prevState => [...prevState, { original: el, thumbnail: el }])
     */

  const cambio = (e) => {
    setColor(e.target.value)
    setImageAsset(null)
    setImageAsset1(null)
    setImageAsset2(null)
    setM('')
    setS('')
    setL('')
    setVideo('')
    setMiniaturaVideo('')
  }
  const saveDetails = () => {
    /*    setTimeout(() => {
            push()
        }, 4000) */
    setIsLoading(true)
    try {
      if ((!imageAsset || !price || !category || !colores)) {
        setFields(true)
        setMsg('Required fields cant be empty')
        setAlertStatus('danger')
        setTimeout(() => {
          setFields(false)
          setIsLoading(false)
        }, 4000)
      } else {
        /*   const dataa = {
                      id: `${Date.now()}`,
                      title: title,
                      imageURL: imageAsset,
                      category: category,
                      calories: calories,
                      qty: 1,
                      price: price,
                      description: descripcion
                  } */

        saveItem(dataa)
        setIsLoading(false)
        setFields(true)
        setMsg('Data uploaded!')
        setAlertStatus('Succes')
        clearData()
        setTimeout(() => {
          setFields(false)
        }, 4000)
        fetchData()
      }
    } catch (error) {
      console.log(error)
      setFields(true)
      setMsg('Error while uploading: Try again')
      setAlertStatus('danger')
      setTimeout(() => {
        setFields(false)
        setIsLoading(false)
      }, 4000)
    }
  }

  const clearData = () => {
    setTitle('')
    setImageAsset(null)
    setPrice('')
    setCategory('Select Category')
  }

  return (
        <div className='gap-4 grid grid-cols-4 h-[90vh] fixed mt-[10vh] ml-[10vw] w-[90vw] px-20 rounded-lg py-10  '>
            <div className='col-span-2 px-10 py-5 flex flex-col justify-between'>
                <div className='grid grid-cols-2 gap-4'>
                    <div className='col-span-2'>
                        <p className='font-semibold text-[14px] text-booty'>Nombre</p>
                    </div>
                    <div className='w-full border-b border-gray-300 flex items-center py-2 col-span-2'>
                        <input type='text'
                            onChange={(e) => setTitle(e.target.value)}
                            required value={title} placeholder='Ingresa un producto...' className='border-none outline-none placeholder:text-gray-500  text-textColor w-full h-full  bg-transparent ' />
                    </div>
                </div>
                <div className='grid grid-cols-4 gap-4'>
                    <div className='col-span-2'>
                        <div className='col-span-2 mb-2 text-booty'>
                            <p className='font-semibold text-[14px]'>Categoria</p>
                        </div>
                        <select className='w-full outline-none text-base border-b-2 border-gray-200 py-2 rounded-md cursor-pointer' onChange={(e) => setCategory(e.target.value)}>
                            <option defaultValue='other' className='bg-white' >Select Category</option>
                            {
                                categorias && categorias.map(a => (
                                    <option key={a.id} value={a.param} className='text-base border-0 outline-none capitalize bg-white text-headingColor'> {a.name}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className='col-span-2'>
                        <div className='col-span-2 mb-2 text-booty'>
                            <p className='font-semibold text-[14px]'>Precio</p>
                        </div>
                        <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
                            <MdAttachMoney className="text-gray-700 text-2xl" />
                            <input
                                type="text"
                                required
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                placeholder="Price"
                                className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
                            />
                        </div>
                    </div>

                </div>
                <div className='col-span-4'>
                    <div className='col-span-2 mb-2 text-booty'>
                        <p className='font-semibold text-[14px] text-booty'>Oferta</p>
                    </div>
                    <input onChange={(e) => setOferta(e.target.value)} defaultValue={caracteristicas} value={oferta} className='outline-none  border-2 p-2 text-textColor w-full' name="comentarios" />
                </div>
                <div className='col-span-4'>
                    <div className='col-span-2 mb-2 text-booty'>
                        <p className='font-semibold text-[14px] text-booty'>Guia de talles</p>
                    </div>
                    <input onChange={(e) => setCaracteristicas(e.target.value)} defaultValue={caracteristicas} className='outline-none  border-2 p-2 text-textColor w-full' name="comentarios" />
                </div>
                <div className='col-span-4'>
                    <div className='col-span-2 mb-2 text-booty'>
                        <p className='font-semibold text-[14px] text-booty'>Descripcion</p>
                    </div>
                    <textarea onChange={(e) => setDescription(e.target.value)} defaultValue={descripcion} className='outline-none  border-2 p-2 text-textColor w-full h-full' name="comentarios" rows='3' ></textarea>
                </div>

            </div>

            <div className='col-span-2  flex flex-col justify-between'>
                <div className='col-span-2'>
                    <div className='col-span-2 mb-2 flex gap-2 '>
                        {
                            colores
                              ? colores.map((a, index) =>
                                <div key={index} className='p-2 border-black rounded-lg border-2 w-20 items-center'>
                                    <p className='font-semibold text-[14px] text-center'>{a.name}</p>
                                </div>
                              )
                              : console.log('asd')
                        }

                    </div>
                    <div className='col-span-2 mb-2 text-booty'>
                        <p className='font-semibold text-[14px]'>Color</p>
                    </div>
                    <select className='w-full outline-none text-base border-b-2 border-gray-200 py-2 rounded-md cursor-pointer' onChange={(e) => cambio(e)}>
                        <option defaultValue={color} className='bg-white' >Select color</option>
                        {
                            colors && colors.map(a => (
                                <option key={a.id} value={a.urlParamName} className='text-base border-0 outline-none capitalize bg-white text-headingColor'> {a.name}</option>
                            ))
                        }
                    </select>
                </div>

                <div className='col-span-2 mb-2 text-booty'>
                    <p className='font-semibold text-[14px] text-booty'>Imagen del producto</p>
                </div>
                <div className='col-span-2 mb-2 text-booty'>
                    {
                        fields && (
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className={`w-full p-2 rounded-lg text-center text-lg text-semibold ${alertStatus === 'danger' ? 'bg-red-400 text-red-800' : 'bg-emerald-400 text-emerald-800'} `}>{msg}</motion.p>
                        )
                    }                </div>

                {/*   <div>
                    <ReactFirebaseFileUpload/>
                </div> */}
                <div className='grid grid-cols-3 gap-4'>

                    <div className="group flex justify-center items-center flex-col border-2 border-dotted border-gray-300 w-full h-[20vh] md:h-200 cursor-pointer rounded-lg">
                        {isLoading
                          ? (
                            <Loader />
                            )
                          : (
                            <>
                                {!imageAsset
                                  ? (
                                    <>
                                        <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                                            <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                                                <MdCloudUpload className="text-gray-500 text-3xl hover:text-gray-700" />
                                                <p className="text-gray-500 hover:text-gray-700">
                                                    Principal
                                                </p>
                                            </div>
                                            <input
                                                type="file"
                                                multiple
                                                name="uploadimage"
                                                accept="image/*"
                                                onChange={uploadImage}
                                                className="w-0 h-0"
                                            />

                                        </label>
                                    </>
                                    )
                                  : (
                                    <>
                                        <div className="relative h-full">
                                            <img
                                                src={imageAsset}
                                                alt="uploaded"
                                                className="w-full h-full object-contain"
                                            />
                                            <button
                                                type="button"
                                                className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md  duration-500 transition-all ease-in-out"
                                                onClick={deleteImage}
                                            >
                                                <MdDelete className="text-white" />
                                            </button>
                                        </div>
                                    </>
                                    )}
                            </>
                            )}
                    </div>
                    <div className="group flex justify-center items-center flex-col border-2 border-dotted border-gray-300 w-full h-[20vh] md:h-200 cursor-pointer rounded-lg">
                        {isLoading1
                          ? (
                            <Loader />
                            )
                          : (
                            <>
                                {!imageAsset1
                                  ? (
                                    <>
                                        <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                                            <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                                                <MdCloudUpload className="text-gray-500 text-3xl hover:text-gray-700" />
                                                <p className="text-gray-500 hover:text-gray-700">
                                                    Imagen 1
                                                </p>
                                            </div>
                                            <input
                                                type="file"
                                                multiple
                                                name="uploadimage1"
                                                accept="image/*"
                                                onChange={uploadImage1}
                                                className="w-0 h-0"
                                            />
                                        </label>
                                    </>
                                    )
                                  : (
                                    <>
                                        <div className="relative h-full">
                                            <img
                                                src={imageAsset1}
                                                alt="uploaded"
                                                className="w-full h-full object-contain"
                                            />
                                            <button
                                                type="button"
                                                className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md  duration-500 transition-all ease-in-out"
                                                onClick={deleteImage}
                                            >
                                                <MdDelete className="text-white" />
                                            </button>
                                        </div>
                                    </>
                                    )}
                            </>
                            )}
                    </div>
                    <div className="group flex justify-center items-center flex-col border-2 border-dotted border-gray-300 w-full h-[20vh] md:h-200 cursor-pointer rounded-lg">
                        {isLoading2
                          ? (
                            <Loader />
                            )
                          : (
                            <>
                                {!imageAsset2
                                  ? (
                                    <>
                                        <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                                            <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                                                <MdCloudUpload className="text-gray-500 text-3xl hover:text-gray-700" />
                                                <p className="text-gray-500 hover:text-gray-700">
                                                    Imagen 2
                                                </p>
                                            </div>
                                            <input
                                                type="file"
                                                multiple
                                                name="uploadimage"
                                                accept="image/*"
                                                onChange={uploadImage2}
                                                className="w-0 h-0"
                                            />
                                        </label>
                                    </>
                                    )
                                  : (
                                    <>
                                        <div className="relative h-full">
                                            <img
                                                src={imageAsset2}
                                                alt="uploaded"
                                                className="w-full h-full object-contain"
                                            />
                                            <button
                                                type="button"
                                                className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md  duration-500 transition-all ease-in-out"
                                                onClick={deleteImage}
                                            >
                                                <MdDelete className="text-white" />
                                            </button>
                                        </div>
                                    </>
                                    )}
                            </>
                            )}
                    </div>
                </div>
                <div className='grid grid-cols-2 gap-4'>
                    <div className='col-span-2'>
                        <p className='font-semibold text-[14px] text-booty'>Link video</p>
                    </div>
                    <div className='w-full border-b border-gray-300 flex items-center py-2 col-span-2'>
                        <input type='text'
                            onChange={(e) => setVideo(e.target.value)}
                            required value={video} placeholder='Link video' className='border-none outline-none placeholder:text-gray-500  text-textColor  w-full h-full  bg-transparent ' />
                    </div>
                    <div className='w-full border-b border-gray-300 flex items-center py-2 col-span-2'>
                        <input type='text'
                            onChange={(e) => setMiniaturaVideo(e.target.value)}
                            required value={miniaturavideo} placeholder='Link miniatura' className='border-none outline-none placeholder:text-gray-500  text-textColor w-full h-full  bg-transparent' />
                    </div>
                </div>
                <div className='grid grid-cols-4 gap-4'>

                    <div className='col-span-4 '>
                        <div className='col-span-2 mb-2 text-booty'>
                            <p className='font-semibold text-[14px]'>Talles</p>
                        </div>
                        <div className="w-full py-2 border-b border-gray-300 flex justify-between items-center gap-2">
                            <p>S</p>
                            <input
                                type="text"
                                required
                                value={qtyS}
                                onChange={(e) => setS(e.target.value)}
                                placeholder="Qty"
                                className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
                            />
                            <p>M</p>
                            <input
                                type="text"
                                required
                                value={qtyM}
                                onChange={(e) => setM(e.target.value)}
                                placeholder="Qty"
                                className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
                            />
                            <p>L</p>
                            <input
                                type="text"
                                required
                                value={qtyL}
                                onChange={(e) => update(e)}
                                placeholder="Qty"
                                className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
                            />
                        </div>
                    </div>

                </div>
                <div className="flex items-center w-full">
                    <button
                        type="button"
                        className="ml-0 md:ml-auto w-full md:w-auto border-none outline-none bg-emerald-500 px-12 py-2 rounded-lg text-lg text-white font-semibold"
                        /*   onClick={saveDetails} */
                        onClick={push}
                    >
                        Agregar color
                    </button>
                    <button
                        type="button"
                        className="ml-0 md:ml-auto w-full md:w-auto border-none outline-none bg-emerald-500 px-12 py-2 rounded-lg text-lg text-white font-semibold"
                         onClick={saveDetails}
                      /*   onClick={push} */
                    >
                        Guardar producto
                    </button>
                </div>
            </div>

            {/*

                <div className="w-full flex flex-col md:flex-row items-center gap-3">
                    <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
                        <MdFoodBank className="text-gray-700 text-2xl" />
                        <input
                            type="text"
                            required
                            value={calories}
                            onChange={(e) => setCalories(e.target.value)}
                            placeholder="Calories"
                            className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
                        />
                    </div>

                </div>

              */}

        </div>

  )
}

export default CreateContainer
