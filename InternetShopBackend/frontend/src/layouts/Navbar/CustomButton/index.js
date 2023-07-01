
import { useNavigate } from "react-router-dom"
import "./../styles/style.css"
import { Col, Row } from "antd"


const CustomBuyButton = ({setOpen}) => {

    const navigate = useNavigate();

    return (<>
        <div className='finnaly-button-div'>
            <Row>
                <Col sm={24}>
                    <Row>
                        <Col offset={1} md={6}>
                            <button className="finnaly-button" onClick={() => setOpen(false)}>
                                Продовжити покупки
                            </button>
                        </Col>
                        <Col offset={9} md={6}>
                            <button className="finnaly-button" onClick={() => {
                                setOpen(false);
                                navigate("/order");
                            }}>
                                Оформити замовлення
                                </button>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    </>)
}
export default CustomBuyButton;