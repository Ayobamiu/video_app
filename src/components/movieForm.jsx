import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { getMovie, saveMovie, getMovies } from "./../services/movieService";
import { getGenres } from "../services/genreService";

class MovieForm extends Form {
  state = {
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: "",
    },
    genres: [],
    errors: {},
    movies: [],
  };

  async populateMovies() {
    const { data: movies } = await getMovies();
    this.setState({ movies });
  }
  async populateGenres() {
    const { data } = await getGenres();
    const genres = [{ _id: "", name: "All Genre" }, ...data];
    this.setState({ genres });
  }
  async populateMovie() {
    const movieID = this.props.match.params.id;
    if (!movieID) return;

    try {
      const { data: movie } = await getMovie(movieID);

      this.setState({
        data: this.mapToViewModel(movie),
      });
    } catch (error) {
      if (error.response && error.response.status === 404)
        return this.props.history.replace("/not-found");
    }
  }

  async componentDidMount() {
    await this.populateMovies();
    await this.populateGenres();
    await this.populateMovie();
  }

  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  }

  schema = {
    _id: Joi.string(),
    title: Joi.string().required().label("Title"),
    genreId: Joi.string().required().label("Genre"),
    numberInStock: Joi.number()
      .min(0)
      .max(100)
      .required()
      .label("Number In Stock"),
    dailyRentalRate: Joi.number().min(0).max(10).required().label("Rate"),
  };

  doSubmit = async () => {
    const { data: movie } = await saveMovie(this.state.data);
    const movies = [...this.state.movies, movie];
    this.setState({
      movies,
    });
    this.props.history.push("/movies");
  };
 
  render() {
    return (
      <div className="jumbotron" style={{ margin: "20px 25% 50% 25%" }}>
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("Title", "title")}
          {this.renderSelect("Genre", "genreId", this.state.genres)}
          {this.renderInput("Number In Stock", "numberInStock")}
          {this.renderInput("Rate", "dailyRentalRate")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default MovieForm;
