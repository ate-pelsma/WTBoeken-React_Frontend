import { useEffect, useState } from "react"

export const BookInfo = ({data}) => {

    const authorElements = data.authors.map(author => {
        return <li>{author.name}</li>
    })

    return (
        <div>
            <h2>{data.title}</h2>
            <img src={data.cover.medium}></img>
            <ul>
                {authorElements}
            </ul>
            
            <ul>
                <li>{data.publish_date}</li>
                <li>{data.number_of_pages}</li>
            </ul>
        </div>
    )
}