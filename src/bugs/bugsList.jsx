import React, { Component } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadBugs, getUnresolvedBugs, resolveBugs } from "./../store/bugs";

const BugsList = () => {
  const dispatch = useDispatch();

  const bugs = useSelector(getUnresolvedBugs);
//   const resolveBug = useSelector(resolveBugs());
  useEffect(() => {
    dispatch(loadBugs());
  }, []);
  return (
    <ul>
      {bugs.map((bug) => (
        <div key={bug.id}>
          <li>{bug.description}</li>
          <button
            onClick={() => dispatch(resolveBugs(bug.id))}
            className="btn btn-primary"
          >
            Resolve
          </button>
        </div>
      ))}
    </ul>
  );
};

export default BugsList;
