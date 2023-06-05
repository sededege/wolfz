/* eslint-disable multiline-ternary */
import React, { useState } from 'react'
import { useStateValue } from '.././context/StateProvider'
import { motion } from 'framer-motion'
import { MdDelete, MdCloudUpload, MdAttachMoney } from 'react-icons/md'
import Loader from '../utils/Loader'
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { storage } from '../../firebase.config'
import { actionType } from '.././context/reducer'
import { getAllProductsItems, updateItem } from '.././utils/firebaseFunctions'
import { colors } from '.././utils/data'
import { categorias } from '.././utils/databooty'

const EditItem = () => {
  const [title, setTitle] = useState('')
  const [fields, setFields] = useState(false)
  const [alertStatus, setAlertStatus] = useState('false')
  const [msg, setMsg] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isLoading1, setIsLoading1] = useState(false)
  const [isLoading2, setIsLoading2] = useState(false)
  const [descripcion, setDescription] = useState(null)
  const [caracteristicas, setCaracteristicas] = useState(null)
  const [price, setPrice] = useState('')
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
  const [colorselect, setColorSelect] = useState(null)
  const [{ products, editar }, dispatch] = useStateValue()
  const [oferta, setOferta] = useState(0)

  React.useEffect(() => {
    setTitle(products.filter(a => a.id === editar)[0].name)
    setImageAsset(products.filter(a => a.id === editar)[0].imageURL)
    setPrice(products.filter(a => a.id === editar)[0].precio)
    setCategory(products.filter(a => a.id === editar)[0].categoria)
    setColores(products.filter(a => a.id === editar)[0].color)
    setDescription(products.filter(a => a.id === editar)[0].descripcion)
    setCaracteristicas(products.filter(a => a.id === editar)[0].caracteristicas)
    setColorSelect(products.filter(a => a.id === editar)[0].color[0].name)
    setColor(products.filter(a => a.id === editar)[0].color[0].name)
    setOferta(products.filter(a => a.id === editar)[0].oferta)

    setImageAsset(products.filter(a => a.id === editar)[0].color[0].images[0])
    setImageAsset1(products.filter(a => a.id === editar)[0].color[0].images[1])
    setImageAsset2(products.filter(a => a.id === editar)[0].color[0].images[2])
    setS(products.filter(a => a.id === editar)[0].color[0].tallas[0].stock)
    setM(products.filter(a => a.id === editar)[0].color[0].tallas[1].stock)
    setL(products.filter(a => a.id === editar)[0].color[0].tallas[2].stock)
  }, [editar, products])

  const change = (index) => {
    setColorSelect(colores[index].name)
    setImageAsset(products.filter(a => a.id === editar)[0].color[index].images[0])
    setImageAsset1(products.filter(a => a.id === editar)[0].color[index].images[1])
    setImageAsset2(products.filter(a => a.id === editar)[0].color[index].images[2])
    setS(products.filter(a => a.id === editar)[0].color[index].tallas[0].stock)
    setM(products.filter(a => a.id === editar)[0].color[index].tallas[1].stock)
    setL(products.filter(a => a.id === editar)[0].color[index].tallas[2].stock)
  }

  const borrarcolor = (index) => {
    setColores(colores.filter((item) => item.name !== index))
  }

  const fetchData = async () => {
    await getAllProductsItems().then((data) => {
      /*             console.log(data)
 */ dispatch({
        type: actionType.SET_PRODUCTS,
        products: data
      })
    })
  }

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
  const deleteImage1 = () => {
    setIsLoading1(true)
    const deleteRef = ref(storage, imageAsset1)
    deleteObject(deleteRef).then(() => {
      setImageAsset1(null)
      setIsLoading1(false)
      setFields(true)
      setMsg('Image deleted succesfully!')
      setAlertStatus('Succes')
      setTimeout(() => {
        setFields(false)
      }, 4000)
    })
  }
  const deleteImage2 = () => {
    setIsLoading2(true)
    const deleteRef = ref(storage, imageAsset2)
    deleteObject(deleteRef).then(() => {
      setImageAsset2(null)
      setIsLoading2(false)
      setFields(true)
      setMsg('Image deleted succesfully!')
      setAlertStatus('Succes')
      setTimeout(() => {
        setFields(false)
      }, 4000)
    })
  }

  const newArr = colores.map(obj => {
    if (obj.name === colorselect) {
      return {
        ...obj,
        images: [
          imageAsset,
          imageAsset1,
          imageAsset2
        ],
        tallas: [
          {
            id: 1,
            name: 'S',
            stock: qtyS
          },
          {
            id: 2,
            name: 'M',
            stock: qtyM
          },
          {
            id: 3,
            name: 'L',
            stock: qtyL
          }

        ]

      }
    }

    return obj
  })

  // 👇️ [
  //  {id: 1, name: 'Alfred'}, {id: 1, name: 'Alfred'}, {id: 3, name: 'Charlie}
  // ]

  /*  console.log(newArr); */

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
  /*   console.log(imageAsset) */
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
    setColorSelect(color)
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
            stock: qtyS
          },
          {
            id: 2,
            name: 'M',
            stock: qtyM
          },
          {
            id: 3,
            name: 'L',
            stock: qtyL
          }

        ]

      }])
    } else {
      console.log('ya existe')
    }
  }
  /*  console.log(colores) */

  const dataa = {
    id: editar,
    name: title,
    descripcion,
    caracteristicas,
    precio: price,
    categoria: category,
    color: newArr,
    oferta
  }

  /* console.log(dataa) */
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
      if ((!price || !category || !colores)) {
        setFields(true)
        setMsg('Required fields cant be empty')
        setAlertStatus('danger')
        setTimeout(() => {
          setFields(false)
          setIsLoading(false)
        }, 4000)
      } else {
        console.log(dataa)
        updateItem(dataa)
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
        <div >
            {
                editar != null ? (
                    <div className='gap-4 grid grid-cols-4  h-[90vh] fixed mt-[10vh] ml-[10vw] w-[90vw] px-20 rounded-lg py-10  '>
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
                                        <option defaultValue={category} className='bg-white' >{category}</option>
                                        {
                                            categorias && categorias.map(a => (
                                                <option key={a.id} value={a.urlParamName} className='text-base border-0 outline-none capitalize bg-white text-headingColor'> {a.name}</option>
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
                    <input onChange={(e) => setOferta(e.target.value)} value={oferta} className='outline-none  border-2 p-2 text-textColor w-full' name="comentarios" />
                </div>
                <div className='col-span-4'>
                    <div className='col-span-2 mb-2 text-booty'>
                        <p className='font-semibold text-[14px] text-booty'>Guia de talles (link)</p>
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
                                            <div key={index} onClick={() => change(index)} className={` ${colorselect === a.name ? 'border-blue-200 text-blue-200' : 'border-gray-200 bg-gray-200'} p-2 flex gap-2 rounded-lg border-2 w-20 items-center`}>
                                                <p className='font-semibold text-[14px] text-center'>{a.name}</p>
                                                <MdDelete className='text-red-400 flex items-center justify-center text-lg' onClick={() => borrarcolor(a.name)} />
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
                                                            onClick={deleteImage1}
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
                                                            onClick={deleteImage2}
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

                ) : console.log('no hay que editarar')
            }

        </div>
  )
}

export default EditItem
