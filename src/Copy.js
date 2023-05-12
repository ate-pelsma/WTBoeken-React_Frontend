import { useNavigate } from "react-router"
import { WarningModal } from "./WarningModal"
import { useEffect, useState } from "react"
import { setMaxListeners } from "events"

import { Dot } from "react-bootstrap-icons";

export const Copy = ({data, bookid, setCopyDetails}) => {
    const {id, copyNumber, loaned, inactive} = data
    const [showModal, setShowModal] = useState(false)
    const [modalElement, setModalElement] = useState("")
    const [copyData, setCopyData] = useState(data)

    const handleInactiveClick = () => {
        setModalElement(<WarningModal toggleModal={setShowModal} setAction={setInactive} modalText={inactive ? "Boek weer activeren?" : "Boek deactiveren?"} />)
        setShowModal(true)
    }

    const handleReservationClick = () => {
        console.log("toewijs actie")
    }

    const setInactive = () => {
        fetch("http://localhost:8080/copy/inactive/" + id, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' }
        })
        .then(r => r.json())
        .then(d => {
            setCopyData(d)
            reRenderParent(d)
        })
    }

    const reRenderParent = (d) => {
        const currentCopy = copyNumber - 1
        setCopyDetails(prevState => {
            prevState[currentCopy] = d
            return prevState
        })
    }

    return (
            <tr>
                <th className="align-middle" scope="row">{copyNumber}</th>
                <td className="align-middle">{loaned || copyData.inactive ? <Dot fill="orange" size={60}/> : <Dot fill="green" size={60} />}</td>
                <td className="align-middle">{}</td>
                <td className="align-middle">{copyData.inactive ? "ja" : "nee"}</td>
                <td className="d-flex justify-content-md-center align-middle">
                    <button onClick={handleInactiveClick} style={{minWidth: "110px"}} className="buttonGrey">{copyData.inactive ? "activeren" : "inactiveren"}</button>
                    <button onClick={handleReservationClick} className="buttonGrey" style={{padding: "1rem"}}>toewijzen</button>
                </td>
                <td>
                    {showModal && modalElement}
                </td>
            </tr>
    )
}