var request = require('request');

var MiningCore = {};

MiningCore.Client = function(options) {
    this.URI = options.URI || 'http://127.0.0.1:4000/api';
    // Mining Core Coin
    this.poolId = options.poolId;
};

MiningCore.Client.prototype.request = function (options, callback) {
    var method = options.method || 'GET';
    var endpoint = options.endpoint;
    var body = options.body || {};
    var qs = options.qs || {};
    var headers = options.headers || {};
    var poolId = this.poolId;
  
    if(!poolId){
      console.log("Please check Mining Core Connection Configuration");
    }
  
    var uri = this.URI + '/pools/' + poolId + endpoint;
    var callOptions = {
      method: method,
      uri: uri,
      json: body,
      qs: qs,
      headers: {
              'User-Agent': 'Mining-Core-Client 1.0.0'
          }
    };
  
    for (var prop in headers) {
      callOptions.headers[prop] = headers[prop];
    }
    
    request(callOptions, function (err, response, data) {

      response = response || {};
      response.body = response.body || {};
      data = data || {};

      if(!err && (response.statusCode === 200 || response.statusCode === 201 || response.statusCode == 204)){
        callback(err, data);
      }else{
        callback(err, response.body);
      }
      
    });
};

var resourceApiPool = require('./resources/apiPool');

exports.client = MiningCore.Client;
exports.apiPool = resourceApiPool.ApiPool;