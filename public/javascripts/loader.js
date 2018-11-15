var apiBase = '/api/';

window.chartOptions = {
    scales: {
        yAxes: [{
          stacked: true
        }]
      }
};

function _formatter(value, decimal, unit) {
    if (value === 0) {
        return '0 ' + unit;
    } else {
        var si = [
            { value: 1, symbol: "" },
            { value: 1e3, symbol: "k" },
            { value: 1e6, symbol: "M" },
            { value: 1e9, symbol: "G" },
            { value: 1e12, symbol: "T" },
            { value: 1e15, symbol: "P" },
            { value: 1e18, symbol: "E" },
            { value: 1e21, symbol: "Z" },
            { value: 1e24, symbol: "Y" },
        ];
        for (var i = si.length - 1; i > 0; i--) {
            if (value >= si[i].value) {
                break;
            }
        }
        return (value / si[i].value).toFixed(decimal).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, "$1") + ' ' + si[i].symbol + unit;
    }
}

function _updateChart(label, arrayLabels, arrayPoints) {
      var data = {
        labels: arrayLabels,
        datasets: [{
          label: label,
          data: arrayPoints
        }]
      };

      $('#chart').replaceWith('<canvas id="chart" height="50"></canvas>');
    var ctx = $('#chart').get(0).getContext("2d");
    new Chart(ctx, {
            type: 'line',
            data: data,
            options: window.chartOptions
          });
}

angular.module('mcApp', [])
  .service('poolService', function($http) {

    this.getPoolStats = function () {
        return $http.get(apiBase + 'status');
    };

    this.getMinerInfo = function (address) {
        return $http.get(apiBase + 'miners/'+address);
    };

    this.getLatestBlocks = function (address) {
        return $http.get(apiBase + 'blocks');
    };

    this.getLatestPayments = function (address) {
        return $http.get(apiBase + 'payments');
    };

  })
  .controller('PoolController', function(poolService, $interval) {
    var vm = this;
    var statsInterval,
        blocksInterval,
        paymentsInterval;
    
    var currentOffset = new Date().getTimezoneOffset();
    vm.stats = {
        address: 'N/A',
        addressInfoLink: '#',
        coinSymbol: 'BTP',
        coinAlgorithm: 'Sha256',
        connectedMiners: 0,
        hashrate: 0,
        networkHashrate: 0,
        networkDifficulty: 0,
        totalPaid: 0,
        poolFeePercent: 0,
        minimumPayment: 0.1,
        payoutScheme: "PPLNS"
    };
    vm.minerInfo = null;
    vm.blocks = [];
    vm.payments = [];
    vm.miners = [];

    function convertToLocalDate(inDate){
        var result = new Date(inDate);
        return new Date(result.getTime() - (currentOffset * 60000));
    }

    vm.getMinerInfo = function(address){
        poolService.getMinerInfo(address).then(function (results) {
            if(results && results.data){
                var data = results.data;
                vm.minerInfo = {};
                var workerHashRate = 0;
                var workers = [];
                $.each(data.performance.workers, function (index, value) {
                    workerHashRate += value.hashrate;
                    workers.push({"label": index, "hashrate": _formatter(value.hashrate, 5, 'H/s')});
                });
                vm.minerInfo['pendingShares'] = _formatter(data.pendingShares, 0, '');
                vm.minerInfo['minerHashRate'] = _formatter(workerHashRate, 5, 'H/s');
                vm.minerInfo['pendingBalance'] = _formatter(data.pendingBalance, 5, '');
                vm.minerInfo['paidBalance'] = _formatter(data.totalPaid, 5, '');
                vm.minerInfo['lifetimeBalance'] = _formatter(data.pendingBalance + data.totalPaid, 5, '');
                vm.minerInfo['lastPaymentLink'] = data.lastPaymentLink;
                vm.minerInfo['lastPayment'] = convertToLocalDate(data.lastPayment).toLocaleString();
                vm.minerInfo['workers'] = workers;
            }
        }, function (error) {
            console.log("An error has occurred while processing your request");
        });
    };

    function updatePoolStats() {
        poolService.getPoolStats().then(function (results) {
            if(results && results.data){
                var data = results.data;

                var stats = data.stats;
                var performance = data.performance;

                vm.stats['connectedMiners'] = _formatter(stats.pool.poolStats.connectedMiners, 0, '');
                vm.stats['hashrate'] = _formatter(stats.pool.poolStats.poolHashrate, 5, 'H/s');
                vm.stats['networkHashrate'] = _formatter(stats.pool.networkStats.networkHashrate, 5, 'H/s');
                vm.stats['networkDifficulty'] = _formatter(stats.pool.networkStats.networkDifficulty, 5, '');
                vm.stats['address'] = stats.pool.address;
                vm.stats['addressInfoLink'] = stats.pool.addressInfoLink;
                vm.stats['poolFeePercent'] = stats.pool.poolFeePercent;
                vm.stats['totalPaid'] = _formatter(stats.pool.totalPaid, 5, '');
                vm.stats['coinSymbol'] = stats.pool.coin.type;
                vm.stats['coinAlgorithm'] = stats.pool.coin.algorithm;
                vm.stats['payoutScheme'] = stats.pool.paymentProcessing.payoutScheme;
                vm.stats['minimumPayment'] = stats.pool.paymentProcessing.minimumPayment;

                $.each(stats.pool.topMiners, function (index, value) {
                    value.hashrate = _formatter(stats.pool.poolStats.poolHashrate, 5, 'H/s');
                    value.sharesPerSecond = _formatter(value.sharesPerSecond, 5, 'S/s');
                    value['walletInfoLink'] = stats.pool.addressInfoLink.replace(stats.pool.address, value.miner);
                });

                var labels = [];
                var poolHashRate = [];
                $.each(performance.stats, function (index, value) {
                    if (labels.length === 0 || (labels.length + 1) % 4 === 1) {
                        labels.push(convertToLocalDate(value.created).toISOString().slice(11, 16));
                    } else {
                        labels.push('');
                    }
                    poolHashRate.push((value.poolHashrate / 1e12));
                });

                vm.miners = stats.pool.topMiners;
                
                _updateChart('Pool Hashrate in TH/s (Last 24h)', labels, poolHashRate);
            }
        }, function (error) {
            console.log("An error has occurred while processing your request");
        });        
    }

    function updateBlocks(){
        poolService.getLatestBlocks().then(function (results) {
            if(results && results.data){
                var data = results.data;
                $.each(data, function (index, value) {
                    value.networkDifficulty = _formatter(value.networkDifficulty, 5, '');
                    value.created = convertToLocalDate(value.created).toLocaleString();
                });
                vm.blocks = data;
            }
        }, function (error) {
            console.log("An error has occurred while processing your request");
        });        
    }

    function updatePayments(){
        poolService.getLatestPayments().then(function (results) {
            if(results && results.data){
                var data = results.data;
                $.each(data, function (index, value) {
                    value.created = convertToLocalDate(value.created).toLocaleString();
                });
                vm.payments = data;
            }
        }, function (error) {
            console.log("An error has occurred while processing your request");
        });        
    }

    statsInterval = $interval(updatePoolStats, 60000);
    blocksInterval = $interval(updateBlocks, 60000);
    paymentsInterval = $interval(updatePayments, 60000);

    updatePoolStats();
    updateBlocks();
    updatePayments();

    vm.$onDestroy = function () {
        $interval.cancel(statsInterval);
        $interval.cancel(blocksInterval);
        $interval.cancel(paymentsInterval);
    };

  });
