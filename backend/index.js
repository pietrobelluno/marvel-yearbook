const express = require("express");
const axios = require("axios");

const app = express();

const limit = 20;
const ts = "thesoer";
const apiKey = "001ac6c73378bbfff488a36141458af2";
const hash = "72e5ed53d1398abb831c3ceec263f18b";

app.get("/page/:page", async (req, res) => {
  const { page } = req.params;
  let offset = 0;
  if (page && page > 1) {
    offset = (page - 1) * limit;
  }
  const apiResponse = await axios.get(
    `https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${apiKey}&hash=${hash}&offset=${offset}&limit=${limit}`
  );

  const results = apiResponse.data.data.results;
  const characters = [];
  results.map(char => {
    const obj = {
      id: char.id,
      name: char.name,
      image: `${char.thumbnail.path}/portrait_xlarge.${char.thumbnail.extension}`
    };
    characters.push(obj);
  });
  res.setHeader("Access-Control-Allow-Origin", "*");
  return res.json({ characters });
});

app.listen(3333);
