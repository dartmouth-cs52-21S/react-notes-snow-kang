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
          y: 0,
          zIndex: 30,
        },
        1: {
          title: 'headings',
          text: '# large ',
          x: 300,
          y: 300,
          zIndex: 20,
        },
      }),
      integerCounter: 2,
      highestZIndex: 30,
    };
  }

  addNote = () => {
    this.setState((prevState) => ({
      notes: prevState.notes.set(prevState.integerCounter, {
        title: '',
        text: '',
        x: 100,
        y: 100,
        zIndex: prevState.highestZIndex + 1,
      }),
      integerCounter: prevState.integerCounter + 1,
      highestZIndex: prevState.highestZIndex + 1,
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

  makeHighestZIndex = (id) => {
    if (this.state.notes.get(id).zIndex < this.state.highestZIndex) {
      const newHighest = this.state.highestZIndex + 1;
      this.setState((prevState) => ({
        notes: prevState.notes.update(id, (prevNote) => {
          return { ...prevNote, ...{ zIndex: newHighest } };
        }),
        highestZIndex: newHighest,
      }));
    }
  }

  render() {
    return (
      <div className="container">
        <input type="text" id="title" value={this.state.newTitle} onChange={this.updateTitle} />
        <input type="button" onClick={this.addNote} id="submit-note" value="Add note" />
        {this.state.notes.entrySeq().map(([id, note]) => (
          <Note key={id}
            id={id}
            note={note}
            onDelete={this.deleteNote}
            onUpdateNote={this.updateNote}
            onUpdateZIndex={this.makeHighestZIndex}
          />
        ))}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('main'));
