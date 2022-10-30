import axios from "axios";
const $axios = axios.create({
  baseURL: "http://127.0.0.1:8080/admin",
  timeout: 2000,
});
$axios.interceptors.response.use(
  function (response) {
      return response.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);
export default $axios;
