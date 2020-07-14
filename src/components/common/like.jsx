import React, { Component } from "react";

class Like extends Component {
  render() {
    const classes = this.props.movie.liked ? "fa fa-heart" : "fa fa-heart-o";
    return (
      <div> 
        <i
          style={{ cursor: "pointer" }}
          defaultChecked={this.props.movie.liked}
          onClick={() => this.props.handleLike(this.props.movie)}
          className={classes}
          aria-hidden="true"
        ></i>
      </div>
    );
  }
}

export default Like;
