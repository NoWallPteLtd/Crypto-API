const express = require('express');
const router = express.Router();
const odinContractAddress = require('../libs/contractAddress');
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({ extended: false })

router.post('/', urlencodedParser, (req, res) => {
 
    
}
);

module.exports = router;