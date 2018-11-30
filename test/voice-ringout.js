var RC = require('../src/wrapper')

var dotenv = require('dotenv')
dotenv.config();
var expect = require('chai').expect;

const client = new RC.RingCentral(process.env.RINGCENTRAL_CLIENTID,
				  process.env.RINGCENTRAL_CLIENTSECRET,
				  process.env.RINGCENTRAL_SERVER )

describe('RingCentral: Ring Out', function () {
    afterEach( function( done ) {
	// Force a 2 second delay between each test to give the system
	// time to connect the call and hang it up.
	setTimeout( done, 2000 )
    });
    it('should successfully authorize a client', function (done) {
	this.timeout(3000);
	client.authorize({
	    username:  process.env.RINGCENTRAL_USERNAME,
	    extension: process.env.RINGCENTRAL_EXTENSION,
	    password:  process.env.RINGCENTRAL_PASSWORD
	}).then( function() {
	    expect( client.token ).to.exist;
	}).finally( done );
    });
    let id = undefined
    it('should successfully connect two phone numbers', function (done) {
	this.timeout(3000);
	client.ringOut({
	    caller:   process.env.RINGCENTRAL_TEST_2_CALLER,
	    receiver: process.env.RINGCENTRAL_TEST_2_RECEIVER
	}).then( function( r ) {
	    expect( r.data['id'] ).to.exist;
	    expect( r.data['status']['callStatus'] ).to.be.equal('InProgress');
	    id = r.data['id']
	    console.log("Ring out id: " + id )
	}).finally( done );
    });
    it('should show a status of in progress while call is being made', function (done) {
	this.timeout(3000);
	client.getRingOutStatus({
	    id: id
	}).then( function( r ) {
	    expect( r.data['id'] ).to.exist;
	    expect( r.data['status']['callStatus'] ).to.be.equal('InProgress');
	}).finally( done );
    });
    
    it('should hang up the call', function (done) {
	this.timeout(3000);
	client.cancelRingOut({
	    id: id
	}).then( function( r ) {
	    expect( r.status ).to.be.equal( 204 );
	}).finally( done );
    });
    it('should return a 404 since the call is over', function (done) {
	this.timeout(3000);
	client.getRingOutStatus({
	    id: id
	}).then( function( r ) {
	}).catch( function( err ) {
	    expect( err.status ).to.be.equal( 404 );
	    expect( err.data['errorCode'] ).to.be.equal( 'CMN-102' );
	}).finally( done );
    });
});


