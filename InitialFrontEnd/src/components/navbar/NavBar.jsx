import { Link, NavLink } from "react-router-dom";
import Loader from "../../loader/Loader";

import './navBar.css';

const NavBar = ({categories,isLoading})=>{
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
                        return <li key={idx+1}><NavLink to={`/products/${cat}`}>{cat}</NavLink></li>
                    })
                ):<></>
            }
        </ul>
        </nav>
    )
}

export default NavBar;