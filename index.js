`use strict`;

var http = require('http');

var Switchpoint = {};

Switchpoint.Server = function(args) {
  this.routes = {};

  this.get = (path, fn) => {
    if (!this.routes['GET']) {
      this.routes['GET'] = [];
    }

    this.routes['GET'][path] = fn;
  };

  this.listen = (port, fn) => {
    if (fn) {
      fn.call();
    }

    var that = this;

    this.server = http.createServer((req, res) => {
      match = null;
      var applicableRoutes = that.routes[req.method];
      var r = Object.keys(applicableRoutes).filter((route, index) => {
        return (route === req.url.toString());
      });

      if (r.length > 0) {
        applicableRoutes[r[0]].call(null, req, res);
      }

      res.end();
    });

    this.server.listen(port, () => {
      console.log('Starting server on port ' + port);
    });
  };
};

Switchpoint.createServer = () => {
  return new Switchpoint.Server();
};

module.exports = Switchpoint;
