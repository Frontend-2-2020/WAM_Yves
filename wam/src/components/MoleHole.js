import React, { Component } from "react";

class MoleHole extends Component {
  render() {
    return (
      <div className="moleHole" style={{ display: this.props.context.display }}>
        <div className="game__whack">
          <div
            className={"molePopup"}
            onClick={this.props.onClick}
            style={{
              WebkitTransform: this.props.context[this.props.holeNumber]
            }}
          ></div>
          <div className="molePile"></div>
        </div>
      </div>
    );
  }
}

export default MoleHole;
