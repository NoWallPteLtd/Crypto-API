var expect = require('expect')
var chai = require('chai')
var chaiAsPromised = require("chai-as-promised")
chai.use(chaiAsPromised)
var expect = chai.expect

var chaiMatchPattern = require('chai-match-pattern');
chai.use(chaiMatchPattern);
var _ = chaiMatchPattern.getLodashModule();

describe('Private Key from Keystore Promise Module. privateKeyPromiseTest.js', () => {
    describe('privateKeyPromise.js Test. Input: password, keystore', () => {

        it('Promise returned hexadecimal password', () => {
            const getPrivateKeyfromKeyStore = require("../modules/getPasswordFromKeystorePromise")
            password = "kolkata123"
            // keyStore = '{"encSeed":{"encStr":"UirlTZ5TPnyURp63LfjtM2SnlagOYzRV0pMPDVnZop4ePsEbhdlUkziNLgoAI0fWrhPVQcXTopnbXOQilEqEdUKjoEPX748mrWwENPsxlYdHx0HjUU7pjyfHAwDCB/qdye9/4UN7mXiO4HrRRYjPO9hozFMyD/aJ86SLJQwcO9tQvTT4OjztUw==","nonce":"Om5rbVIV6Cq0FNp861UdZWUY8Ko9SndK"},"encHdRootPriv":{"encStr":"ySuaHRl0LvoJ6YDtrHSndfwHywbVmX0QmVfdRcmez/t1yCeZ1kVpbBBv8fM8nqpGYKwqxou1wlhfHsSmc1iYA4RL7iEO3Cypwd6WNF4eW17vPTdOPaau26usUyArl40rgQqCju1BgO4wc3p8w4EQvs0JxNPdftXuG4I45kM3FQ==","nonce":"IOZDo4bZ9FLlokSDmcWkNv2x3t+9U6BB"},"addresses":["440c90d5c5fe8a4a68069d3b57856b98350ad6db"],"encPrivKeys":{"440c90d5c5fe8a4a68069d3b57856b98350ad6db":{"key":"UIHKgUqpFOfR3IF+j8WiNonSHJFCwolMkH+MIEWlTY5pOGn5vN8B7cChGuTx4gMg","nonce":"XqPEG7KEBCDVnwtO6UmqyasS/RTLfMKo"}},"hdPathString":"m/44\'/60\'/0\'/0","salt":"mpSIIpUuEyZIqmE44FfvOHIuqsqg+IUO3DuIRtoc84k=","hdIndex":1,"version":3}'
            keyStore = JSON.stringify({"encSeed":{"encStr":"wWGZCCNEyHoCwkSZZ+gLJPrUlkuAWJvJTgHBUaAc2OA0ZAYdBWQRsp5zMatcm53MPkCKKwOxefX2v1bP/DKyiag56LmcP7Boy9JkLTf18+/9aQsDY4OP9hggeR8HHHpgOcW+0GUBNj39OznhIctj7H4cxDLtZwXEyreoMaesH945l/GyXa1hiw==","nonce":"56wFKRmIM6f2HY8VFX5DJ9SdouCTlN+s"},"encHdRootPriv":{"encStr":"gFibhWykILpHl+aD6prrU3iInj7PFrvmmNWO7NZXebf6TAHiOPaEiYb/w7CHWrxWN6GbeADN3fs+DdPTd03cALKTfC4Bci8ORSSiDu4C4FkFSiwb4qppb/a/6X3pisu8GSouF3+uQRFfAlQLq6wCymoP5oaQi5PjIM/l7uPVpg==","nonce":"U54esNxbQ0/87TVNM9oR+eci3vNJhMCh"},"addresses":["e428fc0a0543bc84c30f0df6a95f34de7ed107b1"],"encPrivKeys":{"e428fc0a0543bc84c30f0df6a95f34de7ed107b1":{"key":"+aqj9tXGtVedZM7AcOAksJKkHZWDJXo7lTshMOhrqDjaHoGJZCzh06C3L+s5PZAm","nonce":"o81ThQvK3hlo3GbpNjS4zVIFT0CfgoNH"}},"hdPathString":"m/44'/60'/0'/0","salt":"oK8MzEw/rN/bNfxdTH7MwMqogMeU9hcuyW3hcP9BvHI=","hdIndex":1,"version":3})
            
            return getPrivateKeyfromKeyStore(password, keyStore).then((result) => {
                /*
                expect(result).to.matchPattern(`{
                  "ethBalance": _.isNumber,
                  }`)
                */
                console.log("\tprivate key is :" + result)
            })
                .catch((err) => console.log("\tError at privateKeyPromiseTest: " + err.message))
        })
    })
})
