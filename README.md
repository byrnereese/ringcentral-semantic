This project is a PROOF OF CONCEPT and WORK IN PROGRESS and SHOULD NOT be used for production use. 

## Overview

This project provides a node module that extends the [ringcentral-js-concise](https://github.com/tylerlong/ringcentral-js-concise) module with a more semantic interface. By default, the cocise module, while light-weight, is very abstract and hard for beginners to use. This module hopes to make the vastness of the RingCentral API more accessible to beginners.

To illustrate, here are two functionally equivalent code samples using the two modules:

### Sending an SMS using ringcentral-js-concise

```javascript
const r = client.post('/restapi/v1.0/account/~/extension/~/sms', {
    from: { phoneNumber: '+12054387726' },
    to:  [{ phoneNumber: '+15108723204' }],
    text: 'This is a test SMS.'
});
```

### Sending an SMS using ringcentral-semantic

```javascript
const r = client.sendSMS({
    sender:   '+12054387726',
    receiver: '+15108723204',
    message:  'This is a test SMS.'
});
```

Hopefully, what you can see is a slightly more intuitive interface, one that exposes explicit functions for each of RingCentral's capabilities, and abstracts developers completely away from having to know API endpoints, or methods. 
