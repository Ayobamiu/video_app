import React, { Component } from "react";
import { Link } from "react-router-dom";
import MovieTable from "./movieTable";
import ListGroup from "./common/listGroup";
import Pagination from "./common/pagination";
import { getMovies, deleteMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";
import { paginate } from "../utils/paginate";
import _ from "lodash";
import { toast } from "react-toastify";

class Movies extends Component {
  state = {
    movies: [],
    pageSize: 4,
    currentPage: 1,
    genres: [],
    selectedGenre: null,
    sortColumn: { path: "title", order: "asc" },
    searchQuery: "",
  };

  async componentDidMount() {
    const { data } = await getGenres();
    const genres = [{ _id: "", name: "All Genre" }, ...data];
    const { data: movies } = await getMovies();

    this.setState({
      movies: [...movies],
      genres,
    });
  }

  handleDelete = async (movieID) => {
    const originalMovies = this.state.movies;

    this.setState({
      movies: originalMovies.filter((movie) => movie._id !== movieID),
    });
    try {
      await deleteMovie(movieID);
    } catch (error) {
      if (error.response && error.response.status === 404)
        toast.error("This movie has already been deleted.");
      this.setState({
        movies: originalMovies,
      });
    }
  };

  handleLike = async (movie) => {
    const index = movie._id;
    const movies = this.state.movies.map((movie) => {
      if (movie._id === index) movie.liked = !movie.liked;
      return movie;
    });
    this.setState({
      movies,
    });
    // try {
    //   await saveLike(movie);
    // } catch (error) {
    //   if(error.response && error.response.status===400){
    //     toast.error("Bad request")
    //   }
    // }
  };

  handlePageChange = (page) => {
    this.setState({
      currentPage: page,
    });
  };

  handleGenreSelect = (genre) => {
    this.setState({
      selectedGenre: genre,
      currentPage: 1,
      searchQuery: "",
    });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  getPageData = () => {
    const {
      pageSize,
      currentPage,
      movies: allMovies,
      selectedGenre,
      sortColumn,
      searchQuery,
    } = this.state;

    let filtered = allMovies;

    if (searchQuery) {
      filtered = allMovies.filter((movie) =>
        movie.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    } else if (selectedGenre && selectedGenre._id) {
      filtered = allMovies.filter(
        (movie) => movie.genre._id === selectedGenre._id
      );
    }

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const movies = paginate(sorted, currentPage, pageSize);
    return { totalCount: filtered.length, data: movies };
  };

  handleSearch = (e) => {
    this.setState({
      searchQuery: e.currentTarget.value,
      currentTarget: 1,
      selectedGenre: null,
    });
  };

  render() {
    const { length: count } = this.state.movies;
    const {
      pageSize,
      currentPage,
      genres,
      selectedGenre,
      sortColumn,
    } = this.state;
    const { user } = this.props;
    const { totalCount, data: movies } = this.getPageData();

    return count === 0 ? (
      <div>
        <p>There are no movies in the Database.</p>
      </div>
    ) : (
      <div className="row m-3">
        <div className="col-3">
          <ListGroup
            items={genres}
            selectedItem={selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className=" col">
          {user && (
            <Link to="/movies/new">
              <button className="btn-sm btn-primary ">New Movie</button>
            </Link>
          )}
          <p style={{ color: "black" }}>
            Showing {totalCount} of {count} movies in the database
          </p>
          <input
            placeholder="Search..."
            className="form-control my-3"
            name="query"
            onChange={this.handleSearch}
          />
          <MovieTable
            handleSort={this.handleSort}
            movies={movies}
            handleLike={this.handleLike}
            sortColumn={sortColumn}
            handleDelete={this.handleDelete}
          />
          <Pagination
            itemCount={totalCount}
            pageSize={pageSize}
            onPageChange={this.handlePageChange}
            currentPage={currentPage}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
