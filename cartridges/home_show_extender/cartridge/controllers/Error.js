'use strict';

server.extend(module.superModule);

server.get('Show', function(res, req, next) {
    console.log(res);
});

module.exports = server.exports();
