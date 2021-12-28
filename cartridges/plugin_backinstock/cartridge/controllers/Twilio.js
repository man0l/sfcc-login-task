'use strict';

/**
 * @namespace Product
 */

 var server = require('server');
 var Resource = require('dw/web/Resource');
 var Transaction = require('dw/system/Transaction');
 var CustomObjectMgr = require('dw/object/CustomObjectMgr');
/**
 * Twilio-Subscribe : The endpoint when the user subscribes to recieve notifications for back in stock
 * @name Twilio-Subscribe
 * @function
 * @memberof Twilio
 * @param {middleware} - server.middleware.https
 * @param {httpparameter} - phone - Input field, the shopper's phone number
 * @param {returns} - json
 * @param {serverfunction} - post
 */
 server.post('Subscribe', server.middleware.https, function (req, res, next) {
    
     var form = req.form;

     if (
         !form ||
         (form && form.phone === undefined) ||
         (form && form.productId === undefined)
        ) {
        res.json({
            success: false,
            msg: Resource.msg('msg.form.error', 'backinstock', null)
        });
        return next();
    }

    var productId = form.productId;
    
    try {
        Transaction.wrap(function () {
            var entity = CustomObjectMgr.getCustomObject('NotifyMeBackInStock', productId);
            if (!entity) {
                var entity = CustomObjectMgr.createCustomObject('NotifyMeBackInStock', productId);
            }
            
            if (entity.custom.phoneNumbers) {
                if (entity.custom.phoneNumbers.indexOf(form.phone) === -1) {
                    entity.custom.phoneNumbers += form.phone + ',';
                }
            } else {
                entity.custom.phoneNumbers = form.phone + ',';
            }
            
        });
    } catch(e) {
        res.json({
            success: false,
            msg: Resource.msg('msg.form.error', 'backinstock', null)
        });
        return next();
    }
    

    // res.json({
    //     success: false,
    //     msg: Resource.msg('msg.form.error', 'backinstock', null)
    //  });

    res.json({
       success: true,
       msg: Resource.msg('msg.form.success', 'backinstock', null)
    });
    next();
 });

 module.exports = server.exports();