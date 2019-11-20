const chalk = require('chalk');
const shell = require('shelljs');

// execute a single shell command where "cmd" is a string
exports.exec = function(cmd, cb) {
  // this would be way easier on a shell/bash script :P
  let child_process = require('child_process');
  let parts = cmd.split(/\s+/g);
  let p = child_process.spawn(parts[0], parts.slice(1), {stdio: 'inherit'});
  p.on('exit', function(code) {
    let err = null;
    if (code) {
      err = new Error('command "'+ cmd +'" exited with wrong status code "'+ code +'"');
      err.code = code;
      err.cmd = cmd;
    }
    cb && cb(err);
  })
}

// execute multiple commands in series
// this could be replaced by any flow control lib
exports.series = function(cmds, cb) {
  function execNext() {
    let cmd = cmds.shift();
    console.log(chalk.blue('run command: ') + chalk.magenta(cmd));
    shell.exec(cmd, function(err) {
      if (err) {
        cb && cb(err);
      } else {
        if (cmds.length > 0) {
          execNext();
        } else {
          cb && cb(null);
        }
      }
    })
  }
  execNext();
}
