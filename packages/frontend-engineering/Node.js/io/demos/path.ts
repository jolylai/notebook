import path from 'path';

const notes = '/users/joe/notes.txt';

const parse = path.parse(notes);
console.log('parse: ', parse);
