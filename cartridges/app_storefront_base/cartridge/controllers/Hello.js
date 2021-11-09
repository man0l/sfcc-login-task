'use strict';
/**
 * @namespace Hello
 */
var server = require('server');

var consentTracking = require('*/cartridge/scripts/middleware/consentTracking');
var pageMetaData = require('*/cartridge/scripts/middleware/pageMetaData');

/**
 * Any customization on this endpoint 2, also requires update for Default-Start endpoint
 */
/**
 * Home-Show : This endpoint is called when a shopper navigates to the home page
 * @name Base/Hello-World
 * @function
 * @memberof Hello
 * @param {middleware} - consentTracking.consent
 * @param {middleware} - cache.applyDefaultCache
 * @param {category} - non-sensitive
 * @param {renders} - isml
 * @param {serverfunction} - get
 */
server.get('World', consentTracking, pageMetaData, function (req, res, next) {
    res.json({ msg: 'Hello World' });
    return next();
});

module.exports = server.exports();
