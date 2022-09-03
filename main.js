/*const axios = require('axios');
const url = "https://api.etherscan.io/api";
const key = '';

export function axios() {
    key = prompt("Please enter your API key: ")
    alert(`Your key is ${key}`)
}*/

const axios = require('axios');
const url = "https://api.etherscan.io/api";
const key = prompt('Please enter your API key: '); //Not the way to do it... need to fix

/**
 * This is function for the first bullet. Finding how much ETH is in an
 * associated wallet
 * 
 * @param {wallet} This is the wallet number that you will want to look for. 
 */ 

async function firstbullet(wallet){
    const config = {
        method: 'get',
        url: url,
        data: {
            module: 'account',
            action: 'balance',
            address: wallet,
            tag: 'latest',
            apikey: key
        }
    } //Have to finish the rest of the function.
}
