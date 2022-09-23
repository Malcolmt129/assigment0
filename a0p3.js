
const axios = require('axios'); //needed for making HTTPS requests 
const url = 'https://rest.coinapi.io';
const ps = require('prompt-sync');
const prompt = ps();

const key = prompt('Please enter your API key: ');


/**
 * ===================================================================
 * Below is all the code needed to execute the first bullet of part III
 * 
 *====================================================================
 */

//firstbullet("BTC");
//firstbullet("ETH");
//firstbullet("SOL");
//firstbullet("ADA");




/**
 * Below is all the code needed to execute the second bullet of part III
 */

//secondbullet("01 March 2020 00:00 GMT-0500");
//secondbullet("30 March 2020 00:00 GMT-0400");
//secondbullet("01 May 2017 00:00 GMT-0400");
//secondbullet("29 January 2021 00:00 GMT-0500");




/**
 * 
 * @param {String} coin This is the name of the coin that you want to find the current rate of. 
 */
async function firstbullet(coin) {    
    var path = url + ("/v1/exchangerate/" + coin + "/USD");
    var rate = await axios({
        method: 'get',
        url: path,
        params: {},
        headers:{'X-CoinAPI-Key': key},
        })
        .then(function(response){
            return response.data["rate"];
        }); 
    const localeRate = rate.toLocaleString();
    console.log(`The current exchange rate for ${coin} to USD is $${localeRate}`);
    return localeRate;
}

async function secondbullet(time) { 
    const convert = new Date(time);
    const day = convert.toISOString()
    console.log(day);   
    var path = url + ("/v1/exchangerate/BTC/USD");
    var rate = await axios({
        method: 'get',
        url: path,
        params: {time:day},
        headers:{'X-CoinAPI-Key': key},
        })
        .then(function(response){
            return response.data["rate"];
        }); 
    const localeRate = rate.toLocaleString();
    console.log(`The exchange rate for Bitcoin to USD on ${time} was $${localeRate}`);
    return localeRate;
}


