/* (C) 2018 QXIP BV */

/* USER VARIABLES */

var vectors = [
	{ score: 100, key: 'callid', suffix: "_b2b-1" },
	{ score: 100, key: 'correlation_id', name: 'callid' },
	{ score: 100, key: 'x-cid', name: 'callid' },
	{ score: 50,  key: 'ruri_user', regex: /^(00|\+)/ },
	{ score: 50,  key: 'from_user', regex: /^(00|\+)/ },
	{ score: 50,  key: 'bnumber_ext' },
	{ score: 50,  key: 'anumber_ext' }
];

var params = { maxSize: 5000, maxAge: 5000, threshold: 99 };

/* DO NOT TOUCH BELOW THIS BELT */

exports.vectors = function(vec){
	vectors = vec;
};

exports.params = function(k,v){
	params[k] = v;
};

var recordCache = require('record-cache')
var cache = [];
cache.uuid = recordCache(params);

var setCache = function(name,k,v){
  if (!cache[name]) {
	cache[name] = recordCache(params);
  }
  cache[name].add(k,v);
}
var getCache = function(name,k){
  if (cache[name]) return cache[name].get(k);
}

var main = function(obj){
  var err;

  if (!obj) return false;
  if (obj.message) obj = obj.message;

  if (!obj.uuid) return false;
  const uuid = obj.uuid;
  var set = {};
  var hold;

  /* store object by uuid */
  cache.uuid.add(uuid,obj);
  /* parse and store session ids */
  vectors.forEach(function(item){
      if (obj[item.key]) {
         var tmp = obj[item.key];
	 /* save suffix version */
         if (item.suffix) {
	   err = setCache(item.key,tmp+item.suffix,uuid);
	   if (err) console.err(err);
	   set[item.key] = tmp+item.suffix;
	 }
	 /* save prefix version */
         if (item.prefix) {
	   err = setCache(item.key,item.prefix+tmp,uuid);
	   if (err) console.err(err);
	   set[item.key] = item.prefix+tmp;
	 }
	 /* save regex version */
         if (item.regex) tmp = tmp.replace(item.regex,"");
	 set[item.key] = tmp;
	 err = setCache(item.key,tmp,uuid);
	 if (err) console.err(err);
	 /* save regex match version */
         if (item.regex_match) {
		hold = tmp.match(item.regex_match)[0];
		if (hold) {
		  tmp = hold;
		  set[item.key] = tmp;
		  err = setCache(item.key,tmp,uuid);
		  if (err) console.err(err);
		}
	 }
	 /* save named version */
         if (item.name) err = setCache(item.name,tmp,uuid);

      }
  });
  /* send to correlate */
  return correlate(obj,set);

}

var correlate = function(obj,set){

  /* Correlation */
  var uuids = [];
  var links = [];
  var score = 0;
  vectors.forEach(function(item){
    if (set[item.key]){
      var tmp_uuid = getCache(item.key,set[item.key]);
      if(tmp_uuid) {
	tmp_uuid.forEach(function(id){
	  if (!uuids[tmp_uuid]) uuids[tmp_uuid] = item.score;
	  else uuids[tmp_uuid] = uuids[tmp_uuid] + item.score;
	  if (uuids[tmp_uuid] > params.threshold && links.indexOf(id) === -1) links.push(id)
        });
      }
    }
  });
  /*
  for(var key in set) {
    var tmp_uuid = getCache(key,set[key]);
    if(tmp_uuid) tmp_uuid.forEach(function(id){
	if (links.indexOf(id) === -1) links.push(id)
    });
  };
  */
  obj.links = links;
  return obj
}

exports.correlate = correlate;
exports.process = main;

