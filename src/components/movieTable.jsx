import React, { Component } from "react";
import { Link } from "react-router-dom";
import Like from "./common/like";
import Table from "./common/table";
import auth from "../services/authService";

class MovieTable extends Component {
  state = {
    columns: [
      {
        name: "Title",
        path: "title",
        content: (movie) => (
          <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
        ),
      },
      { name: "Genre", path: "genre.name" },
      { name: "Stock", path: "numberInStock" },
      { name: "Rate", path: "dailyRentalRate" },
      {
        key: "like",
        content: (movie) => (
          <Like movie={movie} handleLike={this.props.handleLike} />
        ),
      },
    ],
  };

  deleteColumn = {
    key: "delete",
    content: (movie) => (
      <button
        onClick={() => this.props.handleDelete(movie._id)}
        className="btn btn-sm btn-danger m-2"
      >
        Delete
      </button>
    ),
  };

  constructor() {
    super();
    const user  = auth.getCurrentUser();
    if (user && user.isAdmin) {
      this.state.push(this.deleteColumn);
    }
  }

  render() {
    const { movies, sortColumn, handleSort } = this.props;

    const { columns } = this.state;
    return (
      <div>
        <Table
          sortColumn={sortColumn}
          handleSort={handleSort}
          columns={columns}
          data={movies}
        />
      </div>
    );
  }
}

export default MovieTable;
