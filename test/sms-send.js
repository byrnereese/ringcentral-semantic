var RC = require('../src/wrapper')

var dotenv = require('dotenv')
dotenv.config();
var expect = require('chai').expect;

const client = new RC.RingCentral(process.env.RINGCENTRAL_CLIENTID,
				  process.env.RINGCENTRAL_CLIENTSECRET,
				  process.env.RINGCENTRAL_SERVER )

client.authorize({
    username:  process.env.RINGCENTRAL_USERNAME,
    extension: process.env.RINGCENTRAL_EXTENSION,
    password:  process.env.RINGCENTRAL_PASSWORD
}).then( function() {

    const r = client.sendSMS({
	sender:   process.env.RINGCENTRAL_USERNAME,
	receiver: process.env.RINGCENTRAL_TEST_1_RECIPIENT,
	message:  'This is a test SMS sent by the ringcentral-sementic node module'
    });

}).catch( function( error ) {
    console.log("ERROR: " + error)
});



