


import Card, { CardWA } from './Card';
import React, { useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination, Navigation } from "swiper";
import CustomCarousel from './CustomCarousel/CustomCarousel';
import { Row, Col } from 'antd';
import "./styles/main.css";
import Divider from './Divider';
import { getSliderSize } from '../../../services/getSliderSize';
import { useSelector } from 'react-redux';
import { BACKEND_URL } from '../../../constants/default';
import axiosService from '../../../axios/axiosService';


const Main = () => {
    const [swiperRef, setSwiperRef] = useState(null);
    const styleForCards = {
        marginTop: '20px'
    }

    const products = useSelector(state => state.products);
    const [topItems, setTopItems] = useState([]);

    const setTopItem = async () => {
        let item =  await axiosService.getTop();
        setTopItems([...item]);
    }

    useEffect(() => {
        setTopItem();
    }, []);

    const minSize = 24;
    const smSize = 24;
    const mdSize = 12;
    const lgSize = 8;
    const lxSize = 8;
    const lxxSize = 6;


    const sliders = [
        {
            image: 'slide1.jpg',
            text: 'Взуття з Європи: вищий стандарт, якість без компромісів',
            title: 'Title1',
            buttonText: 'Перейти до каталогу'
        },
        {
            image: 'slide2.jpg',
            text: 'Завжди на крок попереду: Вибирайте взуття з Європи для неперевершеної якості',
            title: 'Title2',
            buttonText: 'Перейти до каталогу'
        },
    ]

    return (<>

        <span style={
            {
                width: '100px',
                height: '100px'
            }
        }></span>


        <Row>
            <Col md={24}>
                <CustomCarousel
                    content={sliders}
                />

            </Col>
            <Col md={24}>
                <Divider text={"Популярне"} />
            </Col>

            <Col md={24} >
                <Row style={styleForCards}>
                    
                    {products.map((element, index) => {
                        return (<Col key={index + "col-product"} md={mdSize} sm={smSize} xs={minSize} lg={lgSize} xl={lxSize} xxl={lxxSize}>
                            <Card title={element.title}
                            id={element.id} 
                            brand={element.brand} 
                            image={BACKEND_URL + "images/" + (element.images && element.images[0] ? element.images[0].image : "")} 
                            price={element.price} />
                        </Col>);
                    })}
                </Row>
            </Col>

            <Col md={24}>
                <Divider text={"Новинки"} />
            </Col>

            <Col md={24} className='newSwiper'>
                <Swiper
                    onSwiper={setSwiperRef}
                    slidesPerView={getSliderSize()}
                    centeredSlides={true}
                    spaceBetween={2}
                    pagination={{
                        type: "fraction",
                    }}
                    navigation={true}
                    modules={[Pagination, Navigation]}
                    className="mySwiper"
                >
                    {topItems.map((element, index) => {
                        return (<SwiperSlide key={"swiper" + index}>
                            <CardWA title={element.title} brand={element.brand} image={
                                BACKEND_URL + "images/" + (element.images && element.images[0] ? element.images[0].image : "")
                            } price={element.price} id={element.id}/>
                        </SwiperSlide>);
                    })}
{/*                     
                    <SwiperSlide>
                        <CardWA title={"Alphabounce RC B42652"} brand={"adidas"} image={"product2-slider.png"} price={"1800"}/>
                    </SwiperSlide>
                    <SwiperSlide>
                        <CardWA title={"Air Max 98 – AV4417-001"} brand={"nike"} image={"product3-slider.png"} price={"2300"}/>
                    </SwiperSlide>
                    <SwiperSlide>                        
                        <CardWA title={"Originals Forum"} brand={"adidas"} image={"product4-slider.png"} price={"2100"}/>
                    </SwiperSlide>
                    <SwiperSlide>      
                        <CardWA title={"Gel-Game 8 Gs Clay/Oc 1044A050 White/Lake Drive 960"} brand={"asics"} image={"product5-slider.png"} price={"2200"}/>
                    </SwiperSlide> */}

                </Swiper>
            </Col>
        </Row>

    </>)
}

export default Main;