import styleObj from './header.module.css';
import NavBar from '../navbar/NavBar';

const Header = ({categories,isLoading,isAuthenticated,toggleAuthentication}) => {
    return (
        <div className={styleObj.headerContainer}>
            <NavBar categories={categories} isLoading={isLoading} isAuthenticated={isAuthenticated} toggleAuthentication={toggleAuthentication}></NavBar>
        </div>
    )
}

export default Header;