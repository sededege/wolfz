/* eslint-disable multiline-ternary */
/* eslint-disable import/no-duplicates */
/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import React, { useState } from 'react'
import { getAllUsuarios, saveAddres, saveUser } from '../utils/firebaseFunctions'
import { updateAddres } from '../utils/firebaseFunctions'
import { motion } from 'framer-motion'
import { actionType } from '../context/reducer'
import { useStateValue } from '../context/StateProvider'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth } from '../../firebase.config'

const ShowLogin = () => {
    const [{ user, editShow, users }, dispatch] = useStateValue()
    const [alias, setAlias] = React.useState(null)
    const [dire, setDire] = React.useState(null)
    const [email, setEmail] = React.useState(null)
    const [pass, setPass] = React.useState(null)
    const [pass2, setPass2] = React.useState(null)
    const [puerta, setPuerta] = React.useState(null)
    const [celular, setCelular] = React.useState(null)
    const [nombre, setNombre] = React.useState(null)
    const [apto, setApto] = React.useState(null)
    const [barrio, setBarrio] = React.useState(null)
    const [userexiste, setUserExiste] = React.useState(null)
    const [existeuser, setExisteUsuario] = React.useState(null)
    const [fields, setFields] = useState(false)
    const [alertStatus, setAlertStatus] = useState('false')
    const [msg, setMsg] = useState(null)
    const [tipo, setTipo] = useState(null)
    const [exito, setExito] = useState(false)
    const [registrar, setRegistrar] = useState(false)
    React.useEffect(() => {
        recargar()
    }, [user, users])

    const recargar = () => {
        if (users && user) {
            const existeusuario = users.filter(a => a.user === user.email)
            setExisteUsuario(users.filter(a => a.user === user.email))
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

    const cerrarEdit = () => {
        dispatch({
            type: actionType.SET_LOGIN_SHOW,
            loginShow: false
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
            console.log(existeuser)
            const data = {
                id: existeuser[0].id,
                alias,
                dire,
                puerta,
                apto,
                barrio,
                user: existeuser[0].user
            }
            updateAddres(data)
            clearData()
            fetchUsers()
            recargar()
            setFields(true)
            setMsg('Datos modificados')
            setAlertStatus(false)
            setTimeout(() => {
                setFields(false)
            }, 4000)
        } else {
            console.log('Creo nuevo')
            const data = {
                id: `${Date.now()}`,
                alias,
                dire,
                puerta,
                apto,
                barrio,
                user: user.email
            }
            saveAddres(data)
            setFields(true)
            setMsg('Datos guardados')
            setAlertStatus(false)
            setTimeout(() => {
                setFields(false)
            }, 4000)
            clearData()
            fetchUsers()
            recargar()
        }
        /* if
        (user.email == users.user) {
            const data = {
                id: users.id,
                alias: alias,
                dire: dire,
                puerta: puerta,
                apto: apto,
                barrio: barrio,
                user: user.email,
            }
            updateAddres(data) */
    }

    const loginpassword = async () => {
        console.log(email)
        console.log(pass)

        signInWithEmailAndPassword(auth, email, pass)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user
                setFields(true)
                setMsg('Ingreso exitoso')
                setAlertStatus(true)

                dispatch({
                    type: actionType.SET_USER,
                    user: user.providerData[0]
                })

                localStorage.setItem('user', JSON.stringify(user.providerData[0]))

                setTimeout(() => {
                    setFields(false)
                    fetchUsers()
                    cerrarEdit()
                }, 1000)
            })
            .catch((error) => {
                const errorCode = error.code
                const errorMessage = error.message
                setFields(true)
                if (errorCode === 'auth/missing-email') {
                    setMsg('Escribe un email')
                    setAlertStatus('danger')
                }
                if (errorCode === 'auth/invalid-email') {
                    setMsg('Ingrese un email valido')
                    setAlertStatus('danger')
                }
                if (errorCode === 'auth/internal-error') {
                    setMsg('Ingrese su contraseña')
                    setAlertStatus('danger')
                }
                if (errorCode === 'auth/user-not-found') {
                    setMsg('Usuario no encontrado')
                    setAlertStatus('danger')
                }
                if (errorCode === 'auth/wrong-password') {
                    setMsg('Contraseña incorrecta')
                    setAlertStatus('danger')
                }
                setTimeout(() => {
                    setFields(false)
                }, 3000)
            })
    }

    const register = async () => {
        if (email != null && pass != null && pass2 != null && celular != null && nombre != null) {
            if (pass === pass2) {
                if (celular && celular.length === 9) {
                    createUserWithEmailAndPassword(auth, email, pass)
                        .then((userCredential) => {
                            // Signed in
                            const user = userCredential.user
                            setFields(true)
                            setMsg('Cuenta creada con éxito!')
                            setAlertStatus(true)
                            // ...
                            updateProfile(user, {
                                displayName: nombre
                            })

                            const data = {
                                id: `${Date.now()}`,
                                alias: '',
                                dire: '',
                                puerta: '',
                                apto: '',
                                barrio: '',
                                user: user.email,
                                favoritos: '',
                                cel: celular
                            }
                            console.log(data)
                            saveUser(data)
                            setRegistrar(false)
                        })
                        .catch((error) => {
                            const errorCode = error.code
                            const errorMessage = error.message
                            // ..

                            console.log(errorCode)
                            setFields(true)
                            if (errorCode === 'auth/missing-email') {
                                setMsg('Escribe un email')
                                setAlertStatus('danger')
                            }
                            if (errorCode === 'auth/invalid-email') {
                                setMsg('Ingrese un email valido')
                                setAlertStatus('danger')
                            }
                            if (errorCode === 'auth/email-already-in-use') {
                                setMsg('Email en uso')
                                setAlertStatus('danger')
                            }
                            if (errorCode === 'auth/internal-error') {
                                setMsg('Ingrese su contraseña')
                                setAlertStatus('danger')
                            }
                            if (errorCode === 'auth/user-not-found') {
                                setMsg('Usuario no encontrado')
                                setAlertStatus('danger')
                            }
                            if (errorCode === 'auth/wrong-password') {
                                setMsg('Contraseña incorrecta')
                                setAlertStatus('danger')
                            }
                            if (errorCode === 'auth/weak-password') {
                                setMsg('Contraseña debil')
                                setAlertStatus('danger')
                            }
                            setTimeout(() => {
                                setFields(false)
                            }, 4000)
                        })
                } else {
                    setFields(true)
                    setMsg('Celular incorrecto')
                    setAlertStatus('danger')
                    setTimeout(() => {
                        setFields(false)
                    }, 4000)
                }
            } else {
                setFields(true)
                setMsg('Las contraseñas no coinciden')
                setAlertStatus('danger')
                setTimeout(() => {
                    setFields(false)
                }, 4000)
            }
        } else {
            setFields(true)
            setMsg('Rellene los datos por favor')
            setAlertStatus('danger')
            setTimeout(() => {
                setFields(false)
            }, 4000)
        }
    }

    const variants = {
        open: { opacity: 1, x: 0 },
        closed: { opacity: 0, x: '-100%' }
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className='w-full h-full items-center flex justify-center fixed z-[1000] top-0 bg-black bg-opacity-25 '>

            {
                registrar
                    ? <motion.form
                        key={registrar}
                        animate={registrar ? 'open' : 'closed'}
                        variants={variants}
                        className="w-full fixed z-[99]  max-w-lg p-10 bg-white rounded-lg">
                        <div className="flex  flex-wrap -mx-3 mb-6">
                            {
                                fields && (
                                    <div className='px-3 flex-wrap w-full mb-3'>
                                        <motion.p
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className={`w-ful p-2 rounded-lg text-center text-lg text-semibold ${alertStatus === 'danger' ? 'bg-red-400 text-red-800' : 'bg-emerald-400 text-emerald-800'} `}>{msg}</motion.p>
                                    </div>
                                )
                            }
                            <div className="w-full px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                                    Nombre *
                                </label>
                                <input value={nombre} onChange={(e) => setNombre(e.target.value)} required className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Nombre" />
                            </div>
                            <div className="w-full px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                                    Email *
                                </label>
                                <input value={email} onChange={(e) => setEmail(e.target.value)} required className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Email" />
                            </div>
                            <div className=" w-1/2 px-3 mt-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                                    Contraseña *
                                </label>
                                <input value={pass} onChange={(e) => setPass(e.target.value)} required className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="password" placeholder="Contraseña" />
                            </div>
                            <div className=" w-1/2 px-3 mt-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                                    Repetir Contraseña *
                                </label>
                                <input value={pass2} onChange={(e) => setPass2(e.target.value)} required className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="password" placeholder="Contraseña" />
                            </div>

                        </div>

                        <div className="flex flex-wrap -mx-3 mb-2">
                            <div className="w-full  px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                    Celular *
                                </label>
                                <input value={celular} onChange={(e) => setCelular(e.target.value)} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="number" placeholder="099 123 123" />
                            </div>

                        </div>

                        {
                            exito && (<div className="w-full px-3 mt-3">
                                <p className='bg-green-400 p-2 text-white text-center rounded-lg'>Realizada con éxito</p>
                            </div>
                            )}

                        <div className='justify-between gap-2 flex items-center mt-4'>
                            <button onClick={() => setRegistrar(false)} className="relative  items-center justify-center ml-100  text-sm cursor-pointer text-sky-700 underline py-1 px-2 rounded" type="button">
                                Iniciar sesión
                            </button>
                            <div className='gap-6 flex'>
                                <button onClick={cerrarEdit} className="relative  items-center justify-center ml-100 bg-red-500 hover:bg-red-700 border-red-500 hover:border-red-700 text-sm border-4 text-white py-1 px-2 rounded" type="button">
                                    Cancelar                </button>
                                <button onClick={register} className="relative  items-center justify-center ml-100 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded" type="button">
                                    Registrarse
                                </button>
                            </div>
                        </div>

                    </motion.form> : <motion.form
                        key={registrar}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="w-full fixed z-[99]  max-w-lg p-10 bg-white rounded-lg">
                        <div className="flex  flex-wrap -mx-3 mb-6">

                            <div className="w-full px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                                    Email *
                                </label>
                                <input value={alias} onChange={(e) => setEmail(e.target.value)} required className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Email" />
                            </div>
                            <div className="w-full px-3 mt-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                                    Contraseña *
                                </label>
                                <input value={dire} onChange={(e) => setPass(e.target.value)} required className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="password" placeholder="Contraseña" />
                            </div>
                            {
                                fields && (
                                    <div className='px-3 flex-wrap w-full mt-4'>
                                        <motion.p
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className={`w-ful p-2 rounded-lg text-center text-lg text-semibold ${alertStatus === 'danger' ? 'bg-red-400 text-red-800' : 'bg-emerald-400 text-emerald-800'} `}>{msg}</motion.p>
                                    </div>
                                )
                            }

                        </div>

                        {/* <div className="flex flex-wrap -mx-3 mb-2">
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Nro de puerta *
                        </label>
                        <input value={puerta} onChange={(e) => setPuerta(e.target.value)} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="number" placeholder="4134" />
                    </div>
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                            Apartamento
                        </label>
                        <div className="relative">
                            <input value={apto} onChange={(e) => setApto(e.target.value)} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" placeholder="A910" />

                        </div>
                    </div>
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Barrio
                        </label>
                        <input value={barrio} onChange={(e) => setBarrio(e.target.value)} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip" type="text" placeholder="Pocitos" />
                    </div>

                </div> */}
                        <div className='justify-between gap-2 flex items-center mt-4'>
                            <button onClick={() => setRegistrar(true)} className="relative  items-center justify-center ml-100  text-sm cursor-pointer text-sky-700 underline py-1 px-2 rounded" type="button">
                                Registrate
                            </button>
                            <div className='gap-6 flex'>
                                <button onClick={cerrarEdit} className="relative  items-center justify-center ml-100 bg-red-500 hover:bg-red-700 border-red-500 hover:border-red-700 text-sm border-4 text-white py-1 px-2 rounded" type="button">
                                    Cancelar                </button>
                                <button onClick={loginpassword} className="relative  items-center justify-center ml-100 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded" type="button">
                                    Iniciar sesión
                                </button>
                            </div>
                        </div>

                    </motion.form>
            }

        </motion.div>
    )
}

export default ShowLogin
