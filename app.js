const express = require('express')
const app = express()
const port = 3000

//for testing connections etc
app.use('/', require('./test/libConnectionTest.js'));
app.use('/test', require('./test/postTest.js'))
app.use('/ctest', require('./test/ethNodeConnectionTest.js'));

app.use('/balances', require('./controller/checkBalance.js'));
app.use('/transactions', require('./controller/DefaultSend.js'));
app.use('/tokens', require('./controller/sendTokens.js'));
app.use('/history', require('./controller/transaction-history.js'));
app.use('/router', require('./controller/router.js'));

app.listen(port, () => console.log(`Trial: listening on port ${port}!`))