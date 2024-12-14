/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { Row, Col } from "antd";
import "./styles/blog.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ModalZoomer from "./ModalZoomer";
import StoryZoomer from "./StoryZoomer";
import axiosService from "../../../axios/axiosService";
import { BACKEND_URL } from "../../../constants/default";

const Blog = () => {
    const [checked, setChecked] = useState({
        isCheck: false,
        img: ""
    });

    const [story, setStory] = useState({
        isCheck: false,
        img: ""
    });

    const [stories, setStories] = useState([
        {
            title: 'Локація',
            images: [{image: 'first1.jpg'}, {image: 'about1.jpg'}, {image: 'about2.jpg'}],
        },
        {
            title: 'Доставка',
            images: [{image: 'first2.jpg'}, {image: 'about2.jpg'}, {image: 'about3.jpg'}],
        },
    ]);
    const [posts, setPosts] = useState([
        {
            image: 'about1.jpg'
        },
        {
            image: 'about2.jpg'
        },
        {
            image: 'about3.jpg'
        },
    ]);

    const serverLink = "/"; // BACKEND_URL + "images/";

    // const onLoadStories = async () => {
    //     let res = await axiosService.getStories();
    //     setStories(res);

    //     let postData = await axiosService.getPosts();
    //     setPosts(postData);
    // }


    // useEffect(() => {
    //     onLoadStories();
    // }, []);

    useEffect(() => {
        let stories = document.getElementsByClassName("story-container");
        for(let i = 0; i < stories.length; i++) {
            stories[i].addEventListener("click", onClickStory);
        }
    }, [stories]);

    useEffect(() => {
        let items = document.getElementsByClassName("zoom-after-hover");
        for(let i = 0; i < items.length; i++) {
            items[i].addEventListener("click", onClickPicture);
        }
    }, [posts]);


    const onClickPicture = (e) => {

        let image = e.target.src;
        setChecked({
            img: image,
            isCheck: true
        });
    }

    const onClickStory = (e) => {
        let target = e.target.closest(".story-container").dataset.id;
        
        let items = stories[target].images.map((element) => {
            return serverLink + element.image
        });

        setStory({
            img: [...items],
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
                                <img src="Logo.png" alt="" />
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
                                •Reebok, Puma, Adidas, Jordan, Nike, NewBalance, Timberland<br />
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
                    {stories && stories.map((element, index) => {
                        return (<Col xs={6} sm={6} md={6} lg={{span:4, offset: 2}} key={"story"+index}>
                            <Row>
                                <Col md={24}>
                                    <div className="story-container" data-id={index}>
                                        <div className="img-con">
                                            <img
                                                className="bar-img"
                                                src={serverLink + (element.images[0] ? element.images[0].image : <></>) }
                                                alt=""
                                            />
                                        </div>
                                        <p>{element.title}</p>
                                    </div>
                                </Col>
                            </Row>
                        </Col>)
                    })}
                </Row>


                <Row>
                    {posts && posts.map((element, index) => {
                        return (<Col xs={24} sm={12} md={12} lg={8} key={"post" + index}>
                            <div className="image-container-story">
                                <img src={serverLink + element.image} className="zoom-after-hover" alt=""/>
                            </div>
                        </Col>);
                    })}
                </Row>


            </Col>
            
            {checked.isCheck ? <ModalZoomer setChecked={setChecked} image={checked.img}/> : <></>}
            {story.isCheck ? <StoryZoomer setChecked={setStory} images={story.img}/> : <></>}

        </Row>

    </>);
}

export default Blog;