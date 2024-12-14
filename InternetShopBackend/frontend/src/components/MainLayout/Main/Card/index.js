/* eslint-disable no-unused-vars */
import { useDispatch, useSelector } from "react-redux";
import "./styles/style.css";
import { useNavigate } from "react-router-dom";
import useCookie from "react-use-cookie";
import { addToCart } from "../../../../redux/reducers/cartReducer";
import axiosService from "../../../../axios/axiosService";
import { Alert } from "antd";
import { useEffect, useState } from "react";
import classNames from "classnames";
import productSizes from '../../../../data/sizes.json'; 


export const CardWA = ({ image, brand, price, title, id }) => {

    const navigate = useNavigate();
    const [productId, setProductId] = useCookie('pr_id', 0);

    return (<div id="product1" data-id={id} onClick={() => {
        window.scrollTo(0, 0);
        setProductId(id);
        navigate("/product")

    }}>
        <div className="pro">
            <img src={image} alt="" />
            <div className="des">
                <span className="adidas">{brand}</span>
                <h5 className="Nike-Air-Jordan-4">{title}</h5>
                <h4 className="price">{price} <span className="price-title">грн</span></h4>
            </div>
        </div>
    </div>);
}


const Card = ({ image, brand, price, title, id, description, count }) => {
    const [settings, setSettings] = useState({
        isFlag: false,
        isAdded: false
    });
    const navigate = useNavigate();
    const [productId, setProductId] = useCookie('pr_id', 0);
    // const [sizes, setArrSizes] = useState([]);
    const [isBuy, setBuy] = useState(false);
    const carts = useSelector(cart => cart.cart);

    const dispatch = useDispatch();

    const addToCartProduct = async (size) => {
        //let res = await axiosService.getProductById(id);

        dispatch(addToCart({
            id: id,
            title: title,
            price: price,
            description: description,
            image: image,
            count: count,
            size: parseInt(productSizes[size - 1].size)
        }));

        setSettings({
            ...settings,
            isFlag: !settings.isFlag,
            isAdded: true
        });
        if (isBuy) {
            window.scrollTo(0, 0);

            navigate("/order")
        }
    }

    const onBuyButtonClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        fillSizes();
        setSettings({
            ...settings,
            isFlag: !settings.isFlag
        });
        setBuy(true);
    }

    const onCartButtonClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        fillSizes();

        setSettings({
            ...settings,
            isFlag: !settings.isFlag
        });

        setBuy(false);
    }

    const onLinkToProduct = (e) => {
        let item = e.target.closest(".section-p1");
        let id = item.dataset.id;
        let par = e.target.closest(".product-card");
        if (par.offsetHeight === 450) {

            setProductId(id);
            window.scrollTo(0, 0);
            navigate("/product")
        }
    }

    const fillSizes = async () => {
        // let data = await axiosService.getSizes(id);
        
        // for (const item of carts) {
        //     data = data.filter(x => parseInt(x.size) !== item.size);
        // }

        // setArrSizes(productSizes);
    }

    const onSelectItem = (e) => {
        let value = e.target.value;
        addToCartProduct(value);

        let select = document.getElementsByClassName("select")[0];
        select.value = 0;
    }

    const onSelectClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
    }

    const onMouseHandler = (e) => {
        if (settings.isFlag) {
            setSettings({
                ...settings,
                isFlag: !settings.isFlag,
                isAdded: false
            });
            return;
        }
        setSettings({
            ...settings,
            isAdded: false
        });
    }

    return (<>
        <section id="#product1" data-id={id} className="section-p1" onMouseLeave={() => {setSettings(
            {
                ...settings, 
                isAdded: false
            }
        )}}>

            <div className={classNames("product-card")}
                onMouseLeave={onMouseHandler}
                onClick={onLinkToProduct}>
                <div className="image-container">
                    <img src={image} alt="Product"/>
                </div>
                
                <div className="product-details">
                    <div className="des">
                        <span className="adidas">{brand}</span>
                        <h5 className="Nike-Air-Jordan-4">{title}</h5>

                        <p className="price">{price} <span className="price-title">грн</span></p>
                    </div>
                </div>

                <div>
                    <div className={classNames({ "d-none": settings.isFlag })}>
                        <button className="button-buy"
                            onClick={onBuyButtonClick}>ПРИДБАТИ В 1 КЛІК</button>
                        <button className="button-cart"
                            onClick={onCartButtonClick}>ДОДАТИ В КОШИК</button>
                    </div>

                    <div className={classNames({ "d-none": !settings.isAdded})}>
                        <Alert message="Товар додано у кошик." type="success" />
                    </div>

                    <select
                        style={{
                            marginTop: '10px',
                            fontSize: '1.5em'
                        }}
                        className={classNames("select", { "d-none": !settings.isFlag })} onClick={onSelectClick} onChange={onSelectItem}>
                        <option value={0}>Виберіть розмір</option>
                        {productSizes.map((element, index) => {
                            return (
                                <option value={index + 1} key={"sizeCard" + (index + 1)}>{element.size}</option>
                            )
                        })}
                    </select>
                </div>
            </div>
        </section>

    </>)
}
export default Card;