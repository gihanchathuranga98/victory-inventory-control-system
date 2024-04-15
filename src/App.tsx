import React, {useContext, useEffect, useRef, useState} from 'react';
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
import RawMaterialSubCategory from "./pages/RawMaterialSubCategory";
import BatchCreation from "./pages/Production/BatchCreation";
import FinishProducts from "./pages/Production/FinishProducts";
import ProductCreation from "./pages/Production/ProductCreation";
import IssueItem from "./pages/Production/IssueItem";

function App() {

  const authService = new AuthService();

  const axiosInstance = axios.create({baseURL: 'http://localhost:8000/api/v1'});
  axios.defaults.baseURL = 'http://localhost:8000/api/v1';

  const [api, contextHolder] = notification.useNotification();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const accessTokenRef = useRef<string>();
  const refreshTokenRef = useRef<string>();
  const refreshRef = useRef<number>(0);

  const setLogin = (status: boolean, accessToken?: string, refreshToken?: string) => {

    if(status && refreshToken && accessToken){
      refreshTokenRef.current = refreshToken;
      accessTokenRef.current = accessToken;
      setIsLoggedIn((prev:boolean) => {
        return status;
      })
    }else{
      localStorage.removeItem("accessToken")
      localStorage.removeItem("refreshToken")
    }
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
  }

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem("refreshToken");
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

    if(refreshToken)
      refreshTokenRef.current = refreshToken;

    if(accessToken){
      accessTokenRef.current = accessToken;
      if(accessTokenRef.current){
        authService.verifyAccessToken(accessTokenRef.current)
            .then(data => {
              setLogin(true);
            //   set fname and lname
            })
            .catch(err => {

            })
      }
    }
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


  axios.interceptors.response.use(response => {
    return Promise.resolve(response);
  }, err => {
    const originalRequest = err.config;
    const refreshToken = `${localStorage.getItem('refreshToken')}`;

    if(err.response.status === 403 && refreshToken && refreshRef.current < 3){
      refreshRef.current = refreshRef.current + 1;
      getAccessToken(refreshToken);
      console.log('accessTokenRef', accessTokenRef.current)
      originalRequest.headers['Authorization'] = `Bearer ${accessTokenRef.current}`;
      return axiosInstance(originalRequest);
    }
    return Promise.reject(err)
  })

  const getAccessToken = (refreshToken: string) => {
    authService.refreshToken(refreshToken)
        .then(data => {
          localStorage.setItem('accessToken', data.accessToken);
          accessTokenRef.current = data.accessToken;
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
                      <Route Component={RawMaterialSubCategory} path={'/rm-sub-category'}/>
                      <Route Component={BatchCreation} path={'/batch-creation'}/>
                      <Route Component={FinishProducts} path={'/finish-products'}/>
                      <Route Component={ProductCreation} path={'/product-creation'}/>
                      <Route Component={IssueItem} path={'/issue-items'}/>
                    </Routes>
                  </Nav>
              ):
              (
                  <Routes>
                    <Route Component={Login} path={'*'}/>
                  </Routes>
              )}
        </AuthContext.Provider>
      </AlertContext.Provider>

    </>
  );
}

export default App;
