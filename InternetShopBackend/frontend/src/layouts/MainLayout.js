import { Col, Row } from "antd";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import './stylesMainLayout/main.css';
import DropDownMenu from "./Navbar/DropDownMenu";

const MainLayout = () => {
    return (
        <>
            <Row style={{
                margin:'0',
                
            }}>
                <Col md="24">
                    <Navbar />


                    <Outlet />

                    <Footer/>
                </Col>

            </Row>

        </>
    );
}

export default MainLayout;