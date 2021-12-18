'use strict';

var server = require('server');
var cache = require('*/cartridge/scripts/middleware/cache');

var starwarsService = require('*/cartridge/scripts/starwarsService');


server.get(
    'Starship', 
    function(req, res, next) {
        var ship = JSON.parse(starwarsService.getStarship());
        res.render('starship', {
            starship: ship
        });
        next();
    }
);

module.exports = server.exports();