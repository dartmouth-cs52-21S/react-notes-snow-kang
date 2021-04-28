import './style.scss';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Map } from 'immutable';
import Note from './components/note';
import * as db from './services/datastore';

const polarheader = require('./img/polarheader.png');
const pandaheader = require('./img/pandaheader.png');
const catheader = require('./img/catheader.png');
const logo = require('./img/logo.png');
const backdrop = require('./img/backdrop.jpg');
const flowers = require('./img/flowers.png');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: new Map(),
      helpers: new Map(),
      loggedInUser: 'anonymous',
      currentAnimalHeader: 'polar',
    };
  }

  componentDidMount() {
    db.fetchNotes((notes) => {
      this.setState({ notes: new Map(notes) });
    });

    db.fetchHelpers((helpers) => {
      this.setState({ helpers: new Map(helpers) });
    });

    // check if user is already signed in upon page load
    db.auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedInUser: user.displayName });
      }
    });
  }

  googleSignInAndOut = () => {
    if (this.state.loggedInUser !== 'anonymous') {
      db.userLogout().then(() => {
        this.state.loggedInUser = 'anonymous';
        document.getElementById('logged-in-status').innerHTML = 'Currently posting as anonymous';
        document.getElementById('google-prompt').value = 'Click to sign in!';
      }).catch((err) => console.log(err));
    } else {
      db.userLogin().then((result) => {
        const { displayName } = result.user;
        this.state.loggedInUser = displayName;
        document.getElementById('logged-in-status').innerHTML = `Hello, ${displayName}!`;
        document.getElementById('google-prompt').value = 'Sign out';
      }).catch((err) => { console.log(err); });
    }
  }

  addNote = () => {
    // Cross browser solution to getting window dimensions from w3schools
    const w = window.innerWidth
      || document.documentElement.clientWidth
      || document.body.clientWidth;

    const h = window.innerHeight
      || document.documentElement.clientHeight
      || document.body.clientHeight;

    const newNote = {
      title: document.getElementById('new-title').value || '',
      text: '',
      x: Math.floor(Math.random() * w * 0.3) + 20,
      y: Math.floor(Math.random() * h * 0.3) + 20,
      zIndex: -1,
      createdBy: this.state.loggedInUser,
      animalHeader: this.state.currentAnimalHeader,
      collapsed: false,
    };

    db.addNote(newNote).then((ref) => {
      this.placeNoteOnTop(ref.key);
      document.getElementById('new-title').value = ''; // Reset title input bar after note creation
    }).catch((err) => { console.log(err); });
  }

  deleteNote = (id) => {
    db.deleteNote(id).then(() => {
      // When there are no more notes, reset z-indices
      if (this.state.notes.size === 0) {
        db.deleteHelper('highestZIndex');
      }
    }).catch((err) => { console.log(err); });
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

  updateAnimalHeader = (newAnimalHeader) => {
    this.state.currentAnimalHeader = newAnimalHeader;
  }

  render() {
    let msg;
    if (this.state.loggedInUser === 'anonymous') {
      msg = 'Currently posting as anonymous';
    } else {
      msg = `Hello, ${this.state.loggedInUser}!`;
    }
    return (
      <div className="container">
        <img id="backdrop" src={backdrop} alt="Cloud background" />
        <header>
          <div id="logged-in-status">{(msg)}</div>
          <input type="button"
            id="google-prompt"
            onClick={this.googleSignInAndOut}
            value={this.state.loggedInUser === 'anonymous'
              ? 'Click to sign in!'
              : 'Sign out'}
          />
        </header>

        <div id="main">
          <div className="input-card">
            <img src={flowers} alt="Flower border" id="flowers" />
            <img src={logo} alt="Snow's Notes Logo" id="logo" />
            <i className="far fa-heart" />
            <p>✨manifest✨</p>
            <p>your wildest dreams!</p>
            <div className="animal-headers">
              <label htmlFor="polar">
                <input type="radio" name="animal-header" onClick={() => this.updateAnimalHeader('polar')} value="polar" id="polar" defaultChecked />
                <img src={polarheader} alt="Polar bear header" />
              </label>
              <label htmlFor="panda">
                <input type="radio" name="animal-header" onClick={() => this.updateAnimalHeader('panda')} value="panda" id="panda" />
                <img src={pandaheader} alt="Panda bear header" />
              </label>
              <label htmlFor="cat">
                <input type="radio" name="animal-header" onClick={() => this.updateAnimalHeader('cat')} value="cat" id="cat" />
                <img src={catheader} alt="Cat bear header" />
              </label>
            </div>
            <div className="notes-creator">
              <input type="text" id="new-title" placeholder="Input title here!" />
              <input type="button" onClick={this.addNote} id="submit-note" value="Add note" />
            </div>
          </div>

          <div id="notes-boundary">
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
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('main'));
