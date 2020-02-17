import React, { useState, useEffect } from "react";
import api from "../services/api";
import "./style.css";
import logoMarvel from "../images/marvel-logo.svg";
import { useParams } from "react-router-dom";
import history from "../history";

function ListChars() {
  const { page } = useParams();
  const pageInt = parseInt(page);
  const [characters, setCharacters] = useState([]);
  const [total, setTotal] = useState(0);
  const [pageParam, setPageParam] = useState(pageInt ? pageInt : 1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadCharacters() {
      setLoading(true);
      const params = `page/${pageParam ? pageParam : 1}`;
      const res = await api.get(`/${params}`);
      setCharacters(res.data.apiResults.characters);
      setTotal(res.data.apiResults.total);
      setLoading(false);
    }
    loadCharacters();
  }, []);

  async function nextPage(page) {
    setLoading(true);
    history.push(`/page/${page}`);
    const res = await api.get(`/page/${page}`);
    setCharacters(res.data.apiResults.characters);
    setPageParam(page);
    setLoading(false);
  }

  async function prevPage(page) {
    setLoading(true);
    history.push(`/page/${page}`);
    const res = await api.get(`/page/${page}`);
    setCharacters(res.data.apiResults.characters);
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
      {characters && !loading && (
        <div>
          <h1 className="title">
            <img src={logoMarvel} alt="Logo da Marvel"></img>YearBook
          </h1>
          <p className="description">
            This website has all {total} characters that were registered in
            marvel's api, this is being ordered in alphabetical order, use the
            side arrows for navigation or jump to a specific page by URL.
          </p>

          <ul className="wrapper">
            {characters.map(char => (
              <li className="charItem" key={char.id}>
                <img src={char.image} alt={char.name} />
                <h2>{char.name}</h2>
              </li>
            ))}
            <div className="actions">
              {pageParam > 1 && (
                <button
                  className="prev"
                  onClick={() => prevPage(pageParam - 1)}
                >
                  prev
                </button>
              )}
              {pageParam + 1 <= Math.round(total / 20) && (
                <button
                  className="next"
                  onClick={() => nextPage(pageParam + 1)}
                >
                  next
                </button>
              )}
            </div>
          </ul>

          <div className="copyright">
            &copy;2020 Developed by Pietro Belluno Pilau with React.js and
            Node.js
          </div>
        </div>
      )}
    </main>
  );
}

export default ListChars;
