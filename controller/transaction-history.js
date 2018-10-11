var express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
// create application/json parser
const jsonParser = bodyParser.json()
// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false })
const contractAddress = require('../libs/contractAddress');
const Web3 = require('web3');
const ABI = require('../libs/ABI');
//const TransferTokens = require('./libs/TransferTokens');
const provider = require('../libs/provider');
const web3 = new Web3(new Web3.providers.HttpProvider(provider));


//This is the transaction history of Odin Coin
router.get('/transactionHistory', urlencodedParser, function(req, res){

	function transactionHistoryPromise(tokenContractAddress) { 
			return new Promise((resolve, reject) => {
				
			const tokenContract = web3.eth.contract(ABI).at(tokenContractAddress);
			var theParams = {fromBlock: 0, toBlock: 'latest'};
			var allResult = [];

				var transferEvent = tokenContract.transfer({},theParams);
				//var transferEvent = tokenContract.allEvents({},theParams);
				//var transferEvent = tokenContract.name;
				transferEvent.watch(function(err, result)
				{
					if (err) return reject(err);
					var items = {};
					items.records = result;
						items.status = true;
					allResult.push(items);

					return resolve(allResult);
				});
			});
	}

  	var AllOdinBalancePromise = new Promise((resolve, reject) =>
   	{
      	var theResult = transactionHistoryPromise(contractAddress);
		resolve(theResult);

   	});

  AllOdinBalancePromise.then(function(theResult)
  	{
    	res.send(theResult);
	  })
	  .catch(err => {res.send(err);console.log(err)})
  });

  module.exports = router;
