import { UserOutlined } from '@ant-design/icons';
import { Input, Row, Col } from 'antd';
import "./style/feedback.css";
import { useEffect, useState } from 'react';
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';
import { GoogleLogin, googleLogout  } from '@react-oauth/google';
import jwtDecode from 'jwt-decode';
import { useDispatch, useSelector } from 'react-redux';
import { addFeedback, setFeedback, updateFeedback } from '../../../redux/reducers/feedbackReducer';
import axiosService from '../../../axios/axiosService';

const Feedback = () => {
    const [text, setText] = useState("");
    const dispatch = useDispatch();
    const feedbacks = useSelector(feedback => feedback.feedback)

    const fillFeedbacks = async () => {
        //let res = await axiosService.getFeedback();
        dispatch(setFeedback([]));
    }
    useEffect(() => {
        fillFeedbacks();
    }, []);

    const responseGoogleSuccess = async (e) => {
        let obj = await axiosService.getUserInfo(e.access_token);

        
        let image = obj.picture;
        let name = obj.name;
        let message = text;
        let email = obj.email;
        
        // let isExist = await axiosService.isFeedback(email);

        
        let currentDate = new Date();
        let hours = currentDate.getHours();
        let minutes = currentDate.getMinutes();

        let minutesStr = minutes.toString().length > 1 ? "" : " ";

        let time = `${hours}:${minutesStr}${minutes}`;

        let feedbackObject = {
            image: image,
            name: name,
            message: message,
            time: time,
            email: email
        }

        // if(isExist) {
        //     // let res = await axiosService.updateFeedback(feedbackObject);
        //     dispatch(updateFeedback(feedbackObject));
        // } else {

        //     // let res = await axiosService.addFeedback(feedbackObject);
        //     dispatch(addFeedback(feedbackObject));
        // }

        dispatch(addFeedback(feedbackObject));

        googleLogout();
        setText("")
    }  

    const responseGoogleFail = (e) => {

    }

    const login = useGoogleLogin({
        onSuccess: codeResponse => responseGoogleSuccess(codeResponse),
      });
    

    return (<>
        <div className="shreddit-comment-head">
            <Row>
                <Col xs={3} sm={2} md={3} lg={2} className='title-feed'>
                    <span className="comment-author-avatar">
                        <div className="avatar-container">
                            <span className="avatar">
                                <span className="avatar-inner">
                                    <svg className="avatar-image" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 121 122">
                                        <defs>
                                            <clipPath id="mask">
                                                <path d="M0 0V79L28.1628 105.5C35.013 115.465 46.4934 122 59.5 122C72.5066 122 83.987 115.465 90.8372 105.5L120.5 79V0H0Z"></path>
                                            </clipPath>
                                        </defs>
                                        <image href="Logo.png" alt="User Avatar" clipPath="url(#mask)" height="100%" width="100%"></image>
                                    </svg>
                                </span>
                            </span>
                        </div>
                    </span>

                </Col>
                <Col xs={21} sm={22} md={21} lg={22} className='title-feed'>
                    <span className="comment-author font-bold">CrosShop</span>
                </Col>
            </Row>

            <div className="comment-content-head">
                <p>Які у вас враження від нашого магазину?<br />Поділіться з нами!</p>
            </div>

            <Input value={text} onChange={(e) => {
                setText(e.target.value);
            }} size="large" onKeyDown={(e) => {
                if (e.key === "Enter") {
                    if(text.length > 0) {
                        login();
                    }
                }
            }} placeholder="Ваш коментар... (Після введення тисніть Enter)" prefix={<UserOutlined />} />

        </div>

        <Row className='row-comments'>

            {feedbacks && feedbacks.map((element, key) => {
                return (<Col key={"feedback" + key} lg={8} md={12} sm={12} xs={24}>
                    <div className="shreddit-comment">
                        <Row>
                            <Col xs={3} xl={2} lg={3} className='title-feed'>
                                <span className="comment-author-avatar">
                                    <div className="avatar-container">
                                        <span className="avatar">
                                            <span className="avatar-inner">
                                                <svg className="avatar-image" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 121 122">
                                                    <image href={element.image} alt="User Avatar" height="100%" width="100%"></image>
                                                </svg>
                                            </span>
                                        </span>
                                    </div>
                                </span>
    
                            </Col>
                            <Col xs={3} xl={22} lg={21} className='title-feed'>
                                <div>
                                    <span className="comment-author font-bold">{element.name}</span><br />
                                    <span className="comment-time">{element.time}</span>
                                </div>
                            </Col>
                        </Row>
    
                        <div className="comment-content">
                            <p>{element.message}</p>
                        </div>
                    </div>
                </Col>);
            })}

            {/* <Col lg={8} md={12} sm={12} xs={24}>
                <div className="shreddit-comment">
                    <Row>
                        <Col xs={3} xl={2} lg={3} className='title-feed'>
                            <span className="comment-author-avatar">
                                <div className="avatar-container">
                                    <span className="avatar">
                                        <span className="avatar-inner">
                                            <svg className="avatar-image" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 121 122">
                                                <defs>
                                                    <clipPath id="mask">
                                                        <path d="M0 0V79L28.1628 105.5C35.013 115.465 46.4934 122 59.5 122C72.5066 122 83.987 115.465 90.8372 105.5L120.5 79V0H0Z"></path>
                                                    </clipPath>
                                                </defs>
                                                <image href="https://styles.redditmedia.com/t5_e4xqn/styles/profileIcon_snoob568c0d2-2229-460f-afef-98e538acf5a6-headshot.png?width=64&amp;height=64&amp;frame=1&amp;auto=webp&amp;crop=64:64,smart&amp;v=enabled&amp;s=57e37f64ec17cdd3dd6e60333dfbf413e11a5b62" alt="User Avatar" clipPath="url(#mask)" height="100%" width="100%"></image>
                                            </svg>
                                        </span>
                                    </span>
                                </div>
                            </span>

                        </Col>
                        <Col xs={3} xl={22} lg={21} className='title-feed'>
                            <div>
                                <span className="comment-author font-bold">MaverickMan</span><br />
                                <span className="comment-time">11.10</span>
                            </div>
                        </Col>
                    </Row>

                    <div className="comment-content">
                        <p>Кросівки, які я замовляв, просто чудові! Висока якість матеріалів, зручна посадка на ногу і стильний дизайн. Раджу всім!</p>
                    </div>
                </div>
            </Col>
            <Col lg={8} md={12} sm={12} xs={24}>
                <div className="shreddit-comment">
                    <Row>
                        <Col xs={3} xl={2} lg={3}  className='title-feed'>
                            <span className="comment-author-avatar">
                                <div className="avatar-container">
                                    <span className="avatar">
                                        <span className="avatar-inner">
                                            <svg className="avatar-image" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 121 122">
                                                <defs>
                                                    <clipPath id="mask">
                                                        <path d="M0 0V79L28.1628 105.5C35.013 115.465 46.4934 122 59.5 122C72.5066 122 83.987 115.465 90.8372 105.5L120.5 79V0H0Z"></path>
                                                    </clipPath>
                                                </defs>
                                                <image href="https://styles.redditmedia.com/t5_e4xqn/styles/profileIcon_snoob568c0d2-2229-460f-afef-98e538acf5a6-headshot.png?width=64&amp;height=64&amp;frame=1&amp;auto=webp&amp;crop=64:64,smart&amp;v=enabled&amp;s=57e37f64ec17cdd3dd6e60333dfbf413e11a5b62" alt="User Avatar" clipPath="url(#mask)" height="100%" width="100%"></image>
                                            </svg>
                                        </span>
                                    </span>
                                </div>
                            </span>

                        </Col>
                        <Col xs={3} xl={22} lg={21} className='title-feed'>
                            <div>
                                <span className="comment-author font-bold">IronGiant</span><br />
                                <span className="comment-time">17.03</span>
                            </div>
                        </Col>
                    </Row>

                    <div className="comment-content">
                        <p>Швидка доставка, професійне обслуговування і гарна цінова політика. З задоволенням замовлю тут ще!</p>
                    </div>
                </div>
            </Col>
            <Col lg={8} md={12} sm={12} xs={24}>
                <div className="shreddit-comment">
                    <Row>
                        <Col  xs={3} xl={2} lg={3}  className='title-feed'>
                            <span className="comment-author-avatar">
                                <div className="avatar-container">
                                    <span className="avatar">
                                        <span className="avatar-inner">
                                            <svg className="avatar-image" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 121 122">
                                                <defs>
                                                    <clipPath id="mask">
                                                        <path d="M0 0V79L28.1628 105.5C35.013 115.465 46.4934 122 59.5 122C72.5066 122 83.987 115.465 90.8372 105.5L120.5 79V0H0Z"></path>
                                                    </clipPath>
                                                </defs>
                                                <image href="https://styles.redditmedia.com/t5_e4xqn/styles/profileIcon_snoob568c0d2-2229-460f-afef-98e538acf5a6-headshot.png?width=64&amp;height=64&amp;frame=1&amp;auto=webp&amp;crop=64:64,smart&amp;v=enabled&amp;s=57e37f64ec17cdd3dd6e60333dfbf413e11a5b62" alt="User Avatar" clipPath="url(#mask)" height="100%" width="100%"></image>
                                            </svg>
                                        </span>
                                    </span>
                                </div>
                            </span>

                        </Col>
                        <Col xs={3} xl={22} lg={21}  className='title-feed'>
                            <div>
                                <span className="comment-author font-bold">ShadowHunter</span><br />
                                <span className="comment-time">09.11</span>
                            </div>
                        </Col>
                    </Row>

                    <div className="comment-content">
                        <p>Великий вибір кросівок в магазині Crosshop дозволяє знайти ідеальну модель для будь-яких потреб. Якість висока, а ціни - впевнено конкурентні. Рекомендую!</p>
                    </div>
                </div>
            </Col>
            <Col lg={8} md={12} sm={12} xs={24}>
                <div className="shreddit-comment">
                    <Row>
                        <Col  xs={3} xl={2} lg={3}  className='title-feed'>
                            <span className="comment-author-avatar">
                                <div className="avatar-container">
                                    <span className="avatar">
                                        <span className="avatar-inner">
                                            <svg className="avatar-image" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 121 122">
                                                <defs>
                                                    <clipPath id="mask">
                                                        <path d="M0 0V79L28.1628 105.5C35.013 115.465 46.4934 122 59.5 122C72.5066 122 83.987 115.465 90.8372 105.5L120.5 79V0H0Z"></path>
                                                    </clipPath>
                                                </defs>
                                                <image href="https://styles.redditmedia.com/t5_e4xqn/styles/profileIcon_snoob568c0d2-2229-460f-afef-98e538acf5a6-headshot.png?width=64&amp;height=64&amp;frame=1&amp;auto=webp&amp;crop=64:64,smart&amp;v=enabled&amp;s=57e37f64ec17cdd3dd6e60333dfbf413e11a5b62" alt="User Avatar" clipPath="url(#mask)" height="100%" width="100%"></image>
                                            </svg>
                                        </span>
                                    </span>
                                </div>
                            </span>

                        </Col>
                        <Col xs={3} xl={22} lg={21}  className='title-feed'>
                            <div>
                                <span className="comment-author font-bold">LightningBolt</span><br />
                                <span className="comment-time">28.06</span>
                            </div>
                        </Col>
                    </Row>

                    <div className="comment-content">
                        <p>Тут завжди можна знайти останні новинки в світі спортивного взуття. Доставка швидка і безпроблемна. Дякую вам!</p>
                    </div>
                </div>
            </Col>
            <Col lg={8} md={12} sm={12} xs={24}>
                <div className="shreddit-comment">
                    <Row>
                        <Col xs={3} xl={2} lg={3}  className='title-feed'>
                            <span className="comment-author-avatar">
                                <div className="avatar-container">
                                    <span className="avatar">
                                        <span className="avatar-inner">
                                            <svg className="avatar-image" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 121 122">
                                                <defs>
                                                    <clipPath id="mask">
                                                        <path d="M0 0V79L28.1628 105.5C35.013 115.465 46.4934 122 59.5 122C72.5066 122 83.987 115.465 90.8372 105.5L120.5 79V0H0Z"></path>
                                                    </clipPath>
                                                </defs>
                                                <image href="https://styles.redditmedia.com/t5_e4xqn/styles/profileIcon_snoob568c0d2-2229-460f-afef-98e538acf5a6-headshot.png?width=64&amp;height=64&amp;frame=1&amp;auto=webp&amp;crop=64:64,smart&amp;v=enabled&amp;s=57e37f64ec17cdd3dd6e60333dfbf413e11a5b62" alt="User Avatar" clipPath="url(#mask)" height="100%" width="100%"></image>
                                            </svg>
                                        </span>
                                    </span>
                                </div>
                            </span>

                        </Col>
                        <Col xs={3} xl={22} lg={21}  className='title-feed'>
                            <div>
                                <span className="comment-author font-bold">CaptainAdventure</span><br />
                                <span className="comment-time">13.09</span>
                            </div>
                        </Col>
                    </Row>

                    <div className="comment-content">
                        <p>Якість кросівок в магазині на високому рівні. Це дійсно варті своїх грошей. Оперативність обробки замовлення та доброзичлива підтримка клієнтів - ще один плюс для цього магазину</p>
                    </div>
                </div>
            </Col>
            <Col lg={8} md={12} sm={12} xs={24}>
                <div className="shreddit-comment">
                    <Row>
                        <Col  xs={3} xl={2} lg={3}  className='title-feed'>
                            <span className="comment-author-avatar">
                                <div className="avatar-container">
                                    <span className="avatar">
                                        <span className="avatar-inner">
                                            <svg className="avatar-image" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 121 122">
                                                <defs>
                                                    <clipPath id="mask">
                                                        <path d="M0 0V79L28.1628 105.5C35.013 115.465 46.4934 122 59.5 122C72.5066 122 83.987 115.465 90.8372 105.5L120.5 79V0H0Z"></path>
                                                    </clipPath>
                                                </defs>
                                                <image href="https://styles.redditmedia.com/t5_e4xqn/styles/profileIcon_snoob568c0d2-2229-460f-afef-98e538acf5a6-headshot.png?width=64&amp;height=64&amp;frame=1&amp;auto=webp&amp;crop=64:64,smart&amp;v=enabled&amp;s=57e37f64ec17cdd3dd6e60333dfbf413e11a5b62" alt="User Avatar" clipPath="url(#mask)" height="100%" width="100%"></image>
                                            </svg>
                                        </span>
                                    </span>
                                </div>
                            </span>

                        </Col>
                        <Col xs={3} xl={22} lg={21}  className='title-feed'>
                            <div>
                                <span className="comment-author font-bold">SilentNinja</span><br />
                                <span className="comment-time">24.05</span>
                            </div>
                        </Col>
                    </Row>

                    <div className="comment-content">
                        <p>Замовив кросівки і залишився задоволений. Вони відповідають опису, зручні та стильні. Команда магазину також заслуговує похвали за оперативність та професіоналізм."</p>
                    </div>
                </div>
            </Col>
            <Col lg={8} md={12} sm={12} xs={24}>
                <div className="shreddit-comment">
                    <Row>
                        <Col  xs={3} xl={2} lg={3}  className='title-feed'>
                            <span className="comment-author-avatar">
                                <div className="avatar-container">
                                    <span className="avatar">
                                        <span className="avatar-inner">
                                            <svg className="avatar-image" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 121 122">
                                                <defs>
                                                    <clipPath id="mask">
                                                        <path d="M0 0V79L28.1628 105.5C35.013 115.465 46.4934 122 59.5 122C72.5066 122 83.987 115.465 90.8372 105.5L120.5 79V0H0Z"></path>
                                                    </clipPath>
                                                </defs>
                                                <image href="https://styles.redditmedia.com/t5_e4xqn/styles/profileIcon_snoob568c0d2-2229-460f-afef-98e538acf5a6-headshot.png?width=64&amp;height=64&amp;frame=1&amp;auto=webp&amp;crop=64:64,smart&amp;v=enabled&amp;s=57e37f64ec17cdd3dd6e60333dfbf413e11a5b62" alt="User Avatar" clipPath="url(#mask)" height="100%" width="100%"></image>
                                            </svg>
                                        </span>
                                    </span>
                                </div>
                            </span>

                        </Col>
                        <Col xs={3} xl={22} lg={21}  className='title-feed'>
                            <div>
                                <span className="comment-author font-bold">AlphaWolf</span><br />
                                <span className="comment-time">05.12</span>
                            </div>
                        </Col>
                    </Row>

                    <div className="comment-content">
                        <p>Якщо вам потрібні якісні кросівки, замовляйте тут. Я вже кілька разів замовляв через інстаграм в цьому ж магазині взуття і кожен раз був задоволений якістю, швидкістю доставки та обслуговуванням.</p>
                    </div>
                </div>
            </Col>
            <Col lg={8} md={12} sm={12} xs={24}>
                <div className="shreddit-comment">
                    <Row>
                        <Col  xs={3} xl={2} lg={3}  className='title-feed'>
                            <span className="comment-author-avatar">
                                <div className="avatar-container">
                                    <span className="avatar">
                                        <span className="avatar-inner">
                                            <svg className="avatar-image" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 121 122">
                                                <defs>
                                                    <clipPath id="mask">
                                                        <path d="M0 0V79L28.1628 105.5C35.013 115.465 46.4934 122 59.5 122C72.5066 122 83.987 115.465 90.8372 105.5L120.5 79V0H0Z"></path>
                                                    </clipPath>
                                                </defs>
                                                <image href="https://styles.redditmedia.com/t5_e4xqn/styles/profileIcon_snoob568c0d2-2229-460f-afef-98e538acf5a6-headshot.png?width=64&amp;height=64&amp;frame=1&amp;auto=webp&amp;crop=64:64,smart&amp;v=enabled&amp;s=57e37f64ec17cdd3dd6e60333dfbf413e11a5b62" alt="User Avatar" clipPath="url(#mask)" height="100%" width="100%"></image>
                                            </svg>
                                        </span>
                                    </span>
                                </div>
                            </span>

                        </Col>
                        <Col xs={3} xl={22} lg={21}  className='title-feed'>
                            <div>
                                <span className="comment-author font-bold">SilverFox</span><br />
                                <span className="comment-time">19.07
</span>
                            </div>
                        </Col>
                    </Row>

                    <div className="comment-content">
                        <p>Купив кросівки в магазині Crosshop і просто в захваті! Висока якість, стильний дизайн і комфорт при носінні. Рекомендую всім шанувальникам спорту!</p>
                    </div>
                </div>
            </Col>
            <Col lg={8} md={12} sm={12} xs={24}>
                <div className="shreddit-comment">
                    <Row>
                        <Col  xs={3} xl={2} lg={3}  className='title-feed'>
                            <span className="comment-author-avatar">
                                <div className="avatar-container">
                                    <span className="avatar">
                                        <span className="avatar-inner">
                                            <svg className="avatar-image" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 121 122">
                                                <defs>
                                                    <clipPath id="mask">
                                                        <path d="M0 0V79L28.1628 105.5C35.013 115.465 46.4934 122 59.5 122C72.5066 122 83.987 115.465 90.8372 105.5L120.5 79V0H0Z"></path>
                                                    </clipPath>
                                                </defs>
                                                <image href="https://styles.redditmedia.com/t5_e4xqn/styles/profileIcon_snoob568c0d2-2229-460f-afef-98e538acf5a6-headshot.png?width=64&amp;height=64&amp;frame=1&amp;auto=webp&amp;crop=64:64,smart&amp;v=enabled&amp;s=57e37f64ec17cdd3dd6e60333dfbf413e11a5b62" alt="User Avatar" clipPath="url(#mask)" height="100%" width="100%"></image>
                                            </svg>
                                        </span>
                                    </span>
                                </div>
                            </span>

                        </Col>
                        <Col xs={3} xl={22} lg={21}  className='title-feed'>
                            <div>
                                <span className="comment-author font-bold">PhoenixRider</span><br />
                                <span className="comment-time">02.04</span>
                            </div>
                        </Col>
                    </Row>

                    <div className="comment-content">
                        <p>Великий вибір кросівок у магазині. Знайшов свою ідеальну пару, яка підходить як для спорту, так і для повсякденного використання. Дякую за якість!</p>
                    </div>
                </div>
            </Col> */}
        </Row>
        </>);
}

export default Feedback;