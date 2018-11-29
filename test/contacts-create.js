var RC = require('../src/wrapper')

var dotenv = require('dotenv')
dotenv.config();
var expect = require('chai').expect;
var faker = require('faker');

const client = new RC.RingCentral(process.env.RINGCENTRAL_CLIENTID,
				  process.env.RINGCENTRAL_CLIENTSECRET,
				  process.env.RINGCENTRAL_SERVER )

describe('RingCentral: Creating contacts', function () {
    it('should successfully authorize a client', function (done) {
	client.authorize({
	    username:  process.env.RINGCENTRAL_USERNAME,
	    extension: process.env.RINGCENTRAL_EXTENSION,
	    password:  process.env.RINGCENTRAL_PASSWORD
	}).then( function() {
	    expect( client.token ).to.exist;
	}).finally( done );
    });
    let fn = faker.name.firstName()
    let ln = faker.name.lastName()
    let dob = faker.date.past()
    let email = faker.internet.email().toLowerCase()
    let id = undefined
    it('should successfully create a contact', function (done) {
	client.createContact({
	    firstName: fn,
	    lastName: ln,
	    birthday: dob,
	    email: email,
	    notes: 'This contact was created by the javascript-semantic SDK test suite.',
	}).then( function( r ) {
	    expect( r.data['id'] ).to.exist;
	    id = r.data['id']
	}).finally( done );
    });
    it('should successfully get the contact just created', function (done) {
	client.getContact({
	    id: id 
	}).then( function( r ) {
	    expect( r.data['id'] ).to.be.equal( id );
	    expect( r.data['firstName'] ).to.be.equal( fn );
	    expect( r.data['lastName'] ).to.be.equal( ln );
	    expect( r.data['email'] ).to.be.equal( email );
	}).finally( done );
    });
});

// FIXME: add test for scoping to extension


