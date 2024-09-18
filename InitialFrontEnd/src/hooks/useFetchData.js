import Axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
const useFetchData = (url, initialData) => {
    const [data,setData] = useState(initialData);
    const [error, setError] = useState(null);
    const [isLoading,setIsLoading] = useState(false);
    //console.log("inside");
    const fetchData = async (url) => {

        setIsLoading(true);
        try{
            //console.log("awaiting");
            const res = await Axios.get(url);
            //console.log(res);
            setData(res.data);
            setError(null);
        }catch(error){
            //console.log(error);
            setError(Error);
            setData(null);
        }finally{
            setIsLoading(false);
        }
    }

    useEffect(()=>{
        fetchData(url);
        //console.log("using effect");
    },[url]);

    return {
        data,
        error,
        isLoading
    }
}

export default useFetchData;