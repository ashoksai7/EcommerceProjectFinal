import { Navigate } from "react-router";
import Dashboard from "../dashboard/Dashboard";
import { useEffect } from "react";

const PrivateRoute = ({elemToLoad,isAuthenticated}) =>{
    useEffect(()=>{
        if(!isAuthenticated)
            alert("Please login first");
    });
    return (  
            isAuthenticated?elemToLoad:<Navigate to='/login'/>
    )   
}

export default PrivateRoute;