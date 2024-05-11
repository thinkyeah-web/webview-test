var http = require('http');
var auth = require('basic-auth');
var compare = require('tsscmp');

function check(name, pass) {
  let valid = true;
  valid = compare(name, 'admin') && valid;
  valid = compare(pass, '123456') && valid;
  return valid;
}

// Create server
var server = http.createServer(function (req, res) {
  var credentials = auth(req);
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5500');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Credentials', true);
  if (!credentials || !check(credentials.name, credentials.pass)) {
    res.statusCode = 401;
    res.setHeader('WWW-Authenticate', 'Basic realm="example"');
    res.end('Access denied');
  } else {
    res.end('Access granted');
  }
});

// Listen
server.listen(3000);
