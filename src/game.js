import React from 'react';
import './index.css';
import WordHistory from './wordhistory';

import Button from 'material-ui/Button';
import Input from 'material-ui/Input';
import Card, { CardActions } from 'material-ui/Card';

class TryCount extends React.Component {
    render() {
        return (<p className="try-count"> Try # {this.props.count}</p>);
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 1,
            inputLetters: [],
            wordHistory: [],
            solutionWord: "XXXX",
            wordSetFlag: false
        };
        this.solutionWord = "SOUL";
        this.wordSetFlag = false;
        this.submitWord = this.submitWord.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.calculateAnswer = this.calculateAnswer.bind(this);
    }

    chooseRandomSolutionWord() {
        if(this.state.wordSetFlag === false ){
            let options = ['LOVE', 'SOUL', 'OPAL', 'CASE', 'HATE', 'CARE', 'NAME', 'MAIN'];
            let chosenoption =  options[Math.floor(Math.random()*options.length)];
            this.setState ({solutionWord :  chosenoption});
            this.setState ({wordSetFlag : true});
        }
    }

    submitWord() {
        if (this.checkInvalidInput()) {
            let result = this.calculateAnswer();
            let wordSet = {
                'word': this.state.inputLetters,
                'result': result
            };
            this.setState({ count: this.state.count + 1 });
            this.state.wordHistory.unshift(wordSet);
            this.setState({ wordHistory: this.state.wordHistory });
            this.setState({ inputLetters: ['', '', '', ''] });  //TODO: generealize to word count
        }
    }

    handleChange(event) {
        let inputLetterssliced = this.state.inputLetters.slice(); //copy the array
        inputLetterssliced[event.target.id] = event.target.value.toUpperCase(); //execute the manipulations
        this.setState({ inputLetters: inputLetterssliced }) //set the new state
    }

    checkInvalidInput() {
        if (this.state.inputLetters.length < 4 || this.state.inputLetters.indexOf("") > -1)
            return false;
        return true;
    }

    calculateAnswer() {
        let word = this.state.inputLetters.map(letter => letter.toLocaleLowerCase());
        let solutionWord = this.state.solutionWord.toLocaleLowerCase().split("");
        let resultObject = { B: 0, C: 0 };
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

    renderInputWord() {
        let inputArray = [];
        for (let index = 0; index < 4; index++) {
            inputArray.push(<Input type="text" placeholder="Type" inputProps={{ maxLength: 1 }} value={this.state.inputLetters[index]} id={index} onChange={this.handleChange} />)
        }
        return (
            <div>{inputArray}</div>
        );
    }

    renderButtonCards() {
        return (
            <div>
                <CardActions className="buttonSet">
                    <Button id="submit-btn" color="primary" variant="raised" onClick={this.submitWord}>Submit</Button>
                    <Button color="secondary" variant="raised">Give Up</Button>
                </CardActions>
            </div>
        );
    }

    renderInputCard() {
        return (
            <Card className="game-card">
                {this.chooseRandomSolutionWord()}
                <p className="heading">MasterMind</p>
                <TryCount count={this.state.count} />
                {this.renderInputWord()}
                {this.renderButtonCards()}
            </Card>
        );
    }

    render() {
        //main render method for game
        return (
            <div className="game">
                <div className="center">
                    {this.renderInputCard()}
                    <WordHistory wordHistory={this.state.wordHistory} />
                </div>
            </div>
        );
    }
}


export default Game;