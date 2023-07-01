import './styles/divider.css';

const Divider = ({text}) => {
    return (<div className='divider-container'>
        <div className='lines'>
            <div className='circle'>
                <span>{text}</span>
            </div>
        </div>
    </div>);
}

export default Divider;