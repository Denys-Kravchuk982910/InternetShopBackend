import { useNavigate } from 'react-router-dom';
import './styles/btnStyles.css';

const CustomButtonCarousel = ({text}) => {

    const navigate = useNavigate();
    return (<>
    <button className="button-48" onClick={()=> navigate("/catalog")} role="button"><span className="text">{text}</span></button>
    </>);
}

export default CustomButtonCarousel;
