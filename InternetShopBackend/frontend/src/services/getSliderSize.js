

export const getSliderSize = () => {

    if (window.innerWidth < 700) {
        return 1;
    }  

    if(window.innerWidth < 1300) {
        return 2
    }


    return 3;
}