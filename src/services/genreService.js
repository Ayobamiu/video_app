import httpService from "./httpService";



export function getGenres() {
  return httpService.get("http://localhost:3900/api/genres")
}
