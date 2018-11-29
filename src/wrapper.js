var RingCentral = require('ringcentral-js-concise').default
const RC_URLS = {
    SMS: '/restapi/v1.0/account/~/extension/~/sms'
};
RingCentral.prototype.sendSMS = function ( opts ) {
    return this.post( RC_URLS.SMS, {
      from: { phoneNumber: opts.sender },
      to: [{ phoneNumber: opts.receiver }],
      text: opts.message
    })
}
module.exports.RingCentral = RingCentral
