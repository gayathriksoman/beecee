import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class TryCount extends React.Component {
  render (){
    return(<h2> Try # {this.props.count}</h2>);
  }
}

function WordHistory(props){
  var words = [];
  if(props.wordHistory.length) {
    props.wordHistory.forEach((wordObject, index) => {
      if(wordObject['word'].length) {
        words.push(<div key={index}>
          <p>{wordObject['word']}</p>
          <p>B: {wordObject['result']['B']} C: {wordObject['result']['C']}</p>
        </div>);  
      }  
    })
  }
  return (
    <div className="left">
      {words}
    </div>
  );
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count : 1,
      inputLetters : [],
      wordHistory : [],
      solutionWord : "LOVE"
    };
    this.submitWord = this.submitWord.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.calculateAnswer = this.calculateAnswer.bind(this);
  }



  submitWord() {
    if(this.checkInvalidInput()) {
      let result = this.calculateAnswer();
      let wordSet = { 
        'word': this.state.inputLetters, 
        'result': result
      };
      this.setState({count: this.state.count+1});
      this.state.wordHistory.push(wordSet);
      this.setState({wordHistory:this.state.wordHistory});
      this.setState({inputLetters:['','','','']});  //TODO: generealize to word count
    }
  }

  handleChange(event) {
    let inputLetterssliced = this.state.inputLetters.slice(); //copy the array
    inputLetterssliced[event.target.id] = event.target.value; //execute the manipulations
    this.setState({inputLetters: inputLetterssliced}) //set the new state
  }

  checkInvalidInput() {
    if(this.state.inputLetters.length < 4 || this.state.inputLetters.indexOf("")>-1)
      return false;
    return true;
  }

  calculateAnswer() {
    let word = this.state.inputLetters.map(letter => letter.toLocaleLowerCase());
    let solutionWord = this.state.solutionWord.toLocaleLowerCase().split("");
    let resultObject = { B : 0, C : 0 };
    solutionWord.forEach(letter => {
      if (word.indexOf(letter) === -1) {
        //do nothing
      }
      else if (word.indexOf(letter) === solutionWord.indexOf(letter)) {
        resultObject.B++;
      }
      else {
        resultObject.C++;
      }
    });
    return resultObject;
  }

  render() {
    return (
      <div className="game">
        <WordHistory wordHistory = {this.state.wordHistory}/>
        <div className="right">
          <h1>MasterMind</h1>
          <TryCount count = {this.state.count}/>
          <input type="text" value={this.state.inputLetters[0]} id={0} onChange={this.handleChange} />
          <input type="text" value={this.state.inputLetters[1]} id={1} onChange={this.handleChange} />
          <input type="text" value={this.state.inputLetters[2]} id={2} onChange={this.handleChange} />
          <input type="text" value={this.state.inputLetters[3]} id={3} onChange={this.handleChange} />
          <div className="buttonSet">
            <button id="submit-btn" onClick={this.submitWord}>Submit</button>
            <button>Give Up</button>
          </div>
        </div>
      </div>
    );
  }
}

// ============================================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
