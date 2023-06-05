import React, { useCallback, useEffect, useMemo } from "react";
import Header from "./components/navs/Header";
import MainContainer from "./components/home/MainContainer";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useStateValue } from "./components/context/StateProvider";
import {
  getAllProductsItems,
  getAllUsuarios,
} from "./components/utils/firebaseFunctions";
import { actionType } from "./components/context/reducer";
import Headerleft from "./components/navs/Headerleft";
import CartContainer from "./components/cart/CartContainer";
import SetAddres from "./components/cart/setAddres";
import Pre from "./components/utils/Pre";
import ScrollToTop from "./components/utils/scrolltotop";
import ShowLogin from "./components/home/login";
import Rewards from "./components/home/Rewards";
import Stake from "./components/home/Stake";
function App() {
  const [{ dondeestoy, cartShow, editShow, loginShow, user }, dispatch] =
    useStateValue();
  const [load, upadateLoad] = React.useState(false);
  const [login, setLogin] = React.useState(true);

  const fetchData = useCallback(() => {
    getAllProductsItems().then((data) => {
      dispatch({
        type: actionType.SET_PRODUCTS,
        products: data,
      });
    });
  }, []);

  const fetchUsers = useCallback(() => {
    getAllUsuarios().then((data) => {
      dispatch({
        type: actionType.SET_USERS,
        users: data,
      });
      if (user && user != null) {
        dispatch({
          type: actionType.SET_FAVORITE,
          favorite: data.filter((a) => a.user === user.email),
        });
      } else {
        dispatch({
          type: actionType.SET_FAVORITE,
          favorite: "",
        });
      }
    });
  }, []);

  const location = useLocation();

  useEffect(() => {
    setTimeout(() => {
      upadateLoad(false);
    }, 1000);

    fetchData();
    fetchUsers();
  }, [fetchUsers]);

  return (
    <div className="w-screen h-[90vh] bg-tesmo">
      <main className=" ">
        {/*   {
          loginShow && (<ShowLogin />)
        }
        {
          editShow && (<SetAddres />)
        } */}

        <AnimatePresence>{cartShow && <CartContainer />}</AnimatePresence>
        {dondeestoy === "Dashboard" && <Headerleft />}
        <AnimatePresence>
          <Pre load={load} />
        </AnimatePresence>
        {login ? (
          <>
            <Header />
            <Routes location={location} key={location.pathname}>
              <Route path="/*" element={<MainContainer />} />
              <Route path="/Rewards" element={<Rewards />} />
              <Route path="/Stake" element={<Stake />} />
            </Routes>
          </>
        ) : (
          <div className="w-full flex h-[100vh] items-center justify-center ">
            
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
