export const Copy = ({data}) => {

    const {copyNumber, loaned, loans, inactive} = data
    return (
        <tr className="d-flex">
            <td className="col-1">{copyNumber}</td>
            <td className="col-1 text-center">{loaned ? "uitgeleend" : "beschikbaar"}</td>
            <td className="col-5 text-center">{}</td>
            <td className="col-1 text-center">{inactive ? "ja" : "nee"}</td>
            <td className="col-4 d-flex justify-content-center">
                <button className="buttonGrey m-1">inactiveren</button>
                <button className="buttonGrey m-1">toewijzen</button>
            </td>
        </tr>
    )
}