var RC = require('../src/wrapper')

var dotenv = require('dotenv')
dotenv.config();
var expect = require('chai').expect;
var faker = require('faker');
var util = require('util');

const client = new RC.RingCentral(process.env.RINGCENTRAL_CLIENTID,
				  process.env.RINGCENTRAL_CLIENTSECRET,
				  process.env.RINGCENTRAL_SERVER )

describe('RingCentral: Phone Numbers', function () {
    it('should successfully authorize a client', function (done) {
	client.authorize({
	    username:  process.env.RINGCENTRAL_USERNAME,
	    extension: process.env.RINGCENTRAL_EXTENSION,
	    password:  process.env.RINGCENTRAL_PASSWORD
	}).then( function() {
	    expect( client.token ).to.exist;
	}).finally( done );
    });
    it('should successfully get a list of extensions associated with a user', function (done) {
	client.getExtensionList({
	    // no input params
	}).then( function( r ) {
	    expect( r.data['records'] ).to.exist;
	    expect( r.data['paging'] ).to.exist;
	    expect( r.data['navigation'] ).to.exist;
	    expect( r.data['paging']['page'] ).to.equal(1);
	}).finally( done );
    });
});

// FIXME: add test for scoping to extension


