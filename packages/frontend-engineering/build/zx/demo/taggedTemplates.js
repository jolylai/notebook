const { exec } = require('child_process');

function $(pieces, ...args) {
  console.log('pieces: ', pieces);
  console.log('args: ', args);
  let cmd = pieces[0];

  const child = exec(cmd, {});

  child.stdout.pipe(process.stdout);
  child.stderr.pipe(process.stderr);

  child.on('exit', code => {});
}

$`ls`;
