import { useNavigate } from "react-router"
import { WarningModal } from "./WarningModal"
import { useEffect, useState } from "react"
import { setMaxListeners } from "events"

export const Copy = ({data}) => {

    const redirect = useNavigate()

    const {id, copyNumber, loaned, inactive} = data
    const [showModal, setShowModal] = useState(false)
    const [modalElement, setModalElement] = useState("")
    const [copyData, setCopyData] = useState(data)

    const handleInactiveClick = () => {
        setModalElement(<WarningModal toggleModal={setShowModal} setAction={setInactive} modalText={inactive ? "Boek weer activeren?" : "Boek deactiveren?"} />)
        setShowModal(true)
    }

    const setInactive = () => {
        fetch("http://localhost:8080/copy/inactive/" + id, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' }
        })
        .then(r => r.json())
        .then(d => {
            setCopyData(d)
        })
    }

    return (
            <tr className="d-flex">
                <td className="col-1">{copyNumber}</td>
                <td className="col-1 text-center">{loaned ? "uitgeleend" : "beschikbaar"}</td>
                <td className="col-5 text-center">{}</td>
                <td className="col-1 text-center">{copyData.inactive ? "ja" : "nee"}</td>
                <td className="col-4 d-flex justify-content-center">
                    <button onClick={handleInactiveClick} className="buttonGrey m-1">{copyData.inactive ? "activeren" : "inactiveren"}</button>
                    <button className="buttonGrey m-1">toewijzen</button>
                </td>
                <td>
                    {showModal && modalElement}
                </td>
            </tr>
    )
}