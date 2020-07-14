import httpService from "./httpService";
import { apiUrl } from "../config.json";
import jwtDecode from "jwt-decode";

const apiEndPoint = apiUrl + "/auth";
const tokenKey = "token";

httpService.setJwt(getJwt());
  
export async function login(email, password) {
  const { data: jwt } = await httpService.post(apiEndPoint, {
    email,
    password,
  });
  localStorage.setItem(tokenKey, jwt);
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (error) {
    return null;
  }
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export default {
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
  getJwt,
};
