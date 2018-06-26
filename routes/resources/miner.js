'use strict'

function MinerRouter(router, sdk){
  var _sdk = sdk;

  function getMinerInfo(req, res){
    _sdk.getMinerInfo(req.params.address, 'perfMode=day', function(error, data) {
      if(!error){
        res.json(data);
      }else{
        console.log('An error has occurred while getting miner list.');
        res.status(500).send({ error: 'An error has occurred!' })
      }
    });
  }

  function getMinerPayments(req, res){
    _sdk.getMinerInfo(req.params.address, '', function(error, data) {
      if(!error){
        res.json(data);
      }else{
        res.status(500).send({ error: 'An error has occurred!' })
      }
    });
  }

  function getMinerBalanceChanges(req, res){
    _sdk.getMinerBalanceChanges(req.params.address, '', function(error, data) {
      if(!error){
        res.json(data);
      }else{
        res.status(500).send({ error: 'An error has occurred!' })
      }
    });
  }

  function getMinerPerformance(req, res){
    _sdk.getMinerPerformance(req.params.address, '', function(error, data) {
      if(!error){
        res.json(data);
      }else{
        res.status(500).send({ error: 'An error has occurred!' })
      }
    });
  }

  router.get('/miners/:address', getMinerInfo);
  router.get('/miners/:address/payments', getMinerPayments);
  router.get('/miners/:address/balancechanges', getMinerBalanceChanges);
  router.get('/miners/:address/performance', getMinerPerformance);

  return router;
}

exports.MinerRouter = MinerRouter;