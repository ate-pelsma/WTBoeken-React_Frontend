import { useEffect } from 'react';
import './style/modal.css';

export const DashboardModalSucces = ({toggleModalSucces, setAction, modalText}) => {

    const handleClick = () => {
        toggleModalSucces(false)
    }

    return (
        <div className="modal--background">
            <div className="modal--container">
                <div className="modal--title">
                    <h1>{modalText}</h1>
                </div>
                <div className="modal--footer">
                    <button className='buttonGrey' onClick={handleClick}>Ga verder</button>
                </div>
            </div>
        </div>
    )
}