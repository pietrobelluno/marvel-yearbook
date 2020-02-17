import React from "react";
import "./style.css";

const CharItem = props => {
  const { id, image, name } = props.character;
  return (
    <li className="charItem" key={id}>
      <img src={image} alt={name} />
      <h2>{name}</h2>
    </li>
  );
};

export default CharItem;
