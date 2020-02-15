const express = require("express");
const axios = require("axios");

const app = express();

app.get("/", async (request, response) => {
  const ts = "thesoer";
  const apiKey =
    "001ac6c73378bbfff488a36141458af2&hash=72e5ed53d1398abb831c3ceec263f18b";
  const apiResponse = await axios.get(
    `https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${apiKey}`
  );

  console.log(apiResponse.data.data.results);
  return response.json({ message: "Hello World" });
});

app.listen(3333);
