import React, { Component } from "react";

class Score extends Component {
  render() {
    return (
      <button
        className="start-button"
        type="button"
        onClick={this.props.onClick}
        style={{ display: this.props.context.showButton }}
      >
        {this.props.context.startText}
      </button>
    );
  }
}

export default Score;
