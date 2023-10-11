import axios from "axios";

const instance = axios.create({
  
  baseURL: "http://127.0.0.1:8000/api",
  // baseURL: "http://idlogix.utis.pk:8089/malpos-api/public/api/",
});

export default instance;
