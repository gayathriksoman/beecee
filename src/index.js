import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class CharacterInput extends React.Component {
  render() {
    return (
      <input value={'L'} />
    );
  }
}

class WordInput extends React.Component {
  render() {
    var word = "LOVE";
    var indents = [];
    for (var i = 0; i < word.length; i++) {
      indents.push(<input value={word[i]} />);
    }
    return (
      <div>
        {indents}
      </div>
    );
  }
}


class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="left">
          <div>
            <h1>able</h1>
            <h1>1b 1c</h1>
          </div>
          <div>
            <h1>pole</h1>
            <h1>2b 1c</h1>
          </div>
        </div>
        <div className="right">
          <h1>Welcome</h1>
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
