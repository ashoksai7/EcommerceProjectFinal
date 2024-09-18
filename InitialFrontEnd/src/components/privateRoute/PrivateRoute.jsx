import { Navigate } from "react-router";
import Dashboard from "../dashboard/Dashboard";

const PrivateRoute = ({elemToLoad,isAuthenticated}) =>{
    console.log(elemToLoad);
    return (  
            isAuthenticated?elemToLoad:<Navigate to='/login'/>
    )   
}

export default PrivateRoute;