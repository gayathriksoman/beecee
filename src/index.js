import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import Button from 'material-ui/Button';
import Input from 'material-ui/Input';
import Paper from 'material-ui/Paper';
import Card, { CardActions } from 'material-ui/Card';


class TryCount extends React.Component {
  render (){
    return(<p className="try-count"> Try # {this.props.count}</p>);
  }
}

class WordHistory extends React.Component {
  render (){
    let words = [];
    if(this.props.wordHistory.length) {
      this.props.wordHistory.forEach((wordObject, index) => {
        if(wordObject['word'].length) {
          words.push(<Paper key={index} className="history-paper">
            <p>{wordObject['word']}</p>
            <p>B: {wordObject['result']['B']} C: {wordObject['result']['C']}</p>
          </Paper>);  
        }  
      })
      return (
        <div className="left">
          {words}
        </div>
      );
    }
    return (null);
  }
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
        <div className="right">
          <Card className="game-card">
            <p className="heading">MasterMind</p>
            <TryCount count = {this.state.count}/>
            <Input type="text" placeholder="Type" inputProps={{maxLength: 1}} value={this.state.inputLetters[0]} id='0' onChange={this.handleChange} />
            <Input type="text" placeholder="your" inputProps={{maxLength: 1}} value={this.state.inputLetters[1]} id='1' onChange={this.handleChange} />
            <Input type="text" placeholder="answer" inputProps={{maxLength: 1}} value={this.state.inputLetters[2]} id='2' onChange={this.handleChange} />
            <Input type="text" placeholder="here" inputProps={{maxLength: 1}} value={this.state.inputLetters[3]} id='3' onChange={this.handleChange} />
            <CardActions className="buttonSet">
              <Button id="submit-btn" color="primary"  variant="raised" onClick={this.submitWord}>Submit</Button>
              <Button color="secondary"  variant="raised">Give Up</Button>
            </CardActions>
          </Card>
          <WordHistory wordHistory = {this.state.wordHistory}/>
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
