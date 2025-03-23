import { Link, NavLink } from "react-router-dom";
import React, { useState } from 'react';
import Loader from "../../loader/Loader";

import './navBar.css';

const NavBar = ({categories,isLoading,isAuthenticated})=>{
    // State to track if user is logged in or not
    const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated);
    //console.log(categories);
    // Function to toggle login status
    const toggleLogin = () => {
        setIsLoggedIn(!isLoggedIn);
    };
    return (
        <nav className='nav'>
        <ul className='nav-items'>
            {/*<li>
                <NavLink to='/'>Home</NavLink>
            </li>
            <li>
                <NavLink to='/About-us'>About us</NavLink>
            </li>
            <li>
                <NavLink to='/Dashboard'>Dashboard</NavLink>
            </li>
            <li>
                <NavLink to='/Contat-us'>Contact-us</NavLink>
            </li>
            */}
            {isLoading && <Loader/>}
            {
                categories&&categories.length?(
                    categories.map((cat,idx)=>{
                        return <li key={idx+1} className="nav-link"><NavLink to={`/products/${cat}`}>{cat}</NavLink></li>
                    })
                ):<></>
            }
            <li key={0} onClick={toggleLogin} className="toggle-btn"><NavLink to={`/login`}>
                {isLoggedIn ? 'Logout' : 'Login'}
            </NavLink></li>
        </ul>
        </nav>
    )
}

export default NavBar;