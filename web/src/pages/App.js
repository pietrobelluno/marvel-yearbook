import React, { useState, useEffect } from "react";
import api from "../services/api";
import "./style.css";
import logoMarvel from "../images/marvel-logo.svg";

function App() {
  const [characters, setCharacters] = useState([]);
  useEffect(() => {
    async function loadCharacters() {
      const response = await api.get("characters");
      setCharacters(response.data.characters);
    }
    loadCharacters();
  }, []);
  return (
    <main>
      {characters.length === 0 && (
        <div className="loading">
          <img src={logoMarvel} alt="Logo da Marvel" />
        </div>
      )}
      <div className="wrapper">
        {characters &&
          characters.map(char => (
            <div className="charItem" key={char.id}>
              <img src={char.image} alt={char.name} />
              <h2>{char.name}</h2>
            </div>
          ))}
        <div className="actions">
          <button>Anterior</button>
          <button>Próximo</button>
        </div>
      </div>
    </main>
  );
}

export default App;
