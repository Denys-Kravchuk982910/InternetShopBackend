import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import "./../styles/style.css"
import { Col, Row } from "antd"
import RemoveIcon from '@mui/icons-material/Remove';

import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart } from '../../../redux/reducers/cartReducer';

const CustomModal = ({ text, price, image, description, id }) => {
    
    const dispatch = useDispatch();
    const onDeleteClick =(e) => {
        dispatch(removeFromCart(id));
    }


    return (<>
    <div className='finnaly-product'>
        <Row>
            <Col sm={24}>
                <Row>
                    <Col md={4}>
                        
                            <img src={image} className="product-cart" />
                        
                    </Col>
                    <Col md={10} offset={1}>
                        <span className="cart-title">{text}</span><br/><br/>
                        <span className='cart-description'>
                            {description}
                        </span>
                        <br/>
                        <span className='cart-price'>{price} грн.</span>
                    </Col>
                    <Col md={2} offset={7}>
                        <span onClick={onDeleteClick}>
                            <DeleteOutlineIcon className='icon-bin' fontSize='large'/>
                        </span>
                    </Col>
                </Row>
            </Col>
        </Row>
        
</div>
    </>)
}
export default CustomModal;