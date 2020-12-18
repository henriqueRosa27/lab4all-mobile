import axios from "axios";

const api = axios.create({
  baseURL: "https://to-be-defined.herokuapp.com/",
  timeout: 60000
});

export default api;
