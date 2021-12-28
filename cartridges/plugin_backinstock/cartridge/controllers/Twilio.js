'use strict';

/**
 * @namespace Product
 */

 var server = require('server');
 var Resource = require('dw/web/Resource');

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
         (form && form.email === undefined)
        ) {
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