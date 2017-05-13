'use strict';

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var hostname = '127.0.0.1';
var port = 8080;

var server = _http2.default.createServer(function (req, res) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World\n');
});

server.listen(port, hostname, function () {
    console.log('Server running at http://' + hostname + ':' + port + '/');
});