import httpService from "./httpService";
import { apiUrl } from "../config.json";

const apiEndPoint = apiUrl + "/users";


export function register(user) {
  return httpService.post(apiEndPoint, {
    name: user.name,
    email: user.username,
    password: user.password,
  });
}
