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
      newTitle: '',
    };
  }

  updateTitle = (event) => {
    this.setState({ newTitle: event.target.value });
  }

  addNote = () => {
    this.setState((prevState) => ({
      notes: prevState.notes.set(prevState.integerCounter, {
        title: prevState.newTitle,
        text: '',
        x: 100,
        y: 100,
        zIndex: 20,
      }),
      integerCounter: prevState.integerCounter + 1,
      newTitle: '',
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
        <input type="text" id="title" value={this.state.newTitle} onChange={this.updateTitle} />
        <input type="button" onClick={this.addNote} id="submit-note" value="Add note" />
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
