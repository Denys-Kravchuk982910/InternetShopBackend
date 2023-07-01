import "./styles/style.css"
import { useEffect, useState } from "react";
import { Alert, Col, Row } from "antd"
import { getCookie } from "react-use-cookie";
import axiosService from "../../../axios/axiosService";
import { BACKEND_URL } from "../../../constants/default";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, changeSize } from "../../../redux/reducers/cartReducer";
import { Link, useNavigate } from "react-router-dom";

const Product = () => {

    const pr_id = getCookie("pr_id");
    const [product, setProduct] = useState({});
    const fillProduct = async () => {
        let res = await axiosService.getProductById(pr_id);
        setProduct(res);
        setMainImg(res.images[0].image);
    }

    const carts = useSelector(cart => cart.cart);

    useEffect(() => {
        if(pr_id){

            
            fillProduct();
            
            var MainImg = document.getElementById("MainImg");
            var smallimg = document.getElementsByClassName("small-img");

        for(var i = 0; i < smallimg.length; i++) {
                smallimg[i].addEventListener("click", (e) => {
                    console.log("kkjkj")
                    MainImg.src = smallimg[i].src;
                });
            }
        }

    }, []);

    const [mainImg, setMainImg] = useState("");
    const dispatch = useDispatch();
    const addToCartProduct = async() => {
        let res = await axiosService.getProductById(pr_id);

        
        let sel = document.getElementsByClassName("select")[0];

        dispatch(addToCart({
            id: res.id,
            title: res.title,
            price: res.price,
            description: res.description,
            image: BACKEND_URL + "images/" + res.images[0].image,
            size: sel.value
        }));


    }

    let navigate = useNavigate();

    const onBuyButtonClick = (e) => {
        e.preventDefault();
        e.stopPropagation();

        addToCartProduct();
        navigate("/order")
    }

    const onCartButtonClick = (e) => {
        e.preventDefault();
        e.stopPropagation();

        
        addToCartProduct();
    }

    const onSelectItem = (e) => {
        if(carts.filter(x => x.id == pr_id).length > 0) {
            dispatch(changeSize({
                id: pr_id,
                size: e.target.value
            }))
        }
    }

    return (<>
    {pr_id && 
        <div className="container">
            <Row>
                <Col sm={24}>
                    <Row >
                        <Col xs={24} md={7} lg={7}>

                            <div className="single-pro-image">
                                <div className="image-product-container">
                                    <img src={mainImg && BACKEND_URL + "images/" + mainImg} width={"100%"} id="MainImg" />
                                </div>
                                <div className="small-img-group">
                                    <Row>
                                    
                                    {product.images && product.images.map((element, index) => {
                                        return (
                                        <Col xs={8} key={"smallimage" + index}>
                                            <div  className="small-img-col" onClick={() => {
                                                setMainImg(BACKEND_URL + "images/" + element.image);
                                            }}><img src={
                                                BACKEND_URL + "images/" + element.image
                                            } width={"100%"} className="small-img" /></div>
                                            
                                    
                                        </Col>)
                                    })}
                                    
                                    
                                    
                                    </Row>
                                </div>
                            </div></Col>

                        <Col xs={24} md={{span:13, offset:2}} lg={{span:14, offset:1}}>
                            <div className="single-pro-details">

                                <h4>{product.title}</h4>
                                <h2>{product.price} грн</h2>
                                <h5>Оберіть розмір</h5>
                                <select className="select" onChange={onSelectItem}>
                                    <option value={carts.filter(x => x.id == pr_id).length > 0 &&
                                        carts.filter(x => x.id == pr_id)[0] ? 
                                        <>
                                        {carts.filter(x => x.id == pr_id)[0].size}
                                        </> :0
                                        }>
                                        {carts.filter(x => x.id == pr_id).length > 0 &&
                                        carts.filter(x => x.id == pr_id)[0] ? 
                                        <>
                                        {carts.filter(x => x.id == pr_id)[0].size}
                                        </> :<>Виберіть розмір</>
                                        }
                                    </option>
                                    <option>42</option>
                                    <option>41</option>
                                    <option>40</option>
                                    <option>39</option>
                                    <option>38</option>
                                </select>
                                {carts.filter(x => x.id == pr_id).length != 1 ?<>
                                    <button className="button-cart-product" onClick={onCartButtonClick}>ДОДАТИ В КОШИК</button><br />
                                    <button className="button-buy-product" onClick={onBuyButtonClick}>ПРИДБАТИ В 1 КЛІК</button><br />
                                </> :
                                
                                <>
                                <div className="alert-image">

                                    <Alert message="Товар додано у кошик." type="success" />
                                    <Link to={"/order"}>
                                        Оформити замовлення
                                    </Link>
                                </div>
                                </>}
                                
                                <h4>Інформація про кросівки</h4>
                                <span>{product.description}</span>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
}
    </>)
}
export default Product;