'use strict';

module.exports = {
    modifyRequest: function (viewData) {
        // eslint-disable-next-line no-param-reassign
        viewData.newproperty = 'newvalue';
        return viewData;
    }
};
