import React, { useState } from "react";
import { useNavigate } from "react-router";

export const Book = ({ book }) => {
  const { id, author, image, isbn, tags, title, copies } = book;
  const [cursor, setCursor] = useState("auto");
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/books/details/${id}`);
  };

  return (
    <tr
      style={{ cursor: cursor }}
      onMouseOver={() => setCursor("pointer")}
      onMouseLeave={() => setCursor("auto")}
      onClick={handleClick}
    >
      <td>
        <img src={image} alt="None" style={{ width: "50px" }}></img>
      </td>
      <td>{title}</td>
      <td>{author}</td>
      <td>{isbn}</td>
      <td>{copies.length}</td>
      <td>{tags}</td>
    </tr>
  );
};
