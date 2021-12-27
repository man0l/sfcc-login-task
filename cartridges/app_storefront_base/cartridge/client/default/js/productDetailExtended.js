'use strict';

var processInclude = require('./util');

$(document).ready(function () {
    processInclude(require('./product/detail'));
    console.log('test product detail');
});
