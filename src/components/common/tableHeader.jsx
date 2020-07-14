import React, { Component } from "react";

class TableHeader extends Component {
  state = {};

  raiseSort = (path) => {
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.path === path)
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    this.props.handleSort(sortColumn);
  };

  renderSortIcon = (column) => {
    const { sortColumn } = this.props;
    if (column.path !== sortColumn.path) return null;

    if (sortColumn.order === "asc") return <i className="fa fa-sort-asc"></i>;
    else return <i className="fa fa-sort-desc"></i>;
  };

  render() {
    return (
      <thead>
        <tr>
          {this.props.columns.map((column) => (
            <th
              className="clickable"
              key={column.path || column.key}
              scope="col"
              onClick={() => this.raiseSort(column.path)}
            >
              {column.name} {this.renderSortIcon(column)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
