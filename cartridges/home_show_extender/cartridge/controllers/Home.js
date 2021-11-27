'use strict';

var server = require('server');
var HookMgr = require('dw/system/HookMgr');

server.extend(module.superModule);

server.append('Show', function (req, res, next) {
    var viewData = res.getViewData();
    viewData.customjson = { test: 1 };
    if (HookMgr.hasHook('app.home_show_extender')) {
        viewData = HookMgr.callHook('app.home_show_extender', 'modifyRequest', viewData);
    }
    res.setViewData(viewData);
    next();
});

module.exports = server.exports();
