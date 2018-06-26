var resourcePoolRouter = require('./pool');
var resourceMinerRouter = require('./miner');

exports.pool = resourcePoolRouter.PoolRouter;
exports.miner = resourceMinerRouter.MinerRouter;