import httpService from "./httpService";
import { apiUrl } from "../config.json";

const apiEndPoint = apiUrl + "/movies";

export function getMovies() {
  return httpService.get(apiEndPoint);
}

export function deleteMovie(id) {
  return httpService.get(apiEndPoint + "/" + id);
}

export function getMovie(id) {
  return httpService.get(apiEndPoint + "/" + id);
}

export function saveMovie(movie) {
  if (movie._id) {
    const body = { ...movie };
    delete body._id;
    return httpService.put(apiEndPoint + "/" + movie._id, body);
  }
  return httpService.post(apiEndPoint, movie);
}

export function saveLike(movie) {
  const genreId = movie.genre._id
  const body = { ...movie, liked: !movie.liked, genreId };
  // delete body._id;
  return httpService.put(apiEndPoint + "/" + movie._id, body);
}
