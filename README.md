This project is a PROOF OF CONCEPT and WORK IN PROGRESS and SHOULD NOT be used for production use. 

## Overview

This project provides a node module that extends the [ringcentral-js-concise](https://github.com/tylerlong/ringcentral-js-concise) module with a more semantic interface. The concise module is optimized for being light-weight. As a result, it tends to be more abstract, and harder to use for beginners.

This module hopes to make the vastness of the RingCentral API more accessible to beginners.

To illustrate, here are two functionally equivalent code samples using the two modules:

### Sending an SMS using ringcentral-js-concise

```javascript
const promise = client.post('/restapi/v1.0/account/~/extension/~/sms', {
    from: { phoneNumber: '+12054387726' },
    to:  [{ phoneNumber: '+15105553204' }],
    text: 'This is a test SMS.'
})
```

### Sending an SMS using ringcentral-semantic

```javascript
const promise = client.sendSMS({
    sender:   '+12054387726',
    receiver: '+15105553204',
    text:     'This is a test SMS.'
})
```

Hopefully, what you can see is a slightly more intuitive interface, one that exposes explicit functions for each of RingCentral's capabilities, and abstracts developers completely away from having to know API endpoints, or methods. 

## Usage

### Path Parameters

All of RingCentral's APIs can be scoped to a specific organization and user by specifying the corresponding account and/or extension in the endpoint's path. You can set these path parameters by passing in the following parameters into each method supported by this SDK:

* `accountId`
* `extension`

If these parameters are omitted, they will both default to `~`, which refers to the account/extension of the currently authed user.

**Example**

```javascript
client.sendSMS({
    accountId: '+12125558373',
    extension: '110',
    from: { phoneNumber: '+12054387726' },
    to:   [{ phoneNumber: '+15105553204'}],
    text:  'This is a test SMS.'
})
```

### Request Parameters

Each method supported by this library takes as input an associative array of request parameters. For all methods, developers are free to use the raw input format of the RingCentral API. In some circumstances however, this SDK will accept simpler formats so that code can be easier to read and input by the developer. For example, here is how one might compose a request to send an SMS using the raw input format:

```javascript
client.sendSMS({
    from: { phoneNumber: '+12054387726' },
    to:   [{ phoneNumber: '+15105553204'}],
    text:  'This is a test SMS.'
})
```

Here is the same call, using a simpler format:

```javascript
client.sendSMS({
    sender:   '+12054387726',
    receiver: '+15105553204',
    text:  'This is a test SMS.'
})
```

### Full Example: Processing the Response

This library utilizes ES6 asynchronous methods. Each method returns a promise, to which you can attach `then`, `catch` and `finally` blocks. For example:

```javascript
client.sendSMS({
    sender:   '+12054387726',
    receiver: '+15105553204',
    text:  'This is a test SMS.'
}).then( function (response) {
    console.log( "Message ID" + response.data['id'] )
}).catch( function (error) {
    console.log( "Something went wrong: " + error.message )
}).finally( function () {
    console.log( "All finished. ")
})
```

# Supported Methods

## Call Log

### getUserCallLog

### deleteUserCallLog

### getUserCallLogRecord

### getUserActiveCalls

### getCompanyCallLog

### getCompanyCallLogRecord

### getCompanyActiveCall

## Contacts

### createContact

Creates a new contact in the associated account. This method has no simplified syntax.

### updateContact

Updates a single contact with the specified id. Developers need only specify the contact properties they wish to update. 

**Simplified Syntax**

```javascript
client.getContact({
    id:   '736483937493',
    email: 'newemail@example.com'
})
```

### getContact

Returns a single contact with the specified id. *Note: you can only fetch by id.*

**Simplified Syntax**

```javascript
client.getContact({
    id:   '736483937493'
})
```

### getContactList

Returns a list of contacts associated the current account. This method has no simplified syntax.

### getExtensionList

Returns a list of extensions associated with the given account. See "Path Parameters" above for how to scope this call to a given account and/or extension. 

## Messages

### sendSMS

Will send an SMS to the designated recipient.

**Simplified Syntax**

```javascript
client.sendSMS({
    sender:   '+12054387726',
    receiver: '+15105553204',
    text:  'This is a test SMS.'
})
```

### getMessageList

Returns a list of messages associated the current account. This method has no simplified syntax.

## Voice

### ringOut

Will dial the caller first, then connect the sender to the receiver when they pick up. Optionally accepts a callerId parameter. 

**Simplified Syntax**

```javascript
client.ringOut({
    caller:   '+15105553204',
    receiver: '+12054387726',
    callerId: '+15105555555'
})
```

# License

This module is licensed under the MIT license.