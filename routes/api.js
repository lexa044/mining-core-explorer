'use strict'

var express = require('express');
var apiRouters = require('./resources/index');
var apiSdk = require('../lib/mining-core-sdk');

function APIRouter(config){
    var router = express.Router();
    var client = new apiSdk.client({'URI': config.URI, 'poolId': config.poolId});
    var sdk = new apiSdk.apiPool({ client: client });

    const _poolRouter = new apiRouters.pool(router, sdk);
    const _minerRouter = new apiRouters.miner(router, sdk);
    
    return router;
}

module.exports = APIRouter;
