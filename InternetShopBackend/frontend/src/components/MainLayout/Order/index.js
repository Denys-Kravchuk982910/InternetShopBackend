import { Formik, Form } from "formik";
import Field from "./Fields/Field";
import PhoneField from "./Fields/PhoneField";
import useCookie from "react-use-cookie";

import { Col, Row } from "antd";
import yupValidation from './Validation/fieldValidation'
import CustomButton from './../Catalog/Filter/customButton'
import './Validation/styles/valid.css';
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
const Order = () => {

    const [visible, setVisible] = useState(true);

    const onSubmitHandler = (values) => {
        console.log(values);
        setVisible(false);
        window.scrollTo(0,0);

    }

    let navigation = useNavigate();

    const [productId, setProductId] = useCookie('pr_id', 0);
    const carts = useSelector(cart => cart.cart);

    const getSum = () => {
        let sum = 0;
        let arr = carts.map(el => {
sum += el.price;
            return el.price
           })

           return sum;

        
    }

    return (<>
        {visible ?
            <>
            <Row>
                    <Col xs={24} md={{span: 12, offset: 6}}>
                        <div className="order-container">
                            <h2>
                                Ваше замовлення
                            </h2>
                            <h2>
                                   Вартість: {getSum()} грн
                            </h2>
                            <Row>
                                <Col sm={{span: 22, offset: 1}}  lg={{span: 18, offset: 3}} xs={{span: 22, offset: 1}}>
                                   {carts.map((element, index) => {
                                    return (
                                        <div className="card-checked" key={"card-checked" + index}>
                                        <Row>
                                            <Col xs={6}>
                                                <div className="card-checked-image">
                                                    <img src={element.image} />
                                                </div>
                                            </Col>
                                            <Col xs={17} offset={1}>
                                                <div className="card-checked-content">
                                                    <div>
                                                        <h4>
                                                            {element.title}
                                                        </h4>
                                                    </div>
                                                    <div>
                                                        <span>
                                                            Ціна: {element.price} грн
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <span>
                                                            Розмір: {element.size == 0 ? <span className="call-size">Уточнювати при дзвінку</span> :
                                                            <>{element.size}</>}
                                                        </span>
                                                    </div>

                                                    <div className="change-size">
                                                        <span onClick={() => {
                                                            setProductId(element.id);
                                                            navigation("/Product");
                                                            window.scrollTo(0,0);
                                                        }}>
                                                           {element.size == 0 ? <>Встановити розмір вручну</> :
                                                            <>Змінити розмір</>}
                                                        </span>
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                    );
                                   })}
                                
                                </Col>
                            </Row>

                            
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col xs={{span: 20, offset: 2}} md={{span: 16, offset: 4}} lg={{span: 16, offset: 4}} xl={{span: 12, offset: 6}}>
                        <div className="order-container">
                            <h2>
                                Підтвердження замовлення
                            </h2>
                            <Formik
                                initialValues={{
                                    name: '',
                                    surname: '',
                                    parentName: '',
                                    phoneNumber: '',
                                    email: '',
                                    post: '',
                                }}
                                validationSchema={yupValidation}
                                onSubmit={onSubmitHandler}
                            >
                                <Form>
                                    <Field id="name" name="name" label="Ім'я" placeholder="Введіть своє ім'я" />
                                    <Field id="surname" name="surname" label="Прізвище" placeholder="Введіть своє прізвище" />
                                    <Field id="parentName" name="parentName" label="По-батькові" placeholder="Як Вас по-батькові" />
                                    <PhoneField id="phoneNumber" name="phoneNumber" label="Номер телефону" placeholder="Введіть номер телефону" />
                                    <Field id="email" name="email" label="Електронна адреса" placeholder="Введіть електронну адресу" />
                                    <Field id="post" name="post" label="Відділення пошти і місто" placeholder="Куди Вам відправити (Нова пошта)?" />
                                    {carts.length > 0 &&
                                    <CustomButton type="submit" text={"Підтвердити замовлення"} />}
                                </Form>
                            </Formik>


                        </div>
                    </Col>
                </Row>
                
            </>
            : <div id="success-payment" className="success-payment">
                    <h2>Оформлення успішне!</h2>
                    <h3>Номер замовлення: 1234234</h3>
                    <Link to="/">На головну</Link>
                </div>}

    </>);
}

export default Order;