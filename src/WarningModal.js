import { useEffect } from "react";
import "./style/modal.css";
import { useNavigate } from "react-router-dom";

export const WarningModal = ({
  toggleModal,
  setAction,
  modalText,
  redirect,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    setAction();
    toggleModal(false);
    if (redirect) {
      navigate(-1);
    }
  };

  return (
    <div className="modal--background">
      <div style={{ zIndex: 10 }} className="modal--container">
        <div className="modal--title">
          <h1>{modalText}</h1>
        </div>
        <div className="modal--footer">
          <button className="buttonGrey" onClick={() => toggleModal(false)}>
            Annuleren
          </button>
          <button className="buttonGrey" onClick={handleClick}>
            Bevestigen
          </button>
        </div>
      </div>
    </div>
  );
};
