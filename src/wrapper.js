var RingCentral = require('ringcentral-js-concise').default
const RC_URLS = {
    SMS: '/restapi/v1.0/account/~/extension/~/sms',
    MESSAGE_LIST: '/restapi/v1.0/account/~/extension/~/message-store',
    RING_OUT: '/restapi/v1.0/account/~/extension/~/ring-out',
};

// FIXME: need a standard method for passing in the account and extension id path parameters
// FIXME: come up with a standard way to force request input to conform to RingCentral verbose version. 

/*
 * This method changes in the request options structure to simplify it. 
 */
RingCentral.prototype.sendSMS = function ( params ) {
    // FIXME: throw an error if text exceeds 1000 characters
    // FIXME: allow "to" to be an array, FIXED: can now accept complex input using default structure
    // FIXME: default the from parameter to the current logged in user?
    // FIXME: do not modify array, create a copy
    if ( typeof params.sender === 'string' ) {
	params.from = { phoneNumber: params.sender }
	delete params.sender
    }
    if ( typeof params.receiver === 'string' ) {
	params.to = [{ phoneNumber: params.receiver }]
	delete params.receiver
    }
    return this.post( RC_URLS.SMS, params )
}
/*
 * This method accepts the default request parameter struct.
 */
RingCentral.prototype.getMessageList = function ( params ) {
    return this.get( RC_URLS.MESSAGE_LIST, params )
}
RingCentral.prototype.ringOut = function ( params ) {
    // FIXME: do not modify array, create a copy
    if ( typeof params.caller === 'string' ) {
	params.from = { phoneNumber: params.caller }
	delete params.caller
    }
    if ( typeof params.receiver === 'string' ) {
	params.to = { phoneNumber: params.receiver }
	delete params.receiver
    }
    // this forces the callerId into the proper syntax
    // FIXME: do this for from/to as well, rather than using different parameter names
    if ( typeof params.callerId === 'string' ) {
	params.callerId = { phoneNumber: params.callerId }
	delete params.callerId
    }
    console.log( "Request params: " + JSON.stringify( params, null, 4 ) );
    return this.post( RC_URLS.RING_OUT, params );
}
module.exports.RingCentral = RingCentral
