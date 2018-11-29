var RC = require('../src/wrapper')

var dotenv = require('dotenv')
dotenv.config();
var expect = require('chai').expect;

const client = new RC.RingCentral(process.env.RINGCENTRAL_CLIENTID,
				  process.env.RINGCENTRAL_CLIENTSECRET,
				  process.env.RINGCENTRAL_SERVER )

describe('RingCentral: Sending an SMS', function () {
    it('should successfully authorize a client', function (done) {
	client.authorize({
	    username:  process.env.RINGCENTRAL_USERNAME,
	    extension: process.env.RINGCENTRAL_EXTENSION,
	    password:  process.env.RINGCENTRAL_PASSWORD
	}).then( function() {
	    expect( client.token ).to.exist;
	}).finally( done );
    });
    it('should successfully send an SMS', function (done) {
	client.sendSMS({
	    sender:   process.env.RINGCENTRAL_USERNAME,
	    receiver: process.env.RINGCENTRAL_TEST_1_RECIPIENT,
	    message:  'This is a test SMS sent by the ringcentral-sementic node module'
	}).then( function( r ) {
	    expect( r.data['id'] ).to.exist;
	    expect( r.data['conversationId'] ).to.exist;
	    expect( r.data['direction'] ).to.be.equal('Outbound');
	    expect( r.data['type'] ).to.be.equal('SMS');
	}).finally( done );
    });
});


