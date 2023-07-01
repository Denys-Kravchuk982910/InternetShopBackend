import './style/zoomer.css';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import { useEffect, useState } from 'react';


const StoryZoomer = ({setChecked, images}) => {

    const [counter, setCounter] = useState(0);
    const [intervalId, setIntervalId] = useState(0);

    const increaseProgress = (progressBar) => {
        let width = 0;
        let interval = setInterval(() => {
            if (width >= 100) {
                clearInterval(interval);
                if(counter < images.length-1) {
                    setCounter(counter+1);
                    return;
                }

                setChecked(false);
                return;

            } else {
                width++;
                progressBar.style.width = width + '%';
            }
        }, 100);

        setIntervalId(interval);
    }

    useEffect(() => {
        setCounter(0);
    }, []);

    useEffect(() => {
        const progressBar = document.querySelector('.progress');
        increaseProgress(progressBar);
    }, [counter]);


    const onSideClick = (e) => {
        e.preventDefault();
        switch (e.target.closest("span").classList[0]) {
            case "rightArrow": {
                if(counter < images.length-1) {
                    clearInterval(intervalId);
                    setCounter(counter+1);
                    setIntervalId(-1);
                    break;
                } 
                setChecked(false);

                break;
            }
            case "leftArrow": {
                if(counter > 0) {
                    clearInterval(intervalId);
                    setCounter(counter-1);
                    setIntervalId(-1);
                }
                break;
            }
        }
    }

    return (<div className='cus-modal'>
        <div className='cus-modal-container'>
            <img src={images[counter]}/>
            <div className="progress-bar">
                <div className="progress"></div>
            </div>
            <div className='directionArrows'>
                <span className='leftArrow' onClick={onSideClick}><ArrowCircleLeftIcon fontSize='large'/></span>
                <span className='rightArrow' onClick={onSideClick}><ArrowCircleRightIcon fontSize='large'/></span>
            </div>
        </div>
    </div>)
}

export default StoryZoomer;