import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Copy } from "./Copy"
import { BookInfo } from "./BookInfo"
import { useLocalState } from './utils/setLocalStorage'

export const BookCopies = ({id}) => {

    const [jwt, setJwt] = useLocalState("", "jwt");
    const fetchUrl = "http://localhost:8080/"
    const [copyDetails, setCopyDetails] = useState([])

    const fetchCopies = () => {
        fetch(fetchUrl + "book/" + id + "/copy/all"
        ,
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`,
            },
            method: "GET",
        })
        .then(r => r.json())
        .then(d => {
            setCopyDetails(d)
        })
    }

    useEffect(() => {
        fetchCopies()
    }, [])

    const copyElements = copyDetails.map(copy => <Copy key={copy.id} data={copy} bookid={id} setCopyDetails={setCopyDetails} />)

    return (
        <div>
            <table className="table table-striped table-hover mt-3">
                <caption>Exemplaren</caption>
                <thead>
                    <tr>
                        <th scope="col">id</th>
                        <th scope="col">beschikbaar</th>
                        <th scope="col">uitgeleend aan</th>
                        <th scope="col">inactief</th>
                        <th scope="col" className="text-center">acties</th>
                    </tr>
                </thead>
                <tbody>
                    {copyElements}
                </tbody>
            </table>
        </div>
    )
}