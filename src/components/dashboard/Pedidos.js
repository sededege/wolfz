/* eslint-disable array-callback-return */
/* eslint-disable no-return-assign */
/* eslint-disable react/no-unknown-property */
import React from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { actionType } from '../context/reducer'
import { useStateValue } from '../context/StateProvider'
import {
  borrarorder,
  getAllOrders,
  getAllUsuarios,
  updatePagado
} from '../utils/firebaseFunctions'
import {
  RiMoneyDollarCircleFill,
  RiBarChart2Fill,
  RiInboxUnarchiveFill
} from 'react-icons/ri'
import { useNavigate } from 'react-router'
import { FiEye } from 'react-icons/fi'
import { motion } from 'framer-motion'
import { FaBox } from 'react-icons/fa'

const Pedidos = () => {
  const [{ orders, users }, dispatch] = useStateValue()
  const [expanded, setExpanded] = React.useState(false)
  const history = useNavigate()
  React.useEffect(() => {
    getAllOrders().then((data) => {
      dispatch({
        type: actionType.SET_ORDERS,
        orders: data
      })
    })
    dispatch({
      type: actionType.SET_DONDE_ESTOY,
      dondeestoy: 'Dashboard'
    })
    getAllUsuarios().then((data) => {
      dispatch({
        type: actionType.SET_USERS,
        users: data
      })
    })
  }, [])

  const prueba = (b) => {
    const total = b.reduce(
      (prevValue, currentValue) => prevValue + currentValue.unit_price,
      0
    )

    return total
  }

  const datos = (e) => {
    const datosmostrar = users.filter((a) => a.user === e)
    return (
      <div>
        <ul>
          <li>Alias: {datosmostrar[0].alias}</li>
          <li>Email: {datosmostrar[0].user}</li>
          <li>Celular: {datosmostrar[0].cel}</li>
          <li>Direccion: {datosmostrar[0].dire}</li>
          <li>Puerta: {datosmostrar[0].puerta}</li>
          <li>Barrio: {datosmostrar[0].barrio}</li>
          <li>Apto: {datosmostrar[0].apto}</li>
        </ul>
      </div>
    )
  }

  const pickup = (a) => {
    if (a === 'malvin') {
      return <p>Av. Italia 4240. Apto 1910</p>
    } else if (a === 'trescruces') {
      return <p>Av. Duvimioso Terra 2234</p>
    } else {
      return <p>Envio</p>
    }
  }
  const metodo = (a) => {
    if (a === 'transferencia') {
      return (
        <p>
          Florencia Moraes<br></br>
          Banco ITAU 3614214
        </p>
      )
    } else if (a === 'efectivo') {
      return <p>Efectivo en el lugar</p>
    } else {
      return <p> Mercado Pago</p>
    }
  }
  const colores = (a) => {
    if (a === 'pendiente') {
      return 'bg-yellow-400'
    }
    if (a === 'Pagado') {
      return 'bg-green-400'
    }
    if (a === 'error') {
      return 'bg-red-400'
    }
  }
  const navegar = (a) => {
    history(`/detalle/${a}`)
  }

  const pagado = (e) => {
    const dataa = {
      id: e,
      status: 'Pagado'
    }
    updatePagado(dataa)
    getAllOrders().then((data) => {
      dispatch({
        type: actionType.SET_ORDERS,
        orders: data
      })
    })
  }
  const pendiente = (e) => {
    const dataa = {
      id: e,
      status: 'pendiente'
    }
    updatePagado(dataa)
    getAllOrders().then((data) => {
      dispatch({
        type: actionType.SET_ORDERS,
        orders: data
      })
    })
  }
  const eliminarorder = (e) => {
    borrarorder(e)
    getAllOrders().then((data) => {
      dispatch({
        type: actionType.SET_ORDERS,
        orders: data
      })
    })
  }

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }
  const [mes, setMes] = React.useState(
    new Date().toLocaleDateString().split('/', 2)[1]
  )

  const Listas = (a) => {
    const pormes =
      a.lista &&
      a.lista.filter(
        (a) => new Date(a.creado).toLocaleDateString().split('/', 2)[1] === mes
      )

    return (
      <>
        {orders && pormes !== ''
          ? (
              pormes.map((a, index) => (
            <Accordion
              key={index}
              sx={{
                paddingLeft: 4,
                paddingRight: 4
              }}
              className="justify-between"
              expanded={expanded === a.id}
              onChange={handleChange(a.id)}
            >
              <AccordionSummary
                sx={{
                  padding: 0
                }}
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography className="flex items-center px-4">
                  <span
                    className={`${colores(
                      a.status
                    )} h-4 w-4 rounded-full flex `}
                  ></span>
                </Typography>

                {a.pickup === 'envio' && (
                  <Typography className="flex items-center px-4">
                    <FaBox className=" text-booty " />
                  </Typography>
                )}
                <Typography className="flex px-4 items-center">
                  Total:{' '}
                  <span className="font-normal">
                    {Math.round(prueba(a.items))}
                  </span>
                </Typography>
                <Typography className="px-4">
                  {new Date(a.creado)
                    .toLocaleDateString()
                    .split('/', 2)
                    .join('/')}{' '}
                  {new Date(a.creado)
                    .toLocaleTimeString()
                    .split(':', 2)
                    .join(':')}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div
                  sx={{
                    width: '55%',
                    fontFamily: 'Poppins',
                    fontSize: 'bold'
                  }}
                >
                  <div className="flex flex-col gap-4 ">
                    {a.items.map((b, index) => (
                      <div
                        key={index}
                        className="flex bg-white shadow-md rounded-lg h-full p-4  gap-2 relative "
                      >
                        <div className="flex flex-col">
                          <h1>{b.title}</h1>
                          <p>Talle: {b.size}</p>
                          <p>Color: {b.color}</p>
                        </div>

                        <div className="absolute right-3 items-center flex flex-col gap-1">
                          <FiEye
                            className="text-center font-bold text-[1.2rem] text-booty"
                            onClick={() => navegar(b.id)}
                          />

                          <p>Qty: {b.quantity}</p>
                        </div>
                        <div className="absolute right-3 bottom-3">
                          <p className="font-semibold">${b.unit_price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex   rounded-lg h-full p-4  gap-2 relative ">
                    <div
                      className=" absolute right-3"
                      sx={{
                        width: '55%',
                        fontFamily: 'Poppins',
                        fontSize: 'bold'
                      }}
                    >
                      Total:{' '}
                      <span className="font-bold">{prueba(a.items)}</span>
                    </div>
                  </div>

                  <div className=" p-4 ">{<p> {datos(a.email)}</p>}</div>
                  <div className="flex flex-col md:flex-row gap-4 md:gap-0 items-center justify-center w-full text-center mt-5">
                    <Typography
                      sx={{
                        width: '55%',
                        fontFamily: 'Poppins',
                        fontSize: 'bold',
                        marginTop: '10px'
                      }}
                    >
                      Pick up:{' '}
                      <span className="font-bold text-[14px]">
                        {pickup(a.pickup)}
                      </span>
                    </Typography>
                    <Typography
                      sx={{
                        width: '55%',
                        fontFamily: 'Poppins',
                        fontSize: 'bold'
                      }}
                    >
                      Metodo:{' '}
                      <span className="font-bold text-[14px]">
                        {metodo(a.metodo)}
                      </span>
                    </Typography>
                  </div>
                  <div className="flex gap-4 justify-center p-5">
                    <motion.div whileTap={{ scale: 0.75 }}>
                      <button
                        onClick={() => eliminarorder(a.id)}
                        className="bg-red-500 py-2 px-4 rounded-lg text-white "
                      >
                        Borrar
                      </button>
                    </motion.div>
                    <motion.div whileTap={{ scale: 0.75 }}>
                      {a.status === 'pendiente'
                        ? (
                        <button
                          onClick={() => pagado(a.id)}
                          value={a.id}
                          className="bg-green-300 py-2 px-4 rounded-lg text-white"
                        >
                          Pagado
                        </button>
                          )
                        : (
                        <button
                          onClick={() => pendiente(a.id)}
                          value={a.id}
                          className="bg-yellow-300 py-2 px-4 rounded-lg text-white"
                        >
                          Pendiente
                        </button>
                          )}
                    </motion.div>
                  </div>
                </div>
              </AccordionDetails>
            </Accordion>
              ))
            )
          : (
          <p className="text-gray-400 justify-center w-full text-center font-bold p-2 rounded-lg ">
            No hay pedidos aún!
          </p>
            )}
      </>
    )
  }

  const pormes =
    orders &&
    orders.filter(
      (a) => new Date(a.creado).toLocaleDateString().split('/', 2)[1] === mes
    )
  /*  const ordersfilter = (a) => {
        dispatch({
            type: actionType.SET_ORDERS,
            orders: orders.filter(a => new Date(a.creado).toLocaleDateString().split("/", 2).join('/') === new Date(value).toLocaleDateString().split("/", 2).join('/'))
        })
    } */

  let initialValue = 0
  let initialStock = 0

  const ventas = pormes && pormes.filter(a => a.status === 'Pagado')

  pormes &&
    ventas.map((a) =>
      a.items.map((b) => {
        if (b.unit_price !== 200) {
          initialValue += b.unit_price
        }
      })
    )

  pormes &&
   ventas.map((a) =>
     a.items.map((b) => {
       if (b.unit_price !== 200) {
         initialStock += b.quantity
       }
     })
   )

  console.log(pormes)
  return (
    <div className="pb-20 mt-[10vh] md:ml-[16vw]   md:w-[80vw] rounded-lg py-10  ">
      {/*   <div>
                <Calendar onClick={ordersfilter()} onChange={onChange} value={value} />
            </div> */}
      <div className="flex gap-6 items-center justify-between">
        <div className="rounded-2xl drop-shadow-md h-[20vh] w-full items-center justify-center flex bg-[#937DC2] opacity-80">
          <RiBarChart2Fill className="text-[7rem] opacity-2 text-gray-800" />
          <div className="flex flex-col items-center justify-center">
            <p className="text-[1rem] font-semibold text-gray-800"> Ventas sin envíos</p>
            <p className="text-[2rem] font-semibold text-gray-800">
              $ {initialValue}
            </p>
          </div>
        </div>
        <div className="rounded-2xl drop-shadow-md h-[20vh] w-full items-center justify-center flex gap-8 bg-[#FFABE1] opacity-80">
          <RiMoneyDollarCircleFill className="text-[7rem] opacity-2 text-gray-800" />
          <div className="flex flex-col items-center justify-center">
            <p className="text-[1rem] font-semibold text-gray-800">
              {' '}
              Ganancias
            </p>
            <p className="text-[2rem] font-semibold text-gray-800"> </p>
          </div>
        </div>
        <div className="rounded-2xl drop-shadow-md h-[20vh] w-full items-center justify-center flex bg-[#FFE6F7] opacity-80">
          <RiInboxUnarchiveFill className="text-[7rem] opacity-2 text-gray-800" />
          <div className="flex flex-col items-center justify-center">
            <p className="text-[1rem] font-semibold text-gray-800"> Stock</p>
            <p className="text-[2rem] font-semibold text-gray-800"> - {initialStock}</p>
          </div>
        </div>
      </div>

      <h1 className="text-booty text-center font-bold p-4 ">Pedidos</h1>
      <div className="justify-center flex">
        <select
          value={mes}
          onChange={(e) => setMes(e.target.value)}
          name="month"
          className="w-[500px] flex justify-center bg-gray-200 p-2 rounded-lg mb-10 font-semibold "
        >
          <option value="1">Enero</option>
          <option value="2">Febrero</option>
          <option value="3">Marzo</option>
          <option value="4">Abril</option>
          <option value="5">Mayo</option>
          <option value="6">Junio</option>
          <option value="7">Julio</option>
          <option value="8">Agosto</option>
          <option value="9">Septiembre</option>
          <option value="10">Octubre</option>
          <option value="11">Noviembre</option>
          <option value="12">Diciembre</option>
        </select>
      </div>
      <div className=" flex-col grid md:grid-cols-3 gap-4 ">
        <div className=" flex flex-col text-center gap-4">
          <h1>
            Mercado Pago (
            {pormes && pormes.filter((a) => a.metodo === 'mercadopago').length})
          </h1>
          {orders && (
            <Listas
              lista={pormes && pormes.filter((a) => a.metodo === 'mercadopago')}
            />
          )}
        </div>
        <div className="flex flex-col text-center gap-4">
          <h1>
            Efectivo (
            {pormes && pormes.filter((a) => a.metodo === 'efectivo').length})
          </h1>
          {pormes && (
            <Listas lista={pormes.filter((a) => a.metodo === 'efectivo')} />
          )}
        </div>
        <div className="flex flex-col text-center gap-4">
          <h1>
            Transferencia (
            {pormes &&
              pormes.filter((a) => a.metodo === 'transferencia').length}
            )
          </h1>
          {pormes && (
            <Listas
              lista={
                pormes && pormes.filter((a) => a.metodo === 'transferencia')
              }
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default Pedidos
