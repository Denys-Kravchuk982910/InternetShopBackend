import { useDispatch, useSelector } from "react-redux";
import "./styles/style.css";
import { useNavigate } from "react-router-dom";
import useCookie from "react-use-cookie";
import { addToCart } from "../../../../redux/reducers/cartReducer";
import axiosService from "../../../../axios/axiosService";
import { Alert } from "antd";
import { useEffect, useState } from "react";
import classNames from "classnames";


export const CardWA = ({image, brand, price, title, id}) => {

    const navigate = useNavigate();
    const [productId, setProductId] = useCookie('pr_id', 0);

    return (<div id="product1" data-id={id} onClick={() => 
    {
        window.scrollTo(0,0);
        setProductId(id);
        navigate("/product")
        
    }}>
        <div className="pro">
            <img src={image} />
            <div className="des">
                <span className="adidas">{brand}</span>
                <h5 className="Nike-Air-Jordan-4">{title}</h5>
                <h4 className="price">{price} <span className="price-title">грн</span></h4>
            </div>
        </div>
    </div>);
}


const Card = ({image, brand, price, title, id}) => {
    const navigate = useNavigate();
    const [productId, setProductId] = useCookie('pr_id', 0);
    const [sizes, setArrSizes] = useState([]);
    const [isFlag, setFlag] = useState(false);
    const [isBuy, setBuy] = useState(false);

    const dispatch = useDispatch();
    const carts = useSelector(cart => cart.cart);

    const addToCartProduct = async(size) => {
        let res = await axiosService.getProductById(id);
        dispatch(addToCart({
            id: res.id,
            title: res.title,
            price: res.price,
            description: res.description,
            image: image,
            size: parseInt(sizes[size-1].size)
        }));

        setFlag(!isFlag);
        if(isBuy) {
            navigate("/order")
        }
    }

    const onBuyButtonClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        fillSizes();
        setFlag(!isFlag);
        setBuy(true);
    }

    const onCartButtonClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        fillSizes();
        setFlag(!isFlag);
        setBuy(false);
    }

    const onLinkToProduct = (e) => {
        let item = e.target.closest(".section-p1");
        let id = item.dataset.id;
        let par = e.target.closest(".product-card");
        if(par.offsetHeight == 450) {

            setProductId(id);
            window.scrollTo(0,0);
            navigate("/product")
        }
    }


    const fillSizes = async () => {
        let data = await axiosService.getSizes(id);
        setArrSizes(data);
    }

    const onSelectItem = (e) => {
        let value = e.target.value;
        addToCartProduct(value);
        setBtnOpen(false);
    }

    const onSelectClick =(e) => {
        e.preventDefault();
        e.stopPropagation();
    }

    const onMouseHandler = (e) => {
        if(!btnOpen) {

            if(isFlag) {
                setFlag(false);
            }
            setOpen(false);
        }
    }

    const [open, setOpen] = useState(false);
    const [btnOpen, setBtnOpen] = useState(false);

    return (<>

        <section id="product1" data-id={id}  onClick={() => 
    {
       
        
    }} className="section-p1">
            <div className={classNames("product-card", {"product-card-hover" : open})}
            onMouseEnter={() => {setOpen(true)}}
            onMouseLeave={onMouseHandler} onClick={onLinkToProduct}>
                <div className="image-container">
                    <img src={image} alt="Product Image" />
                </div>
                <div className="product-details">
                    <div className="des">
                        <span className="adidas">{brand}</span>
                        <h5 className="Nike-Air-Jordan-4">{title}</h5>

                        <p className="price">{price} <span className="price-title">грн</span></p>
                    </div>
                </div>
                <div>
                    {!isFlag && (carts.filter(x => x.id == id).length == 0 ? <>
                        <button className="button-buy" 
                            onClick={onBuyButtonClick}>ПРИДБАТИ В 1 КЛІК</button>
                        <button className="button-cart"
                            onClick={onCartButtonClick}>ДОДАТИ В КОШИК</button></>
                        :
                        <>
                            <Alert message="Товар додано у кошик." type="success" />
                        </>)}

                    { isFlag &&
                        <select
                            onMouseDown={() => {
                                setBtnOpen(true);
                            }}
                            style={{
                                marginTop: '10px',
                                fontSize: '1.5em'
                            }}
                            className="select" onClick={onSelectClick} onChange={onSelectItem}>
                            <option value={0}>Виберіть розмір</option>
                            {sizes.map((element, index) => {
                                return (
                                    <option value={index + 1} key={"sizeCard" + (index + 1)}>{element.size}</option>
                                )
                            })}
                        </select> 
                    }
                </div>
            </div>
        </section>

    </>)
}
export default Card;