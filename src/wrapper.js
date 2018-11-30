var RingCentral = require('ringcentral-js-concise').default

const RC_URLS = {
    SMS:       "/restapi/v1.0/account/{0}/extension/{1}/sms",
    MESSAGES:  "/restapi/v1.0/account/{0}/extension/{1}/message-store",
    RING_OUT:  "/restapi/v1.0/account/{0}/extension/{1}/ring-out",
    CONTACTS:  "/restapi/v1.0/account/{0}/extension/{1}/address-book/contact",
    PHONE_NUM: "/restapi/v1.0/account/{0}/extension/{1}/phone-number",
    CALL_LOG:  "/restapi/v1.0/account/{0}/extension/{1}/call-log",
    ACTIVE_CALLS:    "/restapi/v1.0/account/{0}/extension/{1}/active-calls",
    CO_CALL_LOG:     "/restapi/v1.0/account/{0}/call-log",
    CO_ACTIVE_CALLS: "/restapi/v1.0/account/{0}/active-calls",
    CALL_RECORDING:  "/restapi/v1.0/account/{0}/recording",
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
 * Messaging
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
RingCentral.prototype.getMessageList = function ( params ) {
    let URI = generate_rc_uri( RC_URLS.MESSAGES, params );
    return this.get( URI, params )
}

/*
 * Contacts
 */
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
RingCentral.prototype.getExtensionList = function ( params ) {
    let URI = generate_rc_uri( RC_URLS.PHONE_NUM, params );
    return this.get( URI, params )
}

/*
 * Call Log
 */
RingCentral.prototype.getUserCallLog = function ( params ) {
    let URI = generate_rc_uri( RC_URLS.CALL_LOG, params );
    return this.get( URI, params )
}
RingCentral.prototype.deleteUserCallLog = function ( params ) {
    let URI = generate_rc_uri( RC_URLS.CALL_LOG, params );
    return this.delete( URI, params )
}
// FIXME: support retrieving multiple records
RingCentral.prototype.getUserCallLogRecord = function ( params ) {
    let URI = generate_rc_uri( RC_URLS.CALL_LOG + '/' + params['id'], params );
    return this.get( URI, params )
}
RingCentral.prototype.getUserActiveCalls = function ( params ) {
    let URI = generate_rc_uri( RC_URLS.ACTIVE_CALLS, params );
    return this.get( URI, params )
}

RingCentral.prototype.getCompanyCallLog = function ( params ) {
    let URI = generate_rc_uri( RC_URLS.CO_CALL_LOG, params );
    return this.get( URI, params )
}
RingCentral.prototype.getCompanyCallLogRecord = function ( params ) {
    let URI = generate_rc_uri( RC_URLS.CO_CALL_LOG + '/' + params['id'], params );
    return this.get( URI, params )
}
RingCentral.prototype.getCompanyActiveCalls = function ( params ) {
    let URI = generate_rc_uri( RC_URLS.CO_ACTIVE_CALLS, params );
    return this.get( URI, params )
}

RingCentral.prototype.getCallRecording = function ( params ) {
    let URI = generate_rc_uri( RC_URLS.CALL_RECORDING + '/' + params['id'], params );
    return this.get( URI, params )
}
RingCentral.prototype.getCallRecordingData = function ( params ) {
    let URI = generate_rc_uri( RC_URLS.CALL_RECORDING + '/' + params['id'] + '/content', params );
    return this.get( URI, params )
}


/*
 * Voice
 */
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
RingCentral.prototype.getRingOutStatus = function ( params ) {
    let URI = generate_rc_uri( RC_URLS.RING_OUT + '/' + params['id'], params );
    return this.get( URI, params )
}
RingCentral.prototype.cancelRingOut = function ( params ) {
    let URI = generate_rc_uri( RC_URLS.RING_OUT + '/' + params['id'], params );
    return this.delete( URI, params )
}
module.exports.RingCentral = RingCentral
