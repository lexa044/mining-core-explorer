'use strict'

function PoolRouter(router){

  function getStatus(req, res) {
    var stats = global.poolStats || {
      "pool": {
        "coin": {
          "type": "BTP",
          "algorithm": "Sha256",
        },
        "poolStats": {
          "connectedMiners": 0,
          "poolHashrate": "Infinity",
        },
        "networkStats": {
          "networkHashrate": 0,
          "networkDifficulty": "Infinity",
        },
        "paymentProcessing":{
          "minimumPayment": 0.001,
          "payoutScheme": "PPLNS",
        },
        "address": "B6QqVe1CDGwXiNe4zpWeoLKYYQK6hKWx64",
        "totalPaid": 0,
        "poolFeePercent": 1,
      }
    };

    var performance = global.poolPerformance || {
      "stats": []
    };

    res.json({stats: stats, performance: performance});
  };
  
  function getLatestBlocks(req, res) {
    var stats = global.blocks || [];
    res.json(stats);
  };

  function getLatestPayments(req, res) {
    var stats = global.payments || [];
    res.json(stats);
  };

  router.get('/status', getStatus);
  router.get('/blocks', getLatestBlocks);
  router.get('/payments', getLatestPayments);

  return router;
}

exports.PoolRouter = PoolRouter;