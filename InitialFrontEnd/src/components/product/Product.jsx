import './product.css';

const Product = ({prod,idx}) => {
    return(
        <div className='prodDiv' key ={idx}>  
            <img className='prodImage'  src={prod.image}></img>
            <div>{prod.title}</div>    
        </div>
    )
}

export default Product;