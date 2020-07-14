import React, { Component } from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";
class Table extends Component {
  render() {
    const { sortColumn, handleSort, columns, data } = this.props;
    return (
      <table className="table table-hover">
        <TableHeader
          sortColumn={sortColumn}
          handleSort={handleSort}
          columns={columns}
        />
        <TableBody data={data} columns={columns} />
      </table>
    );
  }
}

export default Table;