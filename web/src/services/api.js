import axios from "axios";

const api = axios.create({
  baseURL: "http://34.227.99.210:3333/"
});

export default api;
