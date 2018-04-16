import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class CharacterInput extends React.Component {
  render() {
    return (
      <input value={this.props.character} />
    );
  }
}

class WordInput extends React.Component {
  render() {
    var word = "LOVE";
    var indents = [];
    for (var i = 0; i < word.length; i++) {
      indents.push(<CharacterInput character = {word[i]} />);
    }
    return (
      <div>
        {indents}
      </div>
    );
  }
}

class WordHistory extends React.Component {
  render() {
    return (
      <div className="left">
          <div>
            <h1>able</h1>
            <h3>1b 1c</h3>
          </div>
          <div>
            <h1>pole</h1>
            <h3>2b 1c</h3>
          </div>
        </div>
    );
  }
}


class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <WordHistory />
        <div className="right">
          <h1>MasterMind</h1>
          <WordInput />
          <div className="buttonSet">
            <button>Next</button>
            <button>Give Up</button>
          </div>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
