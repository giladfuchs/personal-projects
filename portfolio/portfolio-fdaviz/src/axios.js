import axios from "axios";

const instance = axios.create({
  baseURL: "https://portfolio-a42f1.firebaseio.com/",
});

export default instance;
