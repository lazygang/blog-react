import Axios from "./requests";

export const login_api = (data) => {
  return Axios.post("/users/login", data);
};
export const register_api = (data) => {
  return Axios.post("/users/register", data);
};
export const checkName_api = (params) => {
  return Axios.get("/users/checkName", { data: {}, params });
};
export const checkNickName_api = (params) => {
  return Axios.get("/users/checkNickName", { data: {}, params });
};
