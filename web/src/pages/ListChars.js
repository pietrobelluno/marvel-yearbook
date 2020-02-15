import React, { useState, useEffect } from "react";
import api from "../services/api";
import "./style.css";
import logoMarvel from "../images/marvel-logo.svg";
import { useParams } from "react-router-dom";

function ListChars() {
  const { page } = useParams();
  const [characters, setCharacters] = useState([]);
  useEffect(() => {
    async function loadCharacters() {
      const params = `page/${page ? page : 1}`;
      const res = await api.get(`/${params}`);
      setCharacters(res.data.characters);
    }
    loadCharacters();
  }, []);

  async function nextPage() {
    const res = await api.get(`/page/2`);
    setCharacters(res.data.characters);
  }
  return (
    <main>
      {characters.length === 0 && (
        <div className="loading">
          <img src={logoMarvel} alt="Logo da Marvel" />
        </div>
      )}
      <ul className="wrapper">
        {characters &&
          characters.map(char => (
            <li className="charItem" key={char.id}>
              <img src={char.image} alt={char.name} />
              <h2>{char.name}</h2>
            </li>
          ))}
        <div className="actions">
          <button>Anterior</button>
          <button onClick={() => nextPage()}>Próximo</button>
        </div>
      </ul>
    </main>
  );
}

export default ListChars;
