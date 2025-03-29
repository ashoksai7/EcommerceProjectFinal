import {
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom';

import React, { useState } from 'react';

import Header from '../components/header/Header';
import Home from '../components/home/Home';
import AboutUs from '../components/aboutUs/AboutUs';
import ErrorPage from '../components/error/ErrorPage';
import Dashboard from '../components/dashboard/Dashboard';
import LoginPage from '../components/login/Login';
import PrivateRoute from '../components/privateRoute/PrivateRoute';
import useFetchData from '../hooks/useFetchData.js';
import ProductList from '../components/productList/ProductList';
import URL_CONSTANTS from "../constants/urlConstants";
const AppRoutes = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    let isAuth = isAuthenticated;
    const toggleAuthentication = ()=>{
        setIsAuthenticated(!isAuthenticated);
        isAuth = isAuthenticated;
        console.log(isAuthenticated);
    }
    //const {data: categories,error,isLoading} = useFetchData('https://fakestoreapi.com/products/categories'); {/* data can be used with alias categories */}
    const {data: categories,error,isLoading} =useFetchData(URL_CONSTANTS.GET_CATEGORIES,[]).data;
    return (
        <Router>
            <Header categories={categories} isLoading={isLoading} isAuthenticated={isAuth} toggleAuthentication={toggleAuthentication}/>
            <Routes>
                {/* Public route*/}
                <Route path='/' element={<Home/>}></Route>
                <Route path='/About-us' element={<AboutUs/>}></Route>
                <Route path='*' element={<ErrorPage/>}></Route>
                <Route path='/login' element={<LoginPage isAuthenticated={isAuth} toggleAuthentication={toggleAuthentication}/>}></Route>

                {/* Private route*/}
                <Route path='/Dashboard' element={<PrivateRoute elemToLoad={<Dashboard/>} isAuthenticated={isAuthenticated}/>}></Route>

                {/* Dynamic routing */}
                <Route path='/products/:categoryName' element={<ProductList/>}></Route>
            </Routes>
        </Router>
    ) 
}
export default AppRoutes;