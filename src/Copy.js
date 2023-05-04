export const Copy = ({data}) => {

    const {id, loaned, loans, inactive} = data
    console.log(loans)
    return (
        <tr>
            <td>{id}</td>
            <td>{loaned ? "uitgeleend" : "beschikbaar"}</td>
            <td>{}</td>
            <td>{inactive ? "ja" : "nee"}</td>
            <td>acties hier</td>
        </tr>
    )
}