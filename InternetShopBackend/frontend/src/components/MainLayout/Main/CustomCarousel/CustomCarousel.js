import { Carousel } from 'antd';
import './styles/carousel.css';
import CustomButtonCarousel from './CustomButtonCarousel';
import classNames from 'classnames';
import { useState } from 'react';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';

const contentStyle = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
  };

const CustomCarousel = ({content}) => {

    const carouselSettings = {
        prevArrow: <ArrowCircleLeftIcon />,
        nextArrow: <ArrowCircleRightIcon />,
      };

    const [slide, setSlide] = useState(0);

    const [closedSlide, setClosedSlide] = useState(0);

    const onFocusAfter = (currentSlide) => {
            setSlide(currentSlide);
    }

    const onFocusBefore = (currentSlide) => {
        setClosedSlide(currentSlide);
    }
    


    return (<Carousel className='carousel-main-page'
    autoplay infinite={true}
    beforeChange={onFocusBefore} afterChange={onFocusAfter} >
        {
            content.map((el, index) => {
                return (<div key={"carousel"+index} className='carousel-block'>
                    <img src={el.image} className={classNames({"zoomed": index === slide}, {"unzoomed": index===closedSlide}, 'img-slide')} />
                    <div className='carousel-content'>
                        <span>{el.text}</span>
                        
                        <CustomButtonCarousel text={el.buttonText} />    
                        
                    </div>
                </div>);
            })
        }
      </Carousel>);
}

export default CustomCarousel;