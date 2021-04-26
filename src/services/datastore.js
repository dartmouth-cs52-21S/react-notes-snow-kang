import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyDeqbSz-z6jecNDnD7UcUgQVzJd9FW1GIM',
  authDomain: 'snowxnote.firebaseapp.com',
  databaseURL: 'https://snowxnote-default-rtdb.firebaseio.com',
  projectId: 'snowxnote',
  storageBucket: 'snowxnote.appspot.com',
};
firebase.initializeApp(config);

// Get a reference to the database service
const database = firebase.database();
const provider = new firebase.auth.GoogleAuthProvider();

export function userLogin() {
  return firebase.auth().signInWithPopup(provider);
}

export function fetchNotes(callback) {
  database.ref('notes').on('value', (snapshot) => {
    const newNoteState = snapshot.val();
    callback(newNoteState);
  });
}

export function fetchHelpers(callback) {
  database.ref('helpers').on('value', (snapshot) => {
    const newHelpersState = snapshot.val();
    callback(newHelpersState);
  });
}

export function updateNote(id, newNoteProperties) {
  if ('zIndex' in newNoteProperties) {
    database.ref('notes').child(id).update({ zIndex: newNoteProperties.zIndex });
  } else {
    database.ref('notes').child(id).update(newNoteProperties);
  }
}

export function deleteNote(id) {
  return database.ref('notes').child(id).remove();
}

export function addNote(newNote) {
  return database.ref('notes').push(newNote);
}

export function updateHelper(newHelperProperties) {
  database.ref('helpers').update(newHelperProperties);
}

export function deleteHelper(helper) {
  database.ref('helpers').child(helper).remove();
}
