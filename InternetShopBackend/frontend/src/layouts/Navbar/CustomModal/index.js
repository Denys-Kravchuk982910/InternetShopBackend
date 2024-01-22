import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import "./../styles/style.css";
import { Col, Row } from "antd";
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, changeCount } from '../../../redux/reducers/cartReducer';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';

const CustomModal = ({ text, price, image, description, id }) => {
    
    const dispatch = useDispatch();
    const carts = useSelector(carts => carts.cart);
    const onDeleteClick =(e) => {
        dispatch(removeFromCart(id));
    }

    const onPlusNumber = () => {
        let input = carts.filter(x => x.id === id)[0].number;
        if (input < carts.filter(x => x.id === id)[0].count ) {
            dispatch(changeCount({id: id, count: 1}))
        }
    }

    const onMinusNumber = () => {
        let input = parseInt(document.getElementsByClassName("cart-number")[0].value);

        if(input > 1) {
            dispatch(changeCount({id: id, count: -1}))
        }
    }


    return (<>
    <div className='finnaly-product'>
        <Row>
            <Col sm={24}>
                <Row>
                    <Col xs={24} md={4}>
                            <img src={image} className="product-cart" /> 
                    </Col>
                    <Col xs={22} md={{span:16, offset: 1}}>
                        <span className="cart-title">{text}</span><br/><br/>
                        <span className='cart-description'>
                            {description}
                        </span>
                        <br/>
                        <br/>
                        <span className='cart-price'>{price} грн.</span>
                        <br/>
                        <div className="cart-count">
                            <PlusOutlined onClick={onPlusNumber} className='cartPlus' />
                            <input
                             type='text' id={"count" + id} 
                             value={carts.filter(x => x.id === id)[0].number}
                             className='cart-number'
                             readOnly
                             />
                            <MinusOutlined onClick={onMinusNumber} className='cartMinus' />
                        </div>
                    </Col>
                    <Col xs={{span:2}} md={{span: 2, offset: 1}}>
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