# Mining Core RPC Explorer

Simple, database-free, self-hosted Mining core explorer, via RPC. Built with Node.js, express, bootstrap-v4.

This tool is intended to be a simple, self-hosted explorer for the Miningcore the multi-currency stratum-engine https://github.com/coinfoundry/miningcore, driven by RPC calls to your own mining core instance.

I built this tool because at this point https://github.com/coinfoundry/miningcore lacks front-end capabilities. With this explorer, you can not only run it on the same server where your multi-currency stratum-engine runs but from a different machine trusting only local connections to your multi-currency stratum-engine instance.

# Features

* List of recent blocks
* List of recent payments
* List of top miners
* Update Pool stats periodically
* View miner stats
* Cache calls to rpc mining core to reply back to clients in order to speed up response time and minimizing stress to the multi-currency stratum-engine

# Getting started

The below instructions are geared toward BTC, but can be adapted easily to other coins.

## Prerequisites

1. Install and run a full, multi-currency stratum-engine instance - [instructions](https://github.com/coinfoundry/miningcore). Ensure that your instance has full RPC server enabled (http://127.0.0.1:4000).

## Instructions

1. Clone this repo
2. `npm install` to install all required dependencies
3. Edit the "config" settings in [app.js](app.js) to target your node
4. Optional: Change the "URI" and "poolId" value in [app.js](app.js). Currently supported values are "BTC" and "LTC".
5. `npm start` to start the local server
6. Visit http://127.0.0.1:3002/


## References

1. https://github.com/janoside/btc-rpc-explorer
2. https://github.com/coinfoundry/miningcore
3. https://coinfoundry.org/pool/eth
4. https://github.com/apigee/ApigeeEdge-Node-SDK
5. https://github.com/calvintam236/miningcore-ui
