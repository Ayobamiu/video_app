import React, { Component } from "react";

class ListGroup extends Component {
  render() {
    const {
      items,
      onItemSelect,
      textProperty,
      valueProperty,
      selectedItem,
    } = this.props;
    return (
      <div>
        <ul className="list-group sm" style={{ color: "black" }}>
          {items.map((item) => (
            <button
              key={item[valueProperty]}
              onClick={() => onItemSelect(item)}
              className={
                item === selectedItem
                  ? "list-group-item active"
                  : "list-group-item"
              }
            >
              {item[textProperty]}
            </button>
          ))}
        </ul>
      </div>
    );
  }
}

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};

export default ListGroup;
