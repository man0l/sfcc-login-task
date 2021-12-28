'use strict';

/**
 * @namespace Product
 */

 var server = require('server');


 var cache = require('*/cartridge/scripts/middleware/cache');
 var consentTracking = require('*/cartridge/scripts/middleware/consentTracking');
 var pageMetaData = require('*/cartridge/scripts/middleware/pageMetaData');
 var ContentMgr = require('dw/content/ContentMgr');

 server.extend(module.superModule);
 server.append('Show', function(req, res, next) {
   var backInStockContentAsset =  ContentMgr.getContent('back-in-stock-modal-title');
   
   var viewData = res.getViewData();
   viewData.backInStockContentAsset = backInStockContentAsset;
   res.setViewData(viewData);
    next();
 });


/**
 * Product-BackInStockForm : The endpoint when the user subscribes to recieve notifications for back in stock
 * @name Product-BackInStockForm
 * @function
 * @memberof Product
 * @param {middleware} - server.middleware.https
 * @param {httpparameter} - phone - Input field, the shopper's phone number
 * @param {returns} - json
 * @param {serverfunction} - post
 */
 server.post('BackInStockForm', server.middleware.https, function (req, res, next) {
    
    res.json({
       success: true      
    })
    next();
 })

 module.exports = server.exports();