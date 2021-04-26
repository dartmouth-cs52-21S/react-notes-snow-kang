import './style.scss';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Map } from 'immutable';
import Note from './components/note';
import * as db from './services/datastore';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: new Map(),
      helpers: new Map(),
    };
  }

  componentDidMount() {
    db.fetchNotes((notes) => {
      this.setState({ notes: new Map(notes) });
    });

    db.fetchHelpers((helpers) => {
      this.setState({ helpers: new Map(helpers) });
    });
  }

  addNote = () => {
    // Cross browser solution to getting window width from w3schools
    const w = window.innerWidth
      || document.documentElement.clientWidth
      || document.body.clientWidth;

    const h = window.innerHeight
      || document.documentElement.clientHeight
      || document.body.clientHeight;

    // TODO: AUTHENTICATION , get user id using method in datastore

    const newNote = {
      title: document.getElementById('new-title').value || '',
      text: '',
      x: Math.floor(Math.random() * w * 0.3) + 20,
      y: Math.floor(Math.random() * h * 0.3) + 20,
      zIndex: -1,
    };

    db.addNote(newNote).then((ref) => {
      this.placeNoteOnTop(ref.key);
      document.getElementById('new-title').value = ''; // Reset title input bar after note creation
    });
  }

  deleteNote = (id) => {
    db.deleteNote(id).then(() => {
      // When there are no more notes, reset z-indices
      if (this.state.notes.size === 0) {
        db.deleteHelper('highestZIndex');
      }
    });
  }

  updateNote = (id, newNoteProperties) => {
    db.updateNote(id, newNoteProperties);
  };

  placeNoteOnTop = (id) => {
    const highestZIndex = this.state.helpers.get('highestZIndex');

    if (highestZIndex === undefined) {
      db.updateHelper({ highestZIndex: 0 });
      db.updateNote(id, { zIndex: 0 });
    } else if (this.state.notes.get(id).zIndex < highestZIndex) {
      const newHighest = highestZIndex + 1;
      db.updateHelper({ highestZIndex: newHighest });
      db.updateNote(id, { zIndex: newHighest });
    }
  }

  render() {
    return (
      <div className="container">
        <header>
          <h1 id="main-title">Snow&apos;s Notes</h1>
          <div className="notes-creator">
            <input type="text" id="new-title" />
            <input type="button" onClick={this.addNote} id="submit-note" value="Add note" />
          </div>
        </header>
        <div className="notes-boundary">
          {this.state.notes.entrySeq().map(([id, note]) => (
            <Note key={id}
              id={id}
              note={note}
              onDelete={this.deleteNote}
              onUpdateNote={this.updateNote}
              onUpdateZIndex={this.placeNoteOnTop}
            />
          ))}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('main'));
