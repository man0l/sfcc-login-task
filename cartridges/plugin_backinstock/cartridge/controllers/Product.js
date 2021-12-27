'use strict';

/**
 * @namespace Product
 */

 var server = require('server');


 var cache = require('*/cartridge/scripts/middleware/cache');
 var consentTracking = require('*/cartridge/scripts/middleware/consentTracking');
 var pageMetaData = require('*/cartridge/scripts/middleware/pageMetaData');

 server.extend(module.superModule);
 server.append('Show', function(req, res, next) {
    
    next();
 });

 module.exports = server.exports();