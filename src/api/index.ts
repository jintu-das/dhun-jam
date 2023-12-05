import axios from "axios";

const API = axios.create({
  baseURL: "https://stg.dhunjam.in/account",
});

export default API;
