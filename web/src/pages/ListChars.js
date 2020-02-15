import React, { useState, useEffect } from "react";
import api from "../services/api";
import "./style.css";
import logoMarvel from "../images/marvel-logo.svg";
import { useParams } from "react-router-dom";
import history from "../history";

function ListChars() {
  const { page } = useParams();
  const [characters, setCharacters] = useState([]);
  const [pageParam, setPageParam] = useState(page ? page : 1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadCharacters() {
      setLoading(true);
      const params = `page/${pageParam ? pageParam : 1}`;
      const res = await api.get(`/${params}`);
      setCharacters(res.data.characters);
      setLoading(false);
    }
    loadCharacters();
  }, []);

  async function nextPage(page) {
    setLoading(true);
    history.push(`/page/${page}`);
    const res = await api.get(`/page/${page}`);
    setCharacters(res.data.characters);
    setPageParam(page);
    setLoading(false);
  }

  async function prevPage(page) {
    setLoading(true);
    history.push(`/page/${page}`);
    const res = await api.get(`/page/${page}`);
    setCharacters(res.data.characters);
    setPageParam(page);
    setLoading(false);
  }
  return (
    <main>
      {loading && (
        <div className="loading">
          <img src={logoMarvel} alt="Logo da Marvel" />
        </div>
      )}
      <ul className="wrapper">
        {characters &&
          !loading &&
          characters.map(char => (
            <li className="charItem" key={char.id}>
              <img src={char.image} alt={char.name} />
              <h2>{char.name}</h2>
            </li>
          ))}
        <div className="actions">
          <button
            onClick={() => prevPage(pageParam <= 1 ? pageParam : pageParam - 1)}
          >
            Anterior
          </button>
          <button onClick={() => nextPage(pageParam + 1)}>Próximo</button>
        </div>
      </ul>
    </main>
  );
}

export default ListChars;
