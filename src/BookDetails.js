import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Copy } from "./Copy"
import { BookInfo } from "./BookInfo"

export const BookDetails = () => {

    const { id } = useParams()
    const [copyDetails, setCopyDetails] = useState([])
    const [book, setBook] = useState("")
    const fetchUrl = "http://localhost:8080/"

    const copyElements = copyDetails.map(copy => <Copy key={copy.id} data={copy} />)

    const archiveString = book.archived ? "" : "niet " 

    const fetchCopies = () => {
        fetch(fetchUrl + "book/" + id + "/copy/all")
        .then(r => r.json())
        .then(d => setCopyDetails(d))
    }

    const fetchBook = () => {
        fetch(fetchUrl + "book/" + id)
        .then(r => r.json())
        .then(d => setBook(d))
    }

    useEffect(() => {
        fetchBook()
        fetchCopies()
    }, [])

    return (
        <div className="container">
            <BookInfo bookid={id} />
            <table className="table mt-3">
                <caption>Exemplaren</caption>
                <thead scope="row">
                    <tr>
                        <th scope="col">id</th>
                        <th scope="col">status</th>
                        <th scope="col">uitgeleend aan</th>
                        <th scope="col">inactief</th>
                        <th scope="col">acties</th>
                    </tr>
                </thead>
                <tbody>
                    {copyElements}
                </tbody>
            </table>
            {/* <table className="table">
                <caption>Reserveringen</caption>
                <thead scope="row">
                    <tr>
                        <th scope="col">datum</th>
                        <th scope="col">account</th>
                    </tr>
                </thead>
                <tbody>
                    
                </tbody>
            </table>
            <table className="table">
                <caption>Geschiedenis</caption>
                <thead scope="row">
                    <tr>
                        <th scope="col">id</th>
                        <th scope="col">account</th>
                        <th scope="col">start</th>
                        <th scope="col">eind</th>
                    </tr>
                </thead>
                <tbody>
                    
                </tbody>
            </table> */}
        </div>
    )
}