import React, {useContext, useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {AuthContext} from "./context/AuthContext";
import axios from "axios";
import Login from "./pages/Login";
import Nav from "./components/Nav/Nav";
import SupplierRegistration from "./pages/SupplierRegistration";
import ListOfSuppliers from "./pages/ListOfSuppliers";
import RawMaterials from "./pages/RawMaterials";
import RawMaterialCategories from "./pages/RawMaterialCategories";
import {Route, Routes} from "react-router-dom";
import PurchaseRequestNote from "./pages/PurchaseRequestNote";
import PurchaseOrder from "./pages/PurchaseOrder";
import GoodReceiveNote from "./pages/GoodReceiveNote";
import SupplierReturnNote from "./pages/SupplierReturnNote";

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const setLogin = (status: boolean) => {
    setIsLoggedIn((prev:boolean) => {
      return status;
    })
  }

  axios.defaults.baseURL = 'http://localhost:8000';

  useEffect(() => {
  //   get the authentication details if not logged in
  //   setLogin((prev: {isLoggedIn: boolean, toggleLogin:()=>{}}) => {
  //     const auth = {...prev};
  //     auth.isLoggedIn = false
  //     return auth;
  //   })
  }, []);


  axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')

  axios.interceptors.response.use(response => {
    return response;
  }, error => {
    // if error is 401 - get the refresh token
    Promise.reject(error)
  })


  return (
    <>
      <AuthContext.Provider value={{isLoggedIn, setLogin}}>
        {isLoggedIn ? (
            <Nav>
              <Routes>
                <Route Component={SupplierRegistration} path={'/supplier-registration'}/>
                <Route Component={RawMaterials} path={'/raw-materials'}/>
                <Route Component={RawMaterialCategories} path={'/raw-material-categories'}/>
                <Route Component={ListOfSuppliers} path={'/list-of-suppliers'}/>
                <Route Component={PurchaseRequestNote} path={'/prn'}/>
                <Route Component={PurchaseOrder} path={'/po'}/>
                <Route Component={GoodReceiveNote} path={'/grn'}/>
                <Route Component={SupplierReturnNote} path={'/srn'}/>
              </Routes>
            </Nav>
        ):
            (
                <Routes>
                  <Route Component={Login} path={'/'}/>
                  <Route Component={Login} path={'*'}/>
                </Routes>
            )}
      </AuthContext.Provider>
    </>
  );
}

export default App;
