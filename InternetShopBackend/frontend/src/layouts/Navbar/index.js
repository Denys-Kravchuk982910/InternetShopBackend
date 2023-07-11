import { Col, Row } from "antd";
import "./styles/style.css";
import SearchIcon from '@mui/icons-material/Search';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { Modal } from 'antd';
import React, { useState } from 'react';
import CustomModal from "./CustomModal";
import CustomBuyButton from "./CustomButton";
import { useNavigate } from "react-router-dom";
import HamburgerMenu from "./HamburgerMenu";
import DropDownMenu from "./DropDownMenu";
import { useContext } from "react";
import { useSelector } from "react-redux";

const Navbar = () => {

    let navigation = useNavigate();
    const [hamb, setHamb] = useState(false);
    const [open, setOpen] = useState(false);

    const onFocusItemNav = (e) => {
        let item = e.target.closest(".container-text");
        item.style.color = "#13699e";
        item.style.transition = "color 0.3s ease";
        item.style.cursor = "pointer";
    }

    const onDeFocusItemNav = (e) => {
        let item = e.target.closest(".container-text");
        item.style.color = "#ffffff";
        item.style.transition = "color 0.3s ease";
        item.style.cursor = "default";

    }

    const onMouseOnItem = (e) => {
        const element = e.target;
        element.style.setProperty("--defWidth", (Math.ceil(element.getBoundingClientRect().width) - 10) + "px");
    }

    const onBuyClick = () => {
        setOpen(true)
    }

    const cartItems = useSelector(cart => cart.cart);
    // const [cartItems, setCartItems] = useState([
    //     {
    //         id:1,
    //         title: "Nike air jordan",
    //         price: 2300,
    //         image: "product6.png",
    //         description: "Nike air jordan"
    //     },
    //     {
    //         id:2,
    //         title: "Puma",
    //         price: 2300,
    //         image: "product7.png",
    //         description: "Nike air jordan"
    //     },
    //     {
    //         id: 3,
    //         title: "Adidas",
    //         price: 2300,
    //         image: "product8.png",
    //         description: "Nike air jordan"
    //     },
    // ]);

    return (
            <div className="c-navbar">

                <Row className="nav-row">
                    <Col sm={24}>
                        <Row>
                            <Col md={12} sm={12} xs={12} lg={3} >
                                <img onClick={() => {
                                    document.body.style.overflow = 'auto'; 
                                    setHamb(false);
                                    navigation("/")
                                }} className="c-navbar-image"
                                    src="Logo-nav.png" />
                            </Col>

                            <Col md={12} sm={12} xs={12} lg={21} className="hamburger-menu">
                                <HamburgerMenu open={hamb} setOpen={setHamb} />
                            </Col>

                            <Col lg={3} offset={1} className="nav-element">
                                <div className="container-text">
                                    <span
                                        className="lMenu" onClick={() => {
                                            navigation("/catalog")
                                        }} onMouseEnter={onMouseOnItem}
                                    >Каталог</span>
                                </div>
                            </Col>

                            <Col lg={3} className="nav-element">
                                <div className="container-text">
                                    <span
                                        className="lMenu"
                                        onClick={() => {
                                            navigation("/blog")
                                        }} onMouseEnter={onMouseOnItem}
                                    >Про нас</span>
                                </div>
                            </Col>

                            <Col lg={3} className="nav-element">
                                <div className="container-text">
                                    <span className="lMenu" onClick={() => {
                                        navigation("/feedbacks")
                                    }} onMouseEnter={onMouseOnItem}
                                    >Відгуки</span>
                                </div>
                            </Col>

                            

                            <Col offset={8} lg={1} className="nav-element">
                                <div className="container-text">
                                    <LocalMallOutlinedIcon
                                        onClick={onBuyClick}
                                        onMouseLeave={onDeFocusItemNav}
                                        onMouseEnter={onFocusItemNav}
                                        style={{
                                            fontSize: '30px',
                                            marginTop: '4px'
                                        }} />

                                </div>
                            </Col>

                            <Col lg={1} className="nav-element">
                                <div className="container-text">
                                    <AccountCircleOutlinedIcon
                                        onMouseLeave={onDeFocusItemNav}
                                        onMouseEnter={onFocusItemNav}
                                        style={{
                                            fontSize: '30px',
                                            marginTop: '4px'
                                        }} />

                                </div>
                            </Col>
                        </Row>

                    </Col>
                </Row>

                <Modal
                    title="Кошик"
                    style={{
                        marginTop: '2em',
                        marginBottom: '2em'
                    }}
                    centered
                    open={open}
                    okButtonProps={{ className: "hide" }}
                    cancelButtonProps={{ className: "hide" }}
                    width={1000}
                    onCancel={() => setOpen(false)}
                >
                    <hr className="line-cart" />
                    {cartItems.length > 0 ? cartItems.map((element, index) => {
                        return (        
                        <CustomModal key={"custommodal" + index} 
                        id={element.id}
                        text={element.title} 
                        price={element.price} 
                        image={element.image} 
                        description={"Розмір обраної пари: " + element.size}
                         />
                        )
                    }) : <>
                        <h2 style={{
                            textAlign: 'center'
                        }}>Кошик пустий!</h2>
                    </>}
                    <CustomBuyButton setOpen={setOpen} />
                </Modal>


                {hamb ?
                    <DropDownMenu setOpen={setHamb} onCart={setOpen}/>
                    : <></>}
            </div>
    );
}

export default Navbar;