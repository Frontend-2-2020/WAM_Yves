import React, { Component } from "react";
import "../src/App.css";
import Score from "./components/Score";
import GameOver from "./components/GameOver";
import StartButton from "./components/StartButton";
import MoleHole from "./components/MoleHole";

class App extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      1: "translate(0, 110%)",
      2: "translate(0, 110%)",
      3: "translate(0, 110%)",
      4: "translate(0, 110%)",
      5: "translate(0, 110%)",
      6: "translate(0, 110%)",
      7: "translate(0, 110%)",
      8: "translate(0, 110%)",
      9: "translate(0, 110%)",

      gameStarted: false,
      moleHasBeenWhacked: false,
      score: 0,
      lastMole: "",
      display: "none",
      startText: "Start Whacking",
      gameOver: "none"
    };
  }

  timeOut() {
    if (this.state.gameStarted) {
      return;
    }
    this.setState({
      showButton: "none",
      display: "block",
      gameOver: "none"
    });

    this.setState({
      gameHasStarted: true,
      score: 0
    });

    let x = 0;
    const intervalID = setInterval(() => {
      this.showMoles();
      if (++x === 16) {
        window.clearInterval(intervalID);
        this.hideMoles();
        this.setState({ gameStarted: false });
        window.setTimeout(() => {
          this.setState({
            display: "none",
            gameOver: "block",
            startText: "Play again",
            showButton: "inline-block"
          });
        }, 850);
      }
    }, 750);
  }

  hideMoles() {
    for (let value in this.state) {
      if (!isNaN(value)) {
        this.setState({
          [value]: "translate(0, 110%)"
        });
      }
    }
  }

  showMoles() {
    let currentMole = Math.ceil(Math.random() * 9);
    if (this.state.lastMole[0] === currentMole) {
      this.showMoles();
      return;
    }
    this.hideMoles();
    this.setState({
      [currentMole]: "translate(0, 25%)",
      lastMole: [currentMole]
    });
  }

  missedHit() {
    window.setTimeout(() => {
      this.setState({ moleHasBeenWhacked: false });
    }, 250);
  }

  addToScore(e) {
    if (this.state.moleHasBeenWhacked) {
      return;
    }
    let target = e.target;
    target.parentNode.classList.add("whackingHammer");

    this.missedHit();
    this.setState({
      moleHasBeenWhacked: true,
      score: [parseInt(this.state.score, 10) + 1]
    });
    window.setTimeout(() => {
      target.parentNode.classList.remove("whackingHammer");
    }, 500);
  }

  createMoleHoles() {
    var holes = [];
    for (let i = 1; i <= 9; i++) {
      holes.push(
        <MoleHole
          key={i}
          context={this.state}
          onClick={this.addToScore.bind(this)}
          holeNumber={i}
        />
      );
    }
    return <div className="board">{holes}</div>;
  }

  render() {
    return (
      <div className="container">
        <div className="game">
          <h1 className="title">WHACK-A-MOLE</h1>
          <GameOver context={this} />
          <div ref={"gameOver"} className="game__button-container">
            <StartButton
              context={this.state}
              onClick={this.timeOut.bind(this)}
            />
          </div>
          {this.createMoleHoles()}
          <Score context={this.state} />
        </div>
      </div>
    );
  }
}

export default App;
