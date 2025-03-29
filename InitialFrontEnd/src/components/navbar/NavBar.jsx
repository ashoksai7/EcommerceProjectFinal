import { Link, NavLink } from "react-router-dom";
import React, { useState } from 'react';
import Loader from "../../loader/Loader";

import './navBar.css';

const NavBar = ({categories,isLoading,isAuthenticated,toggleAuthentication})=>{
    // State to track if user is logged in or not
    const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated);
    console.log(`Auth status in Nav is ${isAuthenticated}`);
    console.log(`isLoggedIn status in Nav is ${isLoggedIn}`);
    //console.log(categories);
    
    // Function to toggle login status

    const toggleLoggedIn = () =>{
        if(isAuthenticated && isLoggedIn){
            setIsLoggedIn(false);
            toggleAuthentication();
        }
    }
    if(isAuthenticated && !isLoggedIn){
        setIsLoggedIn(true);
        console.log(`Login status is ${isLoggedIn}`);
    }
    
    
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
                        return <li key={idx+2} className="nav-link"><NavLink to={`/products/${cat}`}>{cat}</NavLink></li>
                    })
                ):<></>
            }
            {
                 <li key={1} className="toggle-btn"><NavLink to={`/dashboard`}>Dashboard</NavLink></li>
            }
            <li key={0} onClick = {toggleLoggedIn} className="toggle-btn"><NavLink to={`/login`}>
                {isLoggedIn ? 'Logout' : 'Login'}
            </NavLink></li>
        </ul>
        </nav>
    )
}

export default NavBar;