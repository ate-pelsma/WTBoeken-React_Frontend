import { useEffect } from 'react';
import './style/modal.css';

export const WarningModal = ({toggleModal, setAction, modalText}) => {

    const handleClick = () => {
        setAction()
        toggleModal(false)
    }

    return (
        <div className="modal--background">
            <div className="modal--container">
                <div className="modal--title">
                    <h1>{modalText}</h1>
                </div>
                <div className="modal--footer">
                    <button className='buttonGrey' onClick={() => toggleModal(false)}>Annuleren</button>
                    <button className='buttonGrey' onClick={handleClick}>Bevestigen</button>
                </div>
            </div>
        </div>
    )
}