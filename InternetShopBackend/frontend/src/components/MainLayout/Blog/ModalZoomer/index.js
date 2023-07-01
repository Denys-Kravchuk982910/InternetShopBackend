import './style/zoomer.css';

const ModalZoomer = ({setChecked, image}) => {
    return (<div className='cus-modal' onClick={() => setChecked({
        img: "",
        isCheck: false
    })}>
        <div className='cus-modal-container'>
            <img src={image}/>
        </div>
    </div>)
}

export default ModalZoomer;