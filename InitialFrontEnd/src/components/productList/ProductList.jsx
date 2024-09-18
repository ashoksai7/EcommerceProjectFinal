{/* Using params for dynamic routing */}
import { useParams } from "react-router"
import useFetchData from "../../hooks/useFetchData";
import Loader from "../../loader/Loader";
import Product from "../product/Product";
import URL_CONSTANTS from "../../constants/urlConstants";

const ProductList = ()=>{
    const {categoryName} = useParams(); //way to use params passed for dyanamic routing
    console.log(categoryName);
    //Using open source API in below useFetchData method
    //const {data: prodList,error,isLoading} = useFetchData(`https://fakestoreapi.com/products/category/${categoryName}`,[]);
    //Using our own backend source API in below useFetchData method
    const {data: prodList,error,isLoading} = useFetchData(URL_CONSTANTS.PRODUCT_LIST,[]);
    console.log(prodList);
    //console.log(data);
    return (
        <div className="prodListClass">
            {
                isLoading && <Loader/>
            }
            {
                prodList&&prodList.length?(
                    prodList.map((prod,idx)=>{
                        return <Product prod={prod}/>
                    })
                ):<div>{error}</div>
            }
        </div>
    )
}

export default ProductList;