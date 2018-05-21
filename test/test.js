const main = require('../index.js');

/* vectors */
const vectors = [
	{ score: 100, key: 'callid', suffix: "_b2b-1" },
	{ score: 100, key: 'correlation_id', name: 'callid' },
	{ score: 100, key: 'x-cid', name: 'callid', inject: 'x-cid' },
	{ score: 50,  key: 'ruri_user', regex: /^(00|\+)/ },
	{ score: 50,  key: 'from_user', regex: /^(00|\+)/ }
];

main.vectors(vectors);
main.params('maxAge', 2000);

/* fake dataset */
var cdr = [
{"message":{"type":"call","uuid":"6b930721-e655-11e7-8721-000019432987","gid":10,"status":10,"callid":"68d0ec5d27ee6a27152f3f800de4ec7d","cdr_start":1513864020949,"sigproto":17,"source_ip":"1.2.3.4","source_port":5060,"destination_ip":"9.8.7.6","destination_port":5060,"micro_ts":1513864020949584,"cdr_connect":1513864027888,"cdr_stop":1513864377946,"cdr_ringing":1513864021035,"duration":350,"ruri_user":"+31555666","ruri_domain":"7.8.9.10","from_user":"+478900000","from_domain":"some-domain","to_user":"USERGROUP-x1234-1","to_domain":"7.8.9.10","contact_user":"+478900000","diversion_user":"478900000","dialog_id":"68d0ec5d27ee6a27152f3f800de4ec7d","uas":"CustomUserAgent","bnumber_ext":"1234-1","codec_in_audio":99,"codec_out_audio":0,"codec_out_video":0,"sdpsid":723251366,"sdpsver":723251366,"srd":0,"sss":85,"sdmedia_ip":"1.2.3.4","sdp_ap":17692,"capt_id":204,"vst":1,"rf_a":78.86,"mos_a":3.97,"pl_a":0,"jt_a":0,"mos":397,"proto":1,"status_text":"FINISHED","group":"default","x-cid":"DWSWKDWPD5HX5IJGPBQQGFK4ZI"},"severity":"info"},
{"message":{"type":"call","uuid":"11185a99-e655-11e7-9a99-000019432987","gid":10,"status":10,"callid":"DWSWKDWPD5HX5IJGPBQQGFK4ZI","cdr_start":1513863869150,"sigproto":17,"source_ip":"5.6.7.8","source_port":5060,"destination_ip":"9.8.7.6","destination_port":5060,"micro_ts":1513863869150684,"cdr_connect":1513863869622,"cdr_stop":1513864377934,"duration":508,"ruri_user":"31555666","from_user":"47484950","from_domain":"somedomain.com","to_user":"45464748","to_domain":"destinaton.net","contact_user":"47484950","diversion_user":"47484950","dialog_id":"DWSWKDWPD5HX5IJGPBQQGFK4ZI","uas":"Vox Callcontrol","codec_in_audio":8,"codec_in_video":0,"codec_out_audio":0,"codec_out_video":0,"sdpsid":2019372220,"sdpsver":2019372220,"srd":0,"sss":471,"sdmedia_ip":"8.9.10.11","sdp_ap":17698,"capt_id":179,"vst":1,"rf_a":92.87,"mos_a":4.4,"pl_a":0,"jt_a":0,"mos":440,"proto":1,"status_text":"FINISHED","group":"default"},"severity":"info"},
{"message":{"type":"call","uuid":"6b930721-e655-11e7-6666-000019432987","gid":10,"status":10,"callid":"99d0ec5d27ee6a27152f3f800de4ec7d","cdr_start":1513864020949,"sigproto":17,"source_ip":"1.2.3.4","source_port":5060,"destination_ip":"9.8.7.6","destination_port":5060,"micro_ts":1513864020949584,"cdr_connect":1513864027888,"cdr_stop":1513864377946,"cdr_ringing":1513864021035,"duration":350,"ruri_user":"+39023456789","ruri_domain":"7.8.9.10","from_user":"+390678899001","from_domain":"some-domain","to_user":"USERGROUP-x9999-1","to_domain":"7.8.9.10","contact_user":"+390678899001","dialog_id":"99d0ec5d27ee6a27152f3f800de4ec7d","uas":"CustomUserAgent","bnumber_ext":"1234-1","codec_in_audio":99,"codec_out_audio":0,"codec_out_video":0,"sdpsid":723251366,"sdpsver":723251366,"srd":0,"sss":85,"sdmedia_ip":"1.2.3.4","sdp_ap":17692,"capt_id":204,"vst":1,"rf_a":78.86,"mos_a":3.97,"pl_a":0,"jt_a":0,"mos":397,"proto":1,"status_text":"FINISHED","group":"default","x-cid":"AABBCCDDEEFFGGHH1122334455667788"},"severity":"info"},
];

// sequential cache, correlation match
setTimeout(function(){
	console.log('Expect 1 link');
	main.process(cdr[0]);
	console.log( cdr[1].message.uuid, main.process(cdr[1]).links );
	console.log(cdr[1]);
}, 1000);

// expire cache, no correlation match
setTimeout(function(){
  	console.log('Expect 0 links');
	//main.process(cdr[3]);
  	console.log(cdr[1].message.uuid, main.process(cdr[1]).links)
	//console.log(cdr[1]);
}, 5000);




