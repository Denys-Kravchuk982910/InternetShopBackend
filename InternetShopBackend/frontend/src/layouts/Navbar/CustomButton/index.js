
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
                        <Col className="mt-1" xs={24} md={{span:6, offset: 1}}>
                            <button className="finnaly-button" onClick={() => setOpen(false)}>
                                Продовжити покупки
                            </button>
                        </Col>
                        <Col className="mt-1" xs={24} md={{span:6, offset:9}}>
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