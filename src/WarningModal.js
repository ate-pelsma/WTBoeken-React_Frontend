import { useEffect } from 'react';
import './style/modal.css';

export const WarningModal = ({toggleModal, setAction}) => {

    const handleClick = () => {
        setAction()
        toggleModal(false)
    }

    return (
        <div className="modal--background">
            <div className="modal--container">
                <div className="modal--title">
                    <h1>Bevestig deze actie</h1>
                </div>
                <div className="modal--footer">
                    <button onClick={() => toggleModal(false)}>Annuleren</button>
                    <button onClick={handleClick}>Bevestigen</button>
                </div>
            </div>
        </div>
    )
}