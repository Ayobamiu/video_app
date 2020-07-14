import React, { Component } from "react";
import { loadBugs, resolveBugs, getUnresolvedBugs } from "../store/bugs";
import { connect } from "react-redux";

class Bugs extends Component {
  componentDidMount() {
    this.props.loadBugs();
  }

  render() {
    return (
      <ul>
        {this.props.bugs.map((bug) => (
          <div key={bug.id}>
            <li>{bug.description}</li>
            <button
              onClick={() => this.props.resolveBugs(bug.id)}
              className="btn btn-primary"
            >
              Resolve
            </button>
          </div>
        ))}
      </ul>
    );
  }
}

const mapStateToProps = (state) => ({
  bugs: getUnresolvedBugs(state),
});

const mapDispatchToProps = (dispatch) => ({
  loadBugs: () => dispatch(loadBugs()),
  resolveBugs: (id) => dispatch(resolveBugs(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Bugs);
