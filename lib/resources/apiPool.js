'use strict'

function ApiPool(options) {
  this._client = options.client;
}

ApiPool.prototype.getStats = function (options, callback) {
  var options = {
    method: 'GET',
    endpoint: '',
    qs: options,
    body: {}
  };
  this._client.request(options, function (err, data) {
    if (err) {
      if (typeof (callback) === 'function') {
        callback(err, data);
      }
    } else {
      if (typeof (callback) === 'function') {
        callback(err, data);
      }
    }
  });
}

ApiPool.prototype.getPerformance = function (options, callback) {
  var options = {
    method: 'GET',
    endpoint: '/performance',
    qs: options,
    body: {}
  };
  this._client.request(options, function (err, data) {
    if (err) {
      if (typeof (callback) === 'function') {
        callback(err, data);
      }
    } else {
      if (typeof (callback) === 'function') {
        callback(err, data);
      }
    }
  });
}

ApiPool.prototype.getLatestBlocks = function (options, callback) {
  var options = {
    method: 'GET',
    endpoint: '/blocks?pageSize=100',
    qs: options,
    body: {}
  };
  this._client.request(options, function (err, data) {
    if (err) {
      if (typeof (callback) === 'function') {
        callback(err, data);
      }
    } else {
      if (typeof (callback) === 'function') {
        callback(err, data);
      }
    }
  });
}

ApiPool.prototype.getLatestPayments = function (options, callback) {
  var options = {
    method: 'GET',
    endpoint: '/payments?pageSize=100',
    qs: options,
    body: {}
  };
  this._client.request(options, function (err, data) {
    if (err) {
      if (typeof (callback) === 'function') {
        callback(err, data);
      }
    } else {
      if (typeof (callback) === 'function') {
        callback(err, data);
      }
    }
  });
}

ApiPool.prototype.getMiners = function (options, callback) {
  var options = {
    method: 'GET',
    endpoint: '/miners',
    qs: options,
    body: {}
  };
  this._client.request(options, function (err, data) {
    if (err) {
      if (typeof (callback) === 'function') {
        callback(err, data);
      }
    } else {
      if (typeof (callback) === 'function') {
        callback(err, data);
      }
    }
  });
}

ApiPool.prototype.getMinerInfo = function (address, options, callback) {
  var options = {
    method: 'GET',
    endpoint: '/miners/' + address,
    qs: options,
    body: {}
  };
  this._client.request(options, function (err, data) {
    if (err) {
      if (typeof (callback) === 'function') {
        callback(err, data);
      }
    } else {
      if (typeof (callback) === 'function') {
        callback(err, data);
      }
    }
  });
}

ApiPool.prototype.getMinerPerformance = function (address, options, callback) {
  var options = {
    method: 'GET',
    endpoint: '/miners/' + address+'/performance',
    qs: options,
    body: {}
  };
  this._client.request(options, function (err, data) {
    if (err) {
      if (typeof (callback) === 'function') {
        callback(err, data);
      }
    } else {
      if (typeof (callback) === 'function') {
        callback(err, data);
      }
    }
  });
}

ApiPool.prototype.getMinerBalanceChanges = function (address, options, callback) {
  var options = {
    method: 'GET',
    endpoint: '/miners/' + address+'/balancechanges',
    qs: options,
    body: {}
  };
  this._client.request(options, function (err, data) {
    if (err) {
      if (typeof (callback) === 'function') {
        callback(err, data);
      }
    } else {
      if (typeof (callback) === 'function') {
        callback(err, data);
      }
    }
  });
}

ApiPool.prototype.getMinerPayments = function (address, options, callback) {
  var options = {
    method: 'GET',
    endpoint: '/miners/' + address+'/payments',
    qs: options,
    body: {}
  };
  this._client.request(options, function (err, data) {
    if (err) {
      if (typeof (callback) === 'function') {
        callback(err, data);
      }
    } else {
      if (typeof (callback) === 'function') {
        callback(err, data);
      }
    }
  });
}
exports.ApiPool = ApiPool