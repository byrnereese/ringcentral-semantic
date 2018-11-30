var RingCentral = require('ringcentral-js-concise').default

const RC_URLS = {
    SMS:      `/restapi/v1.0/account/{0}/extension/{1}/sms`,
    MESSAGES: `/restapi/v1.0/account/{0}/extension/{1}/message-store`,
    RING_OUT: `/restapi/v1.0/account/{0}/extension/{1}/ring-out`,
    CONTACTS: "/restapi/v1.0/account/{0}/extension/{1}/address-book/contact",
};

// FIXME: come up with a standard way to force request input to conform to RingCentral verbose version. 

if (!String.format) {
  String.format = function(format) {
    var args = Array.prototype.slice.call(arguments, 1);
    return format.replace(/{(\d+)}/g, function(match, number) { 
      return typeof args[number] != 'undefined'
        ? args[number] 
        : match
      ;
    });
  };
}

function generate_rc_uri( uri, params ) {
    // FIXME: currently doesn't do anything except remove account and extension for input params
    // FIXME: use js templates to insert value or use default '~'
    let account = '~';
    if ( typeof params.accountId === 'string' ) {
	account = params.accountId
	delete params.accountId
    }
    let extension = '~';
    if ( typeof params.extension === 'string' ) {
	extension = params.extension
	delete params.extension
    }
    return String.format( uri, account, extension )
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
    let URI = generate_rc_uri( RC_URLS.MESSAGES, params );
    return this.get( URI, params )
}
RingCentral.prototype.getContactList = function ( params ) {
    let URI = generate_rc_uri( RC_URLS.CONTACTS, params );
    return this.get( URI, params )
}
RingCentral.prototype.createContact = function ( params ) {
    let URI = generate_rc_uri( RC_URLS.CONTACTS, params );
    return this.post( URI, params )
}
RingCentral.prototype.getContact = function ( params ) {
    let URI = generate_rc_uri( RC_URLS.CONTACTS + '/' + params['id'], params );
    return this.get( URI, {} )
}
RingCentral.prototype.deleteContact = function ( params ) {
    let URI = generate_rc_uri( RC_URLS.CONTACTS + '/' + params['id'], params );
    return this.delete( URI, {} )
}
RingCentral.prototype.updateContact = function ( params ) {
    let URI = generate_rc_uri( RC_URLS.CONTACTS + '/' + params['id'], params );
    return this.put( URI, params )
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
    return this.post( URI, params );
}
module.exports.RingCentral = RingCentral
