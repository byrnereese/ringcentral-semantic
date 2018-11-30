var RC = require('../src/wrapper')

var dotenv = require('dotenv')
dotenv.config();
var expect = require('chai').expect;
var faker = require('faker');
var util = require('util');

const client = new RC.RingCentral(process.env.RINGCENTRAL_CLIENTID,
				  process.env.RINGCENTRAL_CLIENTSECRET,
				  process.env.RINGCENTRAL_SERVER )

describe('RingCentral: Call Logs', function () {
    it('should successfully authorize a client', function (done) {
	client.authorize({
	    username:  process.env.RINGCENTRAL_USERNAME,
	    extension: process.env.RINGCENTRAL_EXTENSION,
	    password:  process.env.RINGCENTRAL_PASSWORD
	}).then( function() {
	    expect( client.token ).to.exist;
	}).finally( done );
    });
    let id = undefined
    it('should successfully get a list of a user\'s call log', function (done) {
	client.getUserCallLog({
	    // no input params
	}).then( function( r ) {
	    expect( r.data['records'] ).to.exist;
	    expect( r.data['paging'] ).to.exist;
	    expect( r.data['navigation'] ).to.exist;
	    expect( r.data['paging']['page'] ).to.equal(1);
	    expect( r.data['records'][0]['id'] ).to.exist;
	    id = r.data['records'][0]['id'];
	}).finally( done );
    });
    it('should successfully get a specific call log record', function (done) {
	client.getUserCallLogRecord({
	    id: id
	}).then( function( r ) {
	    expect( r.data['id'] ).to.equal( id );
	    expect( r.data['sessionId'] ).to.exist;
	    expect( r.data['startTime'] ).to.exist;
	    expect( r.data['duration'] ).to.exist;
	    expect( r.data['type'] ).to.exist;
	    expect( r.data['direction'] ).to.exist;
	}).finally( done );
    });

    let id2 = undefined
    it('should successfully get a company\'s call log', function (done) {
	client.getCompanyCallLog({
	    // no input params
	}).then( function( r ) {
	    expect( r.data['records'] ).to.exist;
	    expect( r.data['paging'] ).to.exist;
	    expect( r.data['navigation'] ).to.exist;
	    expect( r.data['paging']['page'] ).to.equal(1);
	    expect( r.data['records'][0]['id'] ).to.exist;
	    id2 = r.data['records'][0]['id'];
	}).finally( done );
    });
    it('should successfully get a specific company call log record', function (done) {
	client.getCompanyCallLogRecord({
	    id: id2
	}).then( function( r ) {
	    expect( r.data['id'] ).to.equal( id2 );
	    expect( r.data['sessionId'] ).to.exist;
	    expect( r.data['startTime'] ).to.exist;
	    expect( r.data['duration'] ).to.exist;
	    expect( r.data['type'] ).to.exist;
	    expect( r.data['direction'] ).to.exist;
	}).finally( done );
    });

});

// FIXME: add tests for getting call recording 
// FIXME: add tests for getting call recording data
// FIXME: add test for scoping to extension


