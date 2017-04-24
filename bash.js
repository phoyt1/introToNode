var commands = require('./commands.js')

var done = function(output){
  // Show output and prompt
  // Command functions create output string, then call done when completed
  process.stdout.write(output);
  process.stdout.write("prompt > ");
}

// Output a prompt
process.stdout.write('prompt > ');

// The stdin 'data' event fires after a user types in a line
process.stdin.on('data', function (data) {
  // var cmd = data.toString().trim(); // remove the newline

  var cmdString = data.toString().trim(); // remove the newline
  var cmdList = cmdString.split(/\s*\|\s*/g); // any amount of whitespace, pipe, any amount of whitespace

  var args = cmdString.split(' ').slice(1);
  cmd = cmd.split(' ')[0];
  if(cmd === 'pwd'){
    commands.pwd(null,done);
  }
  if(cmd === 'date'){
    var datetime = new Date();
    process.stdout.write(datetime.toString());
    process.stdout.write('\nprompt > ');
  }

  if(cmd === 'ls'){
    commands.ls(null,done);
  }

  if(cmd === 'echo'){
    commands.echo(null, args.join(' '), done);
  }

  if(cmd === 'cat'){
    commands.cat(args.join(' '),done);
  }

  if(cmd === 'head'){
    commands.head(args[0],args[1],done);
  }

   if(cmd === 'tail'){
    commands.tail(args[0],args[1],done);
  }

  if(cmd === 'curl'){
    commands.curl(args.join(),done);
  }
});
