import { useEffect } from 'react';
import './style/modal.css';

export const DashboardModal = ({toggleModal, setAction, modalText}) => {

    const handleClick = (book) => {
        setAction(book)
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