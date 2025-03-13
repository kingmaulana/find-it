import axios from "axios";

export const p2Api = axios.create({
  baseURL: " http://localhost:3000"
//   baseURL: "link deploy",
});
