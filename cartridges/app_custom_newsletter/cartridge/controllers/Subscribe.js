'use strict';

var server = require('server');
var UUIDUtils = require('dw/util/UUIDUtils');
var Transaction = require('dw/system/Transaction');
var CustomObjectMgr = require('dw/object/CustomObjectMgr');

server.get(
    'Create',
    server.middleware.https,
    function (req, res, next) {
      var form = req.form;
      var error = false;

      if (!form) {
        error = true;
      }

      var type = 'NewsletterSubscription';
      var keyValue = UUIDUtils.createUUID();

      try {
        Transaction.wrap(function() {
          var newsletter = CustomObjectMgr.createCustomObject(type, keyValue);
          newsletter.custom.name = form.name;
          newsletter.custom.email = form.email;
        });
      } catch (error) {
        error = true;
      }

      if (error) {
        res.json({
          error: true
        });
      } else {
        res.json({
          error: false,
          id: keyValue
        });
      }

      next();
    }
);

server.get(
    'Delete',
    function (req, res, next) {
      var form = req.form;
      var error = false;
      var type = 'NewsletterSubscription';
      var keyValue = form.id;
      if (!form) {
        error = true;
      }

      try {
        var newsletter = CustomObjectMgr.getCustomObject(type, keyValue);
        Transaction.wrap(function() {
            CustomObjectMgr.remove(newsletter);
        });
       
      } catch(error) {
          error = true;
      }

      if (error) {
        res.json({
          error: true
        });
      } else {
        res.json({
          error: false,
          id: keyValue
        });
      }
      
      next();
    }
);

module.exports = server.exports();