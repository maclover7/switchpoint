var switchpoint = require('../index.js');
var server = switchpoint.createServer();

server.get('/', function(request, response) {
  console.log('route says hi!');
  response.end('hi');
});

server.listen(7000);
