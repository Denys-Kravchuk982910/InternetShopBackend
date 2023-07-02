import { useDispatch, useSelector } from "react-redux";
import "./styles/style.css";
import { useNavigate } from "react-router-dom";
import useCookie from "react-use-cookie";
import { addToCart } from "../../../../redux/reducers/cartReducer";
import axiosService from "../../../../axios/axiosService";
import { Alert } from "antd";


export const CardWA = ({image, brand, price, title, id}) => {

    const navigate = useNavigate();


    return (<div id="product1" data-id={id} onClick={() => 
    {
        window.scrollTo(0,0);
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
    const [productId, setProductId] = useCookie('pr_id', 0);
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const carts = useSelector(cart => cart.cart);
    const addToCartProduct = async() => {
        let res = await axiosService.getProductById(id);

        dispatch(addToCart({
            id: res.id,
            title: res.title,
            price: res.price,
            description: res.description,
            image: image,
            size: 0
        }));


    }

    const onBuyButtonClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        window.scrollTo(0,0);

        addToCartProduct();
        navigate("/order")
    }

    const onCartButtonClick = (e) => {
        e.preventDefault();
        e.stopPropagation();

        
        addToCartProduct();
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

    return (<>

        <section id="product1" data-id={id} onClick={() => 
    {
       
        
    }} className="section-p1">
            <div className="product-card" onClick={onLinkToProduct}>
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
                    {carts.filter(x => x.id == id).length == 0 ? <>
                        <button className="button-buy" onClick={onBuyButtonClick}>ПРИДБАТИ В 1 КЛІК</button>
                        <button className="button-cart"
                            onClick={onCartButtonClick}>ДОДАТИ В КОШИК</button></>
                        :
                        <>
                            <Alert message="Товар додано у кошик." type="success" />
                        </>}


                </div>
            </div>
        </section>

    </>)
}
export default Card;