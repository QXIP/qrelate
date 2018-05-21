# qrelate
Short-Term memory pipeline correlation module

## About
This module was designed for [paStash](https://github.com/sipcapture/pastash) In-Line CDR correlation

## Setup
```
npm install --save qrelate
```

### Functions
* `key`: Key name to extract value from
* `suffix`: Extend with suffix
* `prefix`: Extend with prefix
* `regex`: Replace using regex
* `regex_match`: Match using regex
* `name`: Store using name
* `inject`: Inject header on correlation
* `score`: Score to assign for a match

### Parameters
* `maxSize`: max number of items in LRU
* `maxAge`: max age in ms for items in LRU
* `treshold`: correlation treshold score
* `uuid`: correlation identifier key


#### Usage
```javascript
const qrelate = require('qrelate');

// Set Cache
qrelate.params('maxSize',5000); // max number of items in LRU
qrelate.params('maxAge',5000); // max age of items in LRU
qrelate.params('threshold',99); // correlation threshold score
qrelate.params('uuid','uuid'); // correlation identifier key

// Set Vectors
const vectors = [
	{ score: 100, key: 'callid', suffix: "_b2b-1" },
	{ score: 100, key: 'correlation_id', name: 'callid', inject: 'x-cid' },
	{ score: 50,  key: 'ruri_user', regex: /^(00|\+)/ },
	{ score: 50,  key: 'from_user', regex: /^(00|\+)/ }
	{ score: 50,  key: 'to_user', name: "last8dig", regex_match: /.{8}$/ }
];
qrelate.vectors(vectors);
```

#### (C) 2018 QXIP BV
