import React from 'react';
import './index.css';

import Paper from 'material-ui/Paper';

class WordHistory extends React.Component {
    render() {
        let words = [];
        if (this.props.wordHistory.length) {
            this.props.wordHistory.forEach((wordObject, index) => {
                if (wordObject['word'].length) {
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

export default WordHistory;