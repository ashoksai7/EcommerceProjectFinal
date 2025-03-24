import Axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
const useSendData = (url, initialData, requestBody) => {
    const [data,setData] = useState(initialData);
    const [errorFromHook, setError] = useState(null);
    const [isLoading,setIsLoading] = useState(false);
    console.log("inside SendData");
    const fetchData = async (url) => {

        setIsLoading(true);
        try{
            //console.log("awaiting");
            const res = await Axios.post(url,requestBody);
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
        errorFromHook,
        isLoading
    }
}

export default useSendData;