
const Web3 = require('web3');
const provider = require('../libs/provider');
const web3 = new Web3(new Web3.providers.HttpProvider(provider));
const ABI = require('../libs/ABI');

//Odin Contract Address
const contractAddress = require('../libs/contractAddress');

const Tx = require('ethereumjs-tx');
const gasPrice = web3.eth.gasPrice.toNumber() * 2;
var gasLimit = 200000;

const contract = web3.eth.contract(ABI).at(contractAddress);

module.exports = function sendTokenPromise(tokenContractAddress, sendToAddress, sendAmount, fromAddress, privateKey) {

    var pkBuffer = new Buffer.from(privateKey, 'hex')
    var nonce = web3.eth.getTransactionCount(fromAddress)

    return new Promise((resolve, reject) => {


        var rawTransaction = {
            "from": fromAddress,
            "nonce": nonce,
            "gasPrice": gasPrice,
            "gasLimit": gasLimit,
            "to": tokenContractAddress,
            "value": "0x0",
            "data": contract.transfer.getData(sendToAddress, sendAmount),
            "chainId": 3,
        };

        var tx = new Tx(rawTransaction);
        tx.sign(pkBuffer)
        var serializedTx = tx.serialize()
        //resolve('hi')
        async function sendRawTransaction() {  
            const hash = await web3.eth.sendRawTransaction('0x' + serializedTx.toString('hex')) 
            resolve (hash)
         }

         sendRawTransaction()
    })
};

