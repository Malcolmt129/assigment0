const axios = require('axios'); //needed for making HTTPS requests 
const url = "https://api.etherscan.io/api"; //basis of the url
const ps = require("prompt-sync");
const prompt = ps()

const key = prompt("Please enter your API key: ");
//firstbullet()
//secondbullet(0x192336f603b8e7bef43518108c39b8fb933c8eee60c0e242655138c8206259ef); 
secondbullet('0xbfe65cc2a2d3b6109ae5665c5d38c74c1035719506c60275390983a38f460b8b');   

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
                console.log("Current worth of ETH is $%s USD", usd);
                return usd;
            });
    
    conversion = ETH * USD;
    console.log("This wallet is worth $%s USD", conversion.toLocaleString()); //toLocaleString, converts the number to US english locale
}

async function secondbullet(hash) {
    var price, flag = await axios({
        method:'get',
        url: url,
        params: {
            module: 'proxy',
            action:'eth_getTransactionByHash',
            txhash:hash,
            apikey: key
        }
    }).then(function(response) {
        ethInWei = response.data.result['value'];
        eth = ethInWei / 10**18;
        return {
            price: eth,
            flag: response.data.result['to'] == '0x87a8c74dfa32e09700369584f5dfad1b5b653e2c'
        } 
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
        return usd;
    });
    conversion = USD * price;
    if (flag){
        console.log("Marlon Humphrey paid " + price + " ETH for this transcation. That is worth " + conversion.toLocaleString() + " today!");
    } else {
        console.log("Marlon Humphrey recieved " + price + " ETH for this transcation. That is worth " + conversion.toLocaleString() + " today!");
    }
    
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
