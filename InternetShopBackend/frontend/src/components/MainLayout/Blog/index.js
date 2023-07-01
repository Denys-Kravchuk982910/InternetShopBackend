import { Row, Col } from "antd";
import "./styles/blog.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ModalZoomer from "./ModalZoomer";
import StoryZoomer from "./StoryZoomer";

const Blog = () => {
    const [checked, setChecked] = useState({
        isCheck: false,
        img: ""
    });

    const [story, setStory] = useState({
        isCheck: false,
        img: ""
    });

    useEffect(() => {
        let items = document.getElementsByClassName("zoom-after-hover");
        for(let i = 0; i < items.length; i++) {
            items[i].addEventListener("click", onClickPicture);
        }

        let stories = document.getElementsByClassName("story-container");
        for(let i = 0; i < stories.length; i++) {
            stories[i].addEventListener("click", onClickStory);
        }
    }, []);

    const onClickPicture = (e) => {

        let image = e.target.src;
        setChecked({
            img: image,
            isCheck: true
        });
    }

    const onClickStory = (e) => {
        setStory({
            img: ['first1.jpg', 'first2.jpg'],
            isCheck: true
        });
    }

    return (<>
        <Row className="main-row">
            <Col lg={{span: 12, offset: 6}} md={24}>
                <Row>
                    <Col lg={10} md={24}>
                        <div className="logo-container">
                            <div className="image-con" >
                                <img src="Logo.png" />
                            </div>
                        </div>
                    </Col>

                    <Col lg={14} md={24}>
                        <div className="title-of-shop">
                            <span className="title-of-shop-inner">Crosshop.rv</span>
                            <p>
                                <b>CrosShop</b><br />
                                <span className="topic">Одяг (бренд)</span><br />
                                •Новий original магазин у Рівному🔥<br />
                                •Reebok,Puma,Adidas,Jordan,Nike,NewBalance,Timberland<br />
                                •Соборна 14а<br />
                                •Міцкевича 5<br />
                                TikTok⬇️<br />
                                <Link target="_blank" to="https://www.tiktok.com/@crosshop.rv?_t=8c95wOk5JjR&_r=1">
                                    www.tiktok.com/@crosshop.rv?_t=8c95wOk5JjR&_r=1
                                </Link>
                            </p>
                        </div>
                    </Col>
                </Row>
                <Row className="story">
                    <Col xs={6} sm={6} md={6} lg={{span:4, offset: 2}} >
                        <Row>
                            <Col md={24}>
                                <div className="story-container">
                                    <div className="img-con">
                                        <img className="bar-img" src="first1.jpg" />
                                    </div>
                                    <p>Локація</p>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={6} sm={6} md={6} lg={{span:4, offset: 2}} >
                        <Row>
                            <Col md={24}>
                                <div className="story-container">
                                    <div className="img-con">
                                        <img className="bar-img" src="first2.jpg" />
                                    </div>
                                    <p>Відправлення</p>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>


                <Row>
                    <Col xs={24} sm={12} md={12} lg={8}>
                        <div className="image-container-story">
                            <img src="about1.jpg" className="zoom-after-hover"/>
                        </div>
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={8}>
                        <div className="image-container-story">

                            <img src="about2.jpg" className="zoom-after-hover"/>
                        </div>

                    </Col>
                    <Col xs={24} sm={12} md={12} lg={8}>
                        <div className="image-container-story">
                            <img src="about3.jpg" className="zoom-after-hover"/>
                        </div>
                    </Col>


                    <Col xs={24} sm={12} md={12} lg={8}>
                        <div className="image-container-story">

                            <img src="about1.jpg" className="zoom-after-hover"/>
                        </div>
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={8}>
                        <div className="image-container-story">
                            <img src="about2.jpg" className="zoom-after-hover" />
                        </div>

                    </Col>
                    <Col xs={24} sm={12} md={12} lg={8}>
                        <div className="image-container-story">
                            <img src="about3.jpg" className="zoom-after-hover"/>
                        </div>
                    </Col>
                </Row>


            </Col>
            
            {checked.isCheck ? <ModalZoomer setChecked={setChecked} image={checked.img}/> : <></>}
            {story.isCheck ? <StoryZoomer setChecked={setStory} images={story.img}/> : <></>}

        </Row>

    </>);
}

export default Blog;