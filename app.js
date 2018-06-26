var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var helmet = require('helmet');
var compression = require('compression');

var indexRouter = require('./routes/content');
var apirouter = require('./routes/api');
var apiSdk = require('./lib/mining-core-sdk');

var config = {
  'URI': 'http://127.0.0.1:4000/api',
  'poolId': 'btp'
};

var apiRouter = new apirouter(config);
var app = express();
app.use(helmet());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(compression()); //Compress all routes
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

function refreshPoolStats(){
  var apiPool = global.apiPool;
  apiPool.getStats({}, function(error, data) {
    if(!error){
      global.poolStats = data;
    }else{
      console.log('An error has occurred while getting pool stats.');
    }
  });  
}

function refreshPoolPerformance(){
  var apiPool = global.apiPool;
  apiPool.getPerformance({}, function(error, data) {
    if(!error){
      global.poolPerformance = data;
    }else{
      console.log('An error has occurred while getting pool performance.');
    }
  });  
}

function refreshLatestBlocks(){
  var apiPool = global.apiPool;
  apiPool.getLatestBlocks({}, function(error, data) {
    if(!error){
      global.blocks = data;
    }else{
      console.log('An error has occurred while getting latest blocks.');
    }
  }); 
}

function refreshLatestPayments(){
  var apiPool = global.apiPool;
  apiPool.getLatestPayments({}, function(error, data) {
    if(!error){
      global.payments = data;
    }else{
      console.log('An error has occurred while getting latest blocks.');
    }
  }); 
}

app.runOnStartup = function() {
  console.log("Running MiningCore Explorer.");

  global.client = new apiSdk.client({'URI': config.URI, 'poolId': config.poolId});
  global.apiPool = new apiSdk.apiPool({ client: client });
  
  if (global.poolStats == null) {
		refreshPoolStats();
	}

  if (global.poolPerformance == null) {
		refreshPoolPerformance();
	}

  if (global.blocks == null) {
		refreshLatestBlocks();
	}

  if (global.payments == null) {
		refreshLatestPayments();
	}

	// refresh pool stats periodically
  setInterval(refreshPoolStats, 30000);
  setInterval(refreshPoolPerformance, 30000);
  setInterval(refreshLatestBlocks, 60000);
  setInterval(refreshLatestPayments, 60000);
}
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
