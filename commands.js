//var done = require('./bash.js');
var request = require('request');
var fs = require('fs');

exports.pwd = function(stdin, arg,done){
  var output = process.env.PWD + '\n';
  done(output);
}

exports.ls = function(stdin, arg,done){
  var output = "";
  fs.readdir('.', function(err, files) {
  if (err) throw err;
  files.forEach(function(file) {
    output += file.toString() + "\n";
  })
  done(output);
});
}

exports.echo = function(stdin, arg, done){
  var output = arg + '\n';
  done(output);
}

exports.cat = function(stdin, file,done){
  var output = "";
  fs.readFile(file, (err, data) => {
  if (err) throw err;
    output += data;
    done(output);
  });

}
exports.head = function(stdin, file, num, done){
  var input = "";
  var output = "";

  if(stdin && !file) {
    // Use piped input if it's the only option provided
    input = stdin;
  }
  else {
    // Always use file, if possible
    input = file;
  }

  fs.readFile(input, (err, data) => {
    if (err) throw err;

    var fileLines = data.toString().split('\n');
    var limit = num || 5;
    for(var i=0;i<limit && i<fileLines.length;i++){
      output += fileLines[i]+'\n';
    }
    done(output);
  });
}

exports.tail = function(stdin, file,num,done){
  var output = "";
  fs.readFile(file, (err, data) => {
    if (err) throw err;
    //process.stdout.write(data);
    var fileLines = data.toString().split('\n');
    var limit = num || 5;
    for(var i=fileLines.length-limit;i<fileLines.length;i++){
      output += fileLines[i]+'\n';
    }
    done(output);
  });
}

exports.curl = function(stdin, url,done){
  var output = "";
  request(url, function(err, response, body) {
    if(err) {
      throw err;
    }
    output += body + '\n';
    done(output);
  })
}
