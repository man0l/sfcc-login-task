'use strict';

/**
 * @namespace Home
 */

var server = require('server');
var cache = require('*/cartridge/scripts/middleware/cache');
var consentTracking = require('*/cartridge/scripts/middleware/consentTracking');


/**
 * Any customization on this endpoint 2, also requires update for Default-Start endpoint
 */
/**
 * Home-Show : This endpoint is called when a shopper navigates to the home page
 * @name Base/Home-Show
 * @function
 * @memberof Home
 * @param {middleware} - consentTracking.consent
 * @param {middleware} - cache.applyDefaultCache
 * @param {category} - non-sensitive
 * @param {renders} - isml
 * @param {serverfunction} - get
 */
server.get('Show', consentTracking.consent, cache.applyDefaultCache, function (req, res, next) {
    res.render('telerik/show', { welcomeMsg: 'welcome msg' });
    next();
});

server.get('Include', server.middleware.include, function (req, res, next) {
    res.render('telerik/include');
    next();
});

server.get('List', function (req, res, next) {
    var ProductSearchModel = require('dw/catalog/ProductSearchModel');
    var results = new ProductSearchModel();
    var query = req.httpParameterMap.query;
    results.setSearchPhrase(query);
    results.search();
    res.render('telerik/list', { searchResults: results, query: query });
    next();
});

module.exports = server.exports();
