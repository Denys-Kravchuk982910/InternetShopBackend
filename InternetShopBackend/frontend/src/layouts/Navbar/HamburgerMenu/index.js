import "./hamburger.css";
import {Row, Col} from "antd";
import classNames from "classnames";
import { useContext } from "react";

const HamburgerMenu = ({open, setOpen}) => {

    const onClickUnderlie = (e) => {
        document.body.style.overflow = !open ? 'hidden' : 'auto'; 
        setOpen(!open);
    }

    return (

       <div className="container-text">
        <div className={classNames("hamburger-inner", {"hamburger-inner-click": open})} onClick={onClickUnderlie}>
            <Row>
                <Col md={24}>
                    <div className={classNames("underlie", {"top-item-nav" : open})}></div>
                </Col>
                <Col md={24}>
                    <div className={classNames("underlie", {"second-item-nav" : open})}></div>
                </Col>
                <Col md={24}>
                    <div className={classNames("underlie", {"third-item-nav" : open})}></div>
                </Col>
            </Row>
        </div>
        </div>);
}

export default HamburgerMenu;