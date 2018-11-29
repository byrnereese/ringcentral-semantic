var RC = require('../src/wrapper')

var dotenv = require('dotenv')
dotenv.config();
var expect = require('chai').expect;

const client = new RC.RingCentral(process.env.RINGCENTRAL_CLIENTID,
				  process.env.RINGCENTRAL_CLIENTSECRET,
				  process.env.RINGCENTRAL_SERVER )

describe('RingCentral: Ring Out', function () {
    it('should successfully authorize a client', function (done) {
	client.authorize({
	    username:  process.env.RINGCENTRAL_USERNAME,
	    extension: process.env.RINGCENTRAL_EXTENSION,
	    password:  process.env.RINGCENTRAL_PASSWORD
	}).then( function() {
	    expect( client.token ).to.exist;
	}).finally( done );
    });
    it('should successfully connect two phone numbers', function (done) {
	client.ringOut({
	    caller:   process.env.RINGCENTRAL_TEST_2_CALLER,
	    receiver: process.env.RINGCENTRAL_TEST_2_RECEIVER
	}).then( function( r ) {
	    expect( r.data['id'] ).to.exist;
	    expect( r.data['status']['callStatus'] ).to.be.equal('InProgress');
	}).finally( done );
    });
});


