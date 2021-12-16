'use strict';

/**
 * @namespace Account
 */

var server = require('server');

var csrfProtection = require('*/cartridge/scripts/middleware/csrf');
var userLoggedIn = require('*/cartridge/scripts/middleware/userLoggedIn');
var consentTracking = require('*/cartridge/scripts/middleware/consentTracking');

/**
 * Checks if the email value entered is correct format
 * @param {string} email - email string to check if valid
 * @returns {boolean} Whether email is valid
 */
function validateEmail(email) {
    var regex = /^[\w.%+-]+@[\w.-]+\.[\w]{2,6}$/;
    return regex.test(email);
}


/**
 * Account-EditProfile : The Account-EditProfile endpoint renders the page that allows a shopper to edit their profile. The edit profile form is prefilled with the shopper's first name, last name, phone number and email
 * @name Base/Account-EditProfile
 * @function
 * @memberof Account
 * @param {middleware} - server.middleware.https
 * @param {middleware} - csrfProtection.generateToken
 * @param {middleware} - userLoggedIn.validateLoggedIn
 * @param {middleware} - consentTracking.consent
 * @param {category} - sensitive
 * @param {renders} - isml
 * @param {serverfunction} - get
 */
server.get(
    'Show',
    server.middleware.https,
    csrfProtection.generateToken,
    consentTracking.consent,
    function (req, res, next) {
        var newsletterForm = server.forms.getForm('newsletter');
        newsletterForm.clear();

        res.render('account/newsletter', {
            newsletterForm: newsletterForm
        });
        next();
    }
);

/**
 * Account-EditProfile : The Account-EditProfile endpoint renders the page that allows a shopper to edit their profile. The edit profile form is prefilled with the shopper's first name, last name, phone number and email
 * @name Base/Account-EditProfile
 * @function
 * @memberof Account
 * @param {middleware} - server.middleware.https
 * @param {middleware} - csrfProtection.generateToken
 * @param {middleware} - userLoggedIn.validateLoggedIn
 * @param {middleware} - consentTracking.consent
 * @param {category} - sensitive
 * @param {renders} - isml
 * @param {serverfunction} - get
 */
 server.get(
    'Save',
    server.middleware.https,
    csrfProtection.validateAjaxRequest,
    function (req, res, next) {
        var CustomObjectMgr = require('dw/object/CustomObjectMgr');
        var Resource = require('dw/web/Resource');
        var Transaction = require('dw/system/Transaction');
        var newsletterForm = server.forms.getForm('newsletter');
        var URLUtils = require('dw/web/URLUtils');
        // todo create NEWSLETTER_SUBSCRIPTION custom object in the business manager
        var NEWSLETTER_SUBS_CO = 'NEWSLETTER_SUBSCRIPTION';
        // check if there is already such an email address in the DB
        var newsletterResult = CustomObjectMgr.getCustomObject(NEWSLETTER_SUBS_CO, newsletterForm.email.value);
        if (!empty(newsletterResult)) {
            newsletterForm.valid = false;
            newsletterForm.email.valid = false;
            newsletterForm.error = Resource.msg('error.message.not.unique', 'forms');
        }
        if (newsletterForm.valid) {
            Transaction.wrap(function () {
                var newsletterEntry = CustomObjectMgr.createCustomObject(NEWSLETTER_SUBS_CO, newsletterForm.email.value);
                newsletterEntry.name = newsletterForm.fullname.value;
                newsletterEntry.skinType = newsletterForm.skinType.value;
            });
        }

        res.json({
            success: true,
            redirectUrl: URLUtils.url('Newsletter-Show').toString()
        });
        
        next();
    }
);

module.exports = server.exports();
