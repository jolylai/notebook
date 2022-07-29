const { access, constants } = require('fs');

const file = 'package.json';

access(file, err => {
  if (err) {
    console.log(`${file} does not exist`);
    return;
  }

  console.log(`${file} exists`);
});

access(file, err => {
  if (err) {
    console.log(`${file} does not exist`);
    return;
  }

  console.log(`${file} exists`);
});

// Check if the file exists in the current directory.
access(file, constants.F_OK, err => {
  console.log(`${file} ${err ? 'does not exist' : 'exists'}`);
});

// Check if the file is readable.
access(file, constants.R_OK, err => {
  console.log(`${file} ${err ? 'is not readable' : 'is readable'}`);
});

// Check if the file is writable.
access(file, constants.W_OK, err => {
  console.log(`${file} ${err ? 'is not writable' : 'is writable'}`);
});

// Check if the file exists in the current directory, and if it is writable.
access(file, constants.F_OK | constants.W_OK, err => {
  if (err) {
    console.error(
      `${file} ${err.code === 'ENOENT' ? 'does not exist' : 'is read-only'}`,
    );
  } else {
    console.log(`${file} exists, and it is writable`);
  }
});
