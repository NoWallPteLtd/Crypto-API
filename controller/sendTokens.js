const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const urlencodedParser = bodyParser.urlencoded({ extended: false })
const ABI = require('../libs/ABI');
const contractAddress = require('../libs/contractAddress');
const Tx = require('ethereumjs-tx');
var Web3 = require('web3');
const provider = require('../libs/provider');
const passwordHash = require('sha256');
const lightwallet  = require('eth-lightwallet');
const hdPath =  require('../libs/path');


var web3 = new Web3(new Web3.providers.HttpProvider(provider));

//keystore untested
router.post('/transactions/sendTokens', urlencodedParser, function(req, res){
 //console.log(req);
 try {
    
     web3.setProvider(new Web3.providers.HttpProvider(provider));

     //previously without keystore 
    //please note that privateKey and publicKey should be from a wallet. However this is from the browser for now    
    //const privateKey = req.body.privateKey;

    const tokenAmount  = req.body.amount;
    const toAddress = req.body.toAddress;
    const gasPrice = web3.eth.gasPrice.toNumber() * 2;
    const fromAddress = req.body.fromAddress;
    
    //with keystore
    //var password = passwordHash(req.body.password); 
    var password = passwordHash(req.body.password)
    console.log("password is " + password) 
    //console.log("req keystore is " + req.body.keyStore)
   
    var keystore = lightwallet.keystore.deserialize(req.body.keyStore);
    console.log ("keystore is " + keystore)
  

    //get private key
   var privateKeyPromise = new Promise(function (resolve, reject) {
    keystore.keyFromPassword(password, function(err, pwDerivedKey) {
      if (err) return reject(err);
      var address = keystore.getAddresses()[0];
      console.log ("inside address is " + address)
      console.log ("pwDerivedKey is " + pwDerivedKey)
      var returnKey = keystore.exportPrivateKey(address, pwDerivedKey, hdPath);
      console.log("return key is " + returnKey);
      return resolve(returnKey);
      
    })
  })
  privateKeyPromise.then(function(returnKey){
   var nonce = web3.eth.getTransactionCount(fromAddress);
   var gasLimit = 200000;
   const contract = web3.eth.contract(ABI).at(contractAddress);
     
    console.log("returnKey is " + returnKey)
    var pkBuffer = new Buffer.from(returnKey, 'hex')
    console.log("pkBuffer is " + pkBuffer)

    function sendTokenPromise(contractAddress, sendToAddress, sendAmount) { 
        return new Promise((resolve, reject) => {

          var rawTransaction = {
            "from": fromAddress,
            "nonce": nonce,
            "gasPrice": gasPrice,
            "gasLimit": gasLimit,
            "to": contractAddress,
            "value": "0x0",
            "data": contract.transfer.getData(sendToAddress, sendAmount, {from: fromAddress}),
            //"chainId": 5780,
            "chaindID" : 3,
            };
            console.log ("raw Transaction is " + rawTransaction)
            var tx = new Tx(rawTransaction);
            console.log ("tx is " + tx )
            console.log ("pkBuffer inside is " + pkBuffer)
            tx.sign(pkBuffer);
            console.log ("tx 2 is " + tx )
            console.log("fromAddress is " + fromAddress)

            var serializedTx = tx.serialize();

            console.log ("serializedTX is " + serializedTx)

          web3.eth.sendRawTransaction('0x' + serializedTx.toString('hex'), function(err, hash){

            if (err) return reject(err);
            return resolve(hash);
          });
        });
      }

      var OdinPromise = new Promise(function (resolve, reject) {
        var tx = sendTokenPromise(contractAddress, toAddress, tokenAmount);
        resolve(tx);
      })
      OdinPromise.then(function(tx){
        var OdintxHash = {}
        OdintxHash['result'] = tx;
        OdintxHash['status'] = true
        //items.walletID = walletID;
        //seedObj.push(items);
         res.send(OdintxHash);
        //res.send(tx);
      });
      OdinPromise.catch(function(err){
     var txSt={};
     txSt.status = false;
     res.send(txSt)

    })
  })
  } catch (err) {
   console.log(err.message);
   var txStatus = {};
    txStatus.status = "false"
    console.log(txStatus);
    res.send(txStatus);
  }
  finally{
   //Check Timestamp for logs
   var time = new Date(Date.now()).toUTCString();
   console.log("SendTokens.js [sendTokens] Executed at UTC Time :" + time);
  }}
  );

router.post('/transactions/sendEth', urlencodedParser, function(req, res){
    //console.log(req);
    try {
       
        web3.setProvider(new Web3.providers.HttpProvider(provider));
   
        //previously without keystore 
       //please note that privateKey and publicKey should be from a wallet. However this is from the browser for now    
       //const privateKey = req.body.privateKey;
   
       //const tokenAmount  = req.body.amount;
       const ethAmount  = req.body.amount;
       const toAddress = req.body.toAddress;
       const gasPrice = web3.eth.gasPrice.toNumber() * 2;
       const fromAddress = req.body.fromAddress;

       //with keystore
       //var password = passwordHash(req.body.password); 
       var password = passwordHash(req.body.password)
       console.log("password is " + password) 
       //console.log("req keystore is " + req.body.keyStore)
      
       var keystore = lightwallet.keystore.deserialize(req.body.keyStore);
       console.log ("keystore is " + keystore)
     
   
       //get private key
      var privateKeyPromise = new Promise(function (resolve, reject) {
       keystore.keyFromPassword(password, function(err, pwDerivedKey) {
         if (err) return reject(err);
         var address = keystore.getAddresses()[0];
         console.log ("inside address is " + address)
         console.log ("pwDerivedKey is " + pwDerivedKey)
         var returnKey = keystore.exportPrivateKey(address, pwDerivedKey, hdPath);
         console.log("return key is " + returnKey);
         return resolve(returnKey);
         
       })
     })

      privateKeyPromise
      .then(function(returnKey){``
        console.log("from Address is " + fromAddress)
        var nonce = web3.eth.getTransactionCount(fromAddress);
        console.log ("nonce is " + nonce)
        var gasLimit = 200000;
        const contract = web3.eth.contract(ABI).at(contractAddress);
          
        console.log("returnKey is " + returnKey)
        var pkBuffer = new Buffer.from(returnKey, 'hex')
        console.log("pkBuffer is " + pkBuffer)
    
        //function sendTokenPromise(contractAddress, sendToAddress, sendAmount) { 
          function sendEthPromise(toAddress, ethAmount, fromAddress) { 
            
              return new Promise((resolve, reject) => {
    
              var rawTransaction = {
                "from": fromAddress,
                "nonce": nonce,
                "gasPrice": gasPrice,
                "gasLimit": gasLimit,
                "to": toAddress,
                //"value": "0x0",
                "value" :  web3.toHex( web3.toWei(ethAmount), 'ether'),
                //"data": contract.transfer.getData(sendToAddress, sendAmount, {from: fromAddress}),
                //"chainId": 5780,
                "chaindID" : 3,
                };
                console.log ("raw Transaction is " + rawTransaction)
                var tx = new Tx(rawTransaction);
                console.log ("tx is " + tx )
                console.log ("pkBuffer inside is " + pkBuffer)
                tx.sign(pkBuffer);
                console.log ("tx 2 is " + tx )
                console.log("fromAddress is " + fromAddress)
                console.log("tx is " + tx)
                var serializedTx = tx.serialize();
    
                console.log ("serializedTX is " + serializedTx)
    
              web3.eth.sendRawTransaction('0x' + serializedTx.toString('hex'), function(err, hash){
    
                if (err) return reject(err);
                return resolve(hash);
              });
            });
          }
    
          var ethPromise = new Promise(function (resolve, reject) {
            var tx = sendEthPromise(toAddress, ethAmount, fromAddress);
            resolve(tx);
          })
          ethPromise.then(function(tx){
            var ethTxHash = {}
            ethTxHash['result'] = tx;
            ethTxHash['status'] = true
            //items.walletID = walletID;
            //seedObj.push(items);
              res.send(ethTxHash);
            //res.send(tx);
          });
          ethPromise.catch(function(err){
          var txSt={};
          txSt.status = false;
          res.send(txSt)
          res.send(err.message)
    
        })
      })
      .catch((err)=>{
        console.log(err.message)
        res.send(err.message)
      })
     } catch (err) {
      console.log(err.message);
      var txStatus = {};
       txStatus.status = "false"
       console.log(txStatus);
       res.send(txStatus);
     }
     finally{
      //Check Timestamp for logs
      var time = new Date(Date.now()).toUTCString();
      console.log("SendTokens.js [sendTokens] Executed at UTC Time :" + time);
     }}
     );


module.exports = router;