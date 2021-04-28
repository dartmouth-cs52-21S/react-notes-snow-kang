import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyDeqbSz-z6jecNDnD7UcUgQVzJd9FW1GIM',
  authDomain: 'snowxnote.firebaseapp.com',
  databaseURL: 'https://snowxnote-default-rtdb.firebaseio.com',
  projectId: 'snowxnote',
  storageBucket: 'snowxnote.appspot.com',
};
firebase.initializeApp(config);

const database = firebase.database();
const provider = new firebase.auth.GoogleAuthProvider();

export const auth = firebase.auth();

export function userLogin() {
  return auth.signInWithPopup(provider);
}

export function userLogout() {
  return auth.signOut();
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

export function fetchUsers(callback) {
  database.ref('users').on('value', (snapshot) => {
    const newUsersState = snapshot.val();
    callback(newUsersState);
  });
}

export function updateNote(id, newNoteProperties) {
  if ('zIndex' in newNoteProperties) {
    database.ref('notes').child(id).update({ zIndex: newNoteProperties.zIndex });
  } else {
    database.ref('notes').child(id).update(newNoteProperties);
  }
}

export function addNote(newNote) {
  return database.ref('notes').push(newNote);
}

export function deleteNote(id) {
  return database.ref('notes').child(id).remove();
}

export function updateHelper(newHelperProperties) {
  database.ref('helpers').update(newHelperProperties);
}

export function deleteHelper(helper) {
  database.ref('helpers').child(helper).remove();
}
export function addUser(newUser) {
  return database.ref('users').push(newUser);
}

export function updateUser(id, newUserProperties) {
  database.ref('users').child(id).update(newUserProperties);
}

export function deleteUser(id) {
  console.log(id);
  return database.ref('users').child(id).remove();
}
