var RingCentral = require('ringcentral-js-concise').default

// FIXME: need a standard method for passing in the account and extension id path parameters
const RC_URLS = {
    SMS:          "/restapi/v1.0/account/~/extension/~/sms",
    MESSAGE_LIST: "/restapi/v1.0/account/~/extension/~/message-store",
    RING_OUT:     "/restapi/v1.0/account/~/extension/~/ring-out",
//    SMS:          `/restapi/v1.0/account/${account}/extension/${extension}/sms`,
//    MESSAGE_LIST: `/restapi/v1.0/account/${account}/extension/${extension}/message-store`,
//    RING_OUT:     `/restapi/v1.0/account/${account}/extension/${extension}/ring-out`,
};

// FIXME: come up with a standard way to force request input to conform to RingCentral verbose version. 

function generate_rc_uri( uri, params ) {
    // FIXME: currently doesn't do anything except remove account and extension for input params
    // FIXME: use js templates to insert value or use default '~'
    if ( typeof params.accountId === 'string' ) {
	delete params.accountId
    }
    if ( typeof params.extension === 'string' ) {
	delete params.extension
    }
    return uri
}

/*
 * This method changes in the request options structure to simplify it. 
 */
RingCentral.prototype.sendSMS = function ( params ) {
    let URI = generate_rc_uri( RC_URLS.SMS, params );
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
    return this.post( URI, params )
}
/*
 * This method accepts the default request parameter struct.
 */
RingCentral.prototype.getMessageList = function ( params ) {
    let URI = generate_rc_uri( RC_URLS.MESSAGE_LIST, params );
    return this.get( URI, params )
}
RingCentral.prototype.ringOut = function ( params ) {
    let URI = generate_rc_uri( RC_URLS.RING_OUT, params );
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
    return this.post( URI, params );
}
module.exports.RingCentral = RingCentral
