'use strict';
var LocalServiceRegistry = require('dw/svc/LocalServiceRegistry');
function getStarship()
{

    var getStarwarsService = LocalServiceRegistry.createService('app_custom_starwars.http.starwars.getStarship', {
        createRequest: function(svc, args) {
            svc.setRequestMethod('GET');
            return args;
        },
        parseResponse: function(svc, client) {
            return client.text;
        }
    });

    var response = getStarwarsService.call().object;
    return response;
}


module.exports = {
    getStarship: getStarship
};
