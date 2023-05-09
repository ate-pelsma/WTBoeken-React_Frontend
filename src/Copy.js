export const Copy = ({data}) => {

    const {copyNumber, loaned, loans, inactive} = data
    return (
        <tr>
            <td>{copyNumber}</td>
            <td>{loaned ? "uitgeleend" : "beschikbaar"}</td>
            <td>{}</td>
            <td>{inactive ? "ja" : "nee"}</td>
            <td>acties hier</td>
        </tr>
    )
}