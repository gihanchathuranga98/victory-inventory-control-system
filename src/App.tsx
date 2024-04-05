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
import AuthService from "./services/Auth.service";
import {notification} from "antd";
import {AlertContext} from "./context/AlertContext";
import Dashboard from "./pages/Dashboard";
import SupplierUpdate from "./pages/SupplierUpdate";

function App() {

  const [api, contextHolder] = notification.useNotification();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const setLogin = (status: boolean) => {
    setIsLoggedIn((prev:boolean) => {
      return status;
    })
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`;
  }

  const authService = new AuthService();

  axios.defaults.baseURL = 'http://localhost:8000/api/v1';

  useEffect(() => {
  //   get the authentication details if not logged in
  //   setLogin((prev: {isLoggedIn: boolean, toggleLogin:()=>{}}) => {
  //     const auth = {...prev};
  //     auth.isLoggedIn = false
  //     return auth;
  //   })
  }, []);

  const success = (title: string, msg: string) => {
    api['success']({
      message: `${title}..!`,
      description: `${msg}.`,
    });
  }

  const error = (title: string, msg: string) => {
    api['error']({
      message: `${title}..!`,
      description: `${msg}.`,
    });
  }

  const info = (title: string, msg: string) => {
    api['info']({
      message: `${title}..!`,
      description: `${msg}.`,
    });
  }

  const warning = (title: string, msg: string) => {
    api['warning']({
      message: `${title}..!`,
      description: `${msg}.`,
    });
  }

  const axiosInstance = axios.create({baseURL: 'http://localhost:8000/api/v1'});

  axios.interceptors.response.use(response => {
    return Promise.resolve(response);
  }, err => {
    console.log('came to response error', err.config)
    const originalRequest = err.config;
    const refreshToken = localStorage.getItem('refreshToken')
    if(err.response.status === 403 && refreshToken){
      getRefreshToken(refreshToken)
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`
      return axiosInstance(originalRequest);
    }
    return Promise.reject(err)
  })

  const getRefreshToken = (refreshToken: string) => {
    authService.refreshToken(refreshToken)
        .then(data => {
          localStorage.setItem('accessToken', data.accessToken);
          axios.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`;
          axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`;
        })
        .catch(err => {
          //logout
        })
  }


  return (
    <>
      <AlertContext.Provider value={{success, info, warning, error}}>
        {contextHolder}
        <AuthContext.Provider value={{isLoggedIn, setLogin}}>
          {isLoggedIn ? (
                  <Nav>
                    <Routes>
                      <Route Component={Dashboard} path={'/'} />
                      <Route Component={SupplierRegistration} path={'/supplier-registration'}/>
                      <Route Component={RawMaterials} path={'/raw-materials'}/>
                      <Route Component={RawMaterialCategories} path={'/raw-material-categories'}/>
                      <Route Component={ListOfSuppliers} path={'/list-of-suppliers'}/>
                      <Route Component={PurchaseRequestNote} path={'/prn'}/>
                      <Route Component={PurchaseOrder} path={'/po'}/>
                      <Route Component={GoodReceiveNote} path={'/grn'}/>
                      <Route Component={SupplierReturnNote} path={'/srn'}/>
                      <Route Component={SupplierUpdate} path={'/supplier-update/:id'}/>
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
      </AlertContext.Provider>

    </>
  );
}

export default App;
