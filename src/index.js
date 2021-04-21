import './style.scss';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Map } from 'immutable';
import Note from './components/note';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: new Map({
        0: {
          title: 'testing',
          text: '![](http://i.giphy.com/gyRWkLSQVqlPi.gif)',
          x: 200,
          y: 12,
          zIndex: 10,
        },
        1: {
          title: 'headings',
          text: '# large ',
          x: 300,
          y: 300,
          zIndex: 20,
        },
      }),
      integerCounter: 0,
    };
  }

  addNote = (newNote) => {
    this.setState((prevState) => ({
      notes: prevState.notes.set(prevState.integerCounter, newNote),
      integerCounter: prevState.integerCounter + 1,
    }));
  }

  deleteNote = (id) => {
    this.setState((prevState) => ({
      notes: prevState.notes.delete(id),
    }));
  }

  updateNote = (id, newNoteProperties) => {
    this.setState((prevState) => ({
      notes: prevState.notes.update(id, (prevNote) => {
        return { ...prevNote, ...newNoteProperties };
      }),
    }));
  };

  render() {
    return (
      <div className="container">
        {this.state.notes.entrySeq().map(([id, note]) => (
          <Note key={id}
            id={id}
            note={note}
            onDelete={this.deleteNote}
            onUpdate={this.updateNote}
          />
        ))}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('main'));
