import { useNavigate } from 'react-router-dom';
import './dropdown.css';
import { useContext } from 'react';

const DropDownMenu = ({setOpen, onCart}) => {
    const navigation = useNavigate();

    const navigateToMenu = () => {
        setOpen(false);
        document.body.style.overflow = 'auto'; 
    }



    return (
    <div className='dropdown-nav'>
        <div className="container-text-expand">
            <span
                onClick={() => {
                    navigateToMenu();
                    navigation("/catalog");
                }}
            >Каталог</span>
        </div>

        <div className="container-text-expand">
            <span
                onClick={() => {  
                    navigateToMenu();
                    navigation("/blog");
                }}
            >Про нас</span>
        </div>

        <div className="container-text-expand">
            <span
                onClick={() => {
                    navigateToMenu();
                    navigation("/feedbacks");
                }}
            >Відгуки</span>
        </div>

        <div className="container-text-expand">
            <span
                onClick={() => {
                    navigateToMenu();
                    onCart(true);
                }}
            >Корзина</span>
        </div>

        <div className="container-text-expand">
            <span
                onClick={() => {
                }}
            >Тех. підтримка</span>
        </div>
    </div>);
}

export default DropDownMenu;