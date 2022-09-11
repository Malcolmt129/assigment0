const axios = require('axios'); //needed for making HTTPS requests 
const url = "https://api.etherscan.io/api"; //basis of the url
const ps = require("prompt-sync");
const prompt = ps()

const key = prompt("Please enter your API key: ");

thirdbullet();      

/**
 * This is function for the first bullet. 
 * 
 * First the function finds out how much ETH is in the wallet
 * Then the function finds out how much 1 ETH is worth in USD
 * Finally the function converts ETH to USD. 
 * 
 * @param {wallet} This is the wallet number that you will want to look for. 
 * 
 * Currently taking this param out so that professor Jal can just run the code quickly
 * instead of having to type in the wallet number as well. 
 */ 

async function firstbullet(){
    var ETH = await axios({
                method: 'get',
                url: url,
                params: {
                    module: 'account',
                    action: 'balance',
                    address:'0x00000000219ab540356cbb839cbe05303d7705fa',
                    tag:'latest',
                    apikey:key
                } //Params is what appends to the base url... not data! It works now.
            }).then(function (response) {
                ethInWei = response.data['result'] //result is given in Wei
                eth = ethInWei / 10**18 //Converting out Wei to display in ETH
                console.log("The amount of ETH in the wallet is %s ", eth);
                return eth;
            }); 
    

    var USD = await axios({
                method:'get',
                url: url,
                params: {
                    module: 'stats',
                    action: 'ethprice',
                    apikey: key
                }
            }).then(function(response) {
                usd = response.data['result']['ethusd'];
                console.log("Current worth of ETH is %s USD", usd);
                return usd;
            });
    
    conversion = ETH * USD;
    console.log("This wallet is worth $%s USD", conversion.toLocaleString()); //toLocaleString, converts the number to US english locale
}

function secondbullet() {
    
}


/**
 * This is the third bullet function where I use the EtherScan API
 * to find the current price of ETH/USD and ETH/BTC
 * 
 * 
 */
async function thirdbullet(){
    await axios({
        method:'get',
        url: url,
        params: {
            module: 'stats',
            action: 'ethprice',
            apikey: key
        }
    }).then(function(response) {
        usd = Number(response.data['result']['ethusd']);
        btc = Number(response.data['result']['ethbtc']);
        console.log("Current worth of ETH is $%s USD", usd.toLocaleString());
        console.log("Current worth of ETH in bitcoin is %s BTC", btc.toLocaleString());
        return usd;
    });
}
