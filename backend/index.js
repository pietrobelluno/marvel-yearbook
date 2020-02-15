const express = require("express");
const axios = require("axios");

const app = express();

app.get("/books", async (req, res) => {
  let offset = 0;
  const limit = 2;
  if (req.query.page && req.query.page > 1) {
    const page = req.query.page;
    offset = (page - 1) * limit;
  }
  const ts = "thesoer";
  const apiKey = "001ac6c73378bbfff488a36141458af2";
  const hash = "72e5ed53d1398abb831c3ceec263f18b";
  const apiResponse = await axios.get(
    `https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${apiKey}&hash=${hash}&offset=${offset}&limit=${limit}`
  );

  const results = apiResponse.data.data.results;
  const data = [];
  results.map(char => {
    const obj = {
      id: char.id,
      name: char.name,
      image: `${char.thumbnail.path}/portrait_xlarge.${char.thumbnail.extension}`
    };
    data.push(obj);
  });

  return res.json({ data });
});

app.listen(3333);
