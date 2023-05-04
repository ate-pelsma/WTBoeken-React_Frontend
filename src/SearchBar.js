import { useEffect, useState } from "react"

export const SearchBar = () => {

    const [searchInput, setSearchInput] = useState("")

    console.log(searchInput)
    useEffect(() => {
        console.log(searchInput)
    }, [])

    return (
        <div className="ms-4">
            <input type="text" onChange={(e) => setSearchInput(e.target.value)} placeholder="search for title here"></input>
        </div>
    )
}