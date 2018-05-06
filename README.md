# qrelate
Pipeline Correlation Module for [paStash](https://github.com/sipcapture/pastash) HSP CDRs

## Usage
Do not use this!

### Functions
* `key`: Key name to extract value from
* `suffix`: Extend with suffix
* `prefix`: Extend with prefix
* `regex`: Replace using regex
* `regex_match`: Match using regex
* `name`: Store using name
* `score`: Score to assign for a match

#### Parameters
```javascript
const qrelate = require('qrelate');

// Set Cache
qrelate.params('maxSize',5000); // max number of items in LRU
qrelate.params('maxAge',5000); // max age of items in LRU
qrelate.params('threshold',99); // correlation threshold score

// Set Vectors
const vectors = [
	{ score: 100, key: 'callid', suffix: "_b2b-1" },
	{ score: 100, key: 'correlation_id', name: 'callid' },
	{ score: 50,  key: 'ruri_user', regex: /^(00|\+)/ },
	{ score: 50,  key: 'from_user', regex: /^(00|\+)/ }
	{ score: 50,  key: 'to_user', name: "last8dig", regex_match: /.{8}$/ }
];
qrelate.vectors(vectors);
```

#### (C) 2018 QXIP BV
