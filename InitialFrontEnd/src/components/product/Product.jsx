import './product.css';

const Product = ({prod}) => {
    return(
        <div className='prodDiv'>  
            <img className='prodImage'  src={prod.image}></img>
            <div>{prod.title}</div>    
        </div>
    )
}

export default Product;