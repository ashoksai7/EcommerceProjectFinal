import styleObj from './header.module.css';
import NavBar from '../navbar/NavBar';

const Header = ({categories,isLoading}) => {
    return (
        <div className={styleObj.headerContainer}>
            <NavBar categories={categories} isLoading={isLoading}></NavBar>
        </div>
    )
}

export default Header;