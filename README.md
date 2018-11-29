This project is a PROOF OF CONCEPT and WORK IN PROGRESS and SHOULD NOT be used for production use. 

## Overview

This project provides a node module that extends the [ringcentral-js-concise](https://github.com/tylerlong/ringcentral-js-concise) module by providing a more semantic interface, which by default is highly light weight and abstract. Here are two functionally equivalent code samples using the two modules:

### Sending an SMS using ringcentral-js-concise

```javascript
const r = client.post('/restapi/v1.0/account/~/extension/~/sms', {
    from: { phoneNumber: '+12054387726' },
    to:  [{ phoneNumber: '+15108723204' }],
    text: 'This is a test SMS.''
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