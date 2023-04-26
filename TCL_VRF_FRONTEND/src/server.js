/*
The `piggybankContract` is compiled from:

  pragma solidity ^0.4.0;
  contract PiggyBank {

      uint private balance;
      address public owner;

      function PiggyBank() public {
          owner = msg.sender;
          balance = 0;
      }

      function deposit() public payable returns (uint) {
          balance += msg.value;
          return balance;
      }

      function withdraw(uint withdrawAmount) public returns (uint remainingBal) {
          require(msg.sender == owner);
          balance -= withdrawAmount;

          msg.sender.transfer(withdrawAmount);

          return balance;
      }
  }
*/
import 'js-loading-overlay'

var QRCode = require('qrcode')
const connection_status = document.getElementById('connection_status')
window.addEventListener('load', function() {

    // Check if Web3 has been injected by the browser (Mist/MetaMask).
    if (typeof web3 !== 'undefined') {
        console.log('installed')
    } else {
        connection_status.innerHTML = 'Metamask is not installed.<a target=\'_blank\' href=\'https://metamask.io/\'> click here</a> to install'
        console.log('not installed')
    }

});


window.ethParser = require('eth-url-parser');
const BASE_URL = 'https://metamask.app.link';
import MetaMaskOnboarding from '@metamask/onboarding'
var Web3j =require('web3');
let paramFields = [];
var fs = require('fs');


window.mobileCheck = function() {
    let check = false;
    (function(a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
};

const isMobile = mobileCheck();

// var log4js = require("log4js");
// var logger = log4js.getLogger();
// logger.info("Cheese is Comté.");


window.addNewParam = function() {
    const ts = Date.now();

    const newKeyField = document.createElement("input");
    newKeyField.type = "text";
    newKeyField.name = `key_${ts}`;
    newKeyField.id = newKeyField.name;
    newKeyField.placeholder = "Key";
    newKeyField.classList.add("field");
    newKeyField.classList.add("short-field");

    const newValField = document.createElement("input");
    newValField.type = "text";
    newValField.name = `val_${ts}`;
    newValField.id = newValField.name;
    newValField.placeholder = "Value";
    newValField.class = "field short-field";
    newValField.classList.add("field");
    newValField.classList.add("short-field");

    const row = document.createElement("p");
    row.classList.add("param-row");
    row.appendChild(newKeyField);
    row.appendChild(newValField);

    paramFields.push(ts);
    document.getElementById("params-container").appendChild(row);
}


document.getElementById("decimals").style.display = "none";
addNewParam();
document.getElementById(`key_${paramFields[0]}`).value = "value";
document.getElementById(`key_${paramFields[0]}`).style.display = "none";
document.getElementById(`val_${paramFields[0]}`).placeholder =
    "Amount in USD";
document.getElementById(`val_${paramFields[0]}`).type = "number";


const currentUrl = new URL(window.location.href)
const forwarderOrigin = currentUrl.hostname === 'localhost' ?
    'http://localhost:9010' :
    undefined

const isMetaMaskInstalled = () => {
    const { ethereum } = window
    return Boolean(ethereum && ethereum.isMetaMask)
}

// Dapp Status Section
const networkDiv = document.getElementById('network')
const chainIdDiv = document.getElementById('chainId')
const accountsDiv = document.getElementById('accounts')
const buymessage = document.getElementById('buymessage')


const usdtfield = document.getElementById('usdt')
const ethfield = document.getElementById('eth')
const ethfield2 = document.getElementById('eth2')
const ethinput = document.getElementById('ethinput')
const token = document.getElementById('token')
const addtoken = document.getElementById('addtoken')
const generatePaymentUrlbtn = document.getElementById('generatePaymentUrl')


// Basic Actions Section
const onboardButton = document.getElementById('connectButton')
const getAccountsButton = document.getElementById('getAccounts')
const getAccountsResults = document.getElementById('getAccountsResult')

// Permissions Actions Section
const requestPermissionsButton = document.getElementById('requestPermissions')
const getPermissionsButton = document.getElementById('getPermissions')
const permissionsResult = document.getElementById('permissionsResult')
const fordesktop1 = document.getElementById('permissionsResult')



// Send Eth Section
const sendButton = document.getElementById('sendButton')
var current_price
const initialize = async() => {

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", 'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd ', false); // false for synchronous request
    xmlHttp.send(null);
    var jsonvalue= xmlHttp.responseText
    var obj = JSON.parse(jsonvalue);
    current_price = obj.ethereum.usd //1 ether =?usdt
    console.log("current ETH: "+current_price)




    if (isMobile) {
        document.getElementById("fordesktop1").style.display = "none";
        document.getElementById("walletstatus").style.display = "none";
        document.getElementById("connectWalletButton").style.display = "none";
        document.getElementById("desktopapp").style.display = "none";
        document.getElementById("desktopitem").style.display = "none";




    } else {
        document.getElementById("formobile").style.display = "none";
    }


    let onboarding
    try {
        onboarding = new MetaMaskOnboarding({ forwarderOrigin })
    } catch (error) {
        console.error(error)
    }

    let accounts
    let accountButtonsInitialized = false

    const accountButtons = [
        sendButton,
    ]

    const isMetaMaskConnected = () => accounts && accounts.length > 0

    const onClickInstall = () => {

        onboardButton.innerText = 'Onboarding in progress'
        onboardButton.disabled = true
        onboarding.startOnboarding()
    }

    const onClickConnect = async() => {
        try {
            const newAccounts = await ethereum.request({
                method: 'eth_requestAccounts',
            })
            handleNewAccounts(newAccounts)
        } catch (error) {
            console.error(error)
        }
    }

    const clearTextDisplays = () => {
        encryptionKeyDisplay.innerText = ''
        encryptMessageInput.value = ''
        ciphertextDisplay.innerText = ''
        cleartextDisplay.innerText = ''
    }

    const updateButtons = () => {
        const accountButtonsDisabled = !isMetaMaskInstalled() || !isMetaMaskConnected()
        if (accountButtonsDisabled) {
            for (const button of accountButtons) {
                button.disabled = true
            }
            clearTextDisplays()
        } else {
            sendButton.disabled = false
        }

        if (!isMetaMaskInstalled()) {
            onboardButton.innerText = 'Click here to install MetaMask!'
            onboardButton.onclick = onClickInstall
            onboardButton.disabled = false
        } else if (isMetaMaskConnected()) {
            connection_status.innerHTML = 'Connected!'
            onboardButton.innerText = 'Connected'
            onboardButton.disabled = true
            if (onboarding) {
                onboarding.stopOnboarding()
            }
        } else {
            connection_status.innerHTML = 'Please Connect Metamask!'
            onboardButton.innerText = 'Connect'
            onboardButton.onclick = onClickConnect
            onboardButton.disabled = false
        }
    }

    const initializeAccountButtons = () => {

        if (accountButtonsInitialized) {
            return
        }
        accountButtonsInitialized = true



        /**
         * request Permissions
         */

        requestPermissionsButton.onclick = async() => {
            try {
                const permissionsArray = await ethereum.request({
                    method: 'wallet_requestPermissions',
                    params: [{ eth_accounts: {} }],
                })
                permissionsResult.innerHTML = getPermissionsDisplayString(permissionsArray)
            } catch (err) {
                console.error(err)
                permissionsResult.innerHTML = `Error: ${err.message}`
            }
        }

        /**
         * get permission
         */

        // getPermissionsButton.onclick = async() => {
        //     try {
        //         const permissionsArray = await ethereum.request({
        //             method: 'wallet_getPermissions',
        //         })
        //         permissionsResult.innerHTML = getPermissionsDisplayString(permissionsArray)
        //     } catch (err) {
        //         console.error(err)
        //         permissionsResult.innerHTML = `Error: ${err.message}`
        //     }
        // }

        /**
         * get address
         */


        // getAccountsButton.onclick = async() => {
        //     try {
        //         const _accounts = await ethereum.request({
        //             method: 'eth_accounts',
        //         })
        //         getAccountsResults.innerHTML = _accounts[0] || 'Not able to get accounts'
        //     } catch (err) {
        //         console.error(err)
        //         getAccountsResults.innerHTML = `Error: ${err.message}`
        //     }
        // }

        /**
         * Sending ETH
         */

        sendButton.disabled = false

        // sendButton.onclick = () => {
        //     // web3.eth.sendTransaction({
        //     //     from: accounts[0],
        //     //     to: '0xE128b52aC42b78d4b0FDCA684e1CBc2C2DBcD74e',
        //     //     value: weiValue,

        //     // }, (result) => {
        //     //     console.log(result)
        //     // })
        //     // using the promise
        //     web3.eth.sendTransaction({
        //             from: accounts[0],
        //             to: '0xE128b52aC42b78d4b0FDCA684e1CBc2C2DBcD74e',
        //             value: weiValue,
        //         }, (result) => {
        //             console.log("result")
        //             console.log(result)
        //         })
        //         .then(function(receipt) {
        //             console.log("receipt")
        //             console.log(receipt)
        //         });
        // }
      
        sendButton.onclick = () => {
            JsLoadingOverlay.show({
                "overlayBackgroundColor": "#08244F",
                "overlayOpacity": 0.8,
                "spinnerIcon": "timer",
                "spinnerColor": "#F9F3F3",
                "spinnerSize": "2x",
                "overlayIDName": "overlay",
                "spinnerIDName": "spinner",
                "offsetX": 0,
                "offsetY": 0,
                "containerID": null,
                "lockScroll": false,
                "overlayZIndex": 9998,
                "spinnerZIndex": 9999,
                "text":"loading"
              });
          

            var valueofether = new String()
            var usdvalue = document.getElementById('usdt').value
            var tokenvalue = (1 / 0.02) * usdvalue;
            if (usdvalue.value == '') {
                usdvalue = '0'
            } else {
                var ether_value = (1 / current_price) * usdvalue
                valueofether = roundNumber(ether_value, 4)
                valueofether = '' + valueofether
            }

            const weiValue = Web3j.utils.toWei(valueofether, 'ether');
            web3.eth.sendTransaction({
                from: accounts[0],
                to: '0x0bF89BC52dee9862c889891b00F9a5DA8761e787',
                value: weiValue,
            }, function(error, hash) {
                if (error) {
                    buymessage.innerHTML = "You rejected the payment"
                    JsLoadingOverlay.hide();

                } else {
                    //alert('Redirecting to Submit Transaction Details..')
                    buymessage.innerHTML = "You Bought " + tokenvalue + " BTCA. Please Note the transaction Hash '" + hash + "'"
                    JsLoadingOverlay.hide();
                    window.open('https://docs.google.com/forms/d/e/1FAIpQLSeYKzY1sFg-VBN_xii6VAO5fHiVo0ugJjjbkvHTYkEhmBnGeQ/viewform?usp=sf_link','_blank')

                }
                console.log(error);
                console.log(hash);
            });




        }

        // generatePaymentUrlbtn.onkeyup = async() => {

        // }










    }

    addtoken.onclick = () => {
        const tokenAddress = '0x7db02aa39a3d0271e4c61c04d03857a10fc922c5';
        const tokenSymbol = 'BTCA';
        const tokenDecimals = 18;
        const tokenImage = 'https://dl.dropboxusercontent.com/s/5n8yi0p403mff5y/about_icon.png';

        try {
            // wasAdded is a boolean. Like any RPC method, an error may be thrown.
            const wasAdded = ethereum.request({
                method: 'wallet_watchAsset',
                params: {
                    type: 'ERC20', // Initially only supports ERC20, but eventually more!
                    options: {
                        address: tokenAddress, // The address that the token is at.
                        symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
                        decimals: tokenDecimals, // The number of decimals in the token
                        image: tokenImage, // A string url of the token logo
                    },
                },
            });

            if (wasAdded) {
                console.log('Thanks for your interest!');
            } else {
                console.log('Your loss!');
            }
        } catch (error) {
            console.log(error);
        }
    }


    function handleNewAccounts(newAccounts) {
        accounts = newAccounts
        accountsDiv.innerHTML = accounts
        if (isMetaMaskConnected()) {
            initializeAccountButtons()
        }
        updateButtons()
    }

    function handleNewChain(chainId) {
        chainIdDiv.innerHTML = chainId
    }

    function handleNewNetwork(networkId) {
        networkDiv.innerHTML = networkId
    }

    async function getNetworkAndChainId() {
        try {
            const chainId = await ethereum.request({
                method: 'eth_chainId',
            })
            handleNewChain(chainId)

            const networkId = await ethereum.request({
                method: 'net_version',
            })
            handleNewNetwork(networkId)
        } catch (err) {
            console.error(err)
        }
    }


    if (isMetaMaskInstalled()) {

        ethereum.autoRefreshOnNetworkChange = false
        getNetworkAndChainId()

        ethereum.on('chainChanged', handleNewChain)
        ethereum.on('networkChanged', handleNewNetwork)
        ethereum.on('accountsChanged', handleNewAccounts)

        try {
            const newAccounts = await ethereum.request({
                method: 'eth_accounts',
            })
            handleNewAccounts(newAccounts)
        } catch (err) {
            console.error('Error on init when getting accounts', err)
        }
    }



}

window.addEventListener('DOMContentLoaded', initialize)

function getPermissionsDisplayString(permissionsArray) {
    if (permissionsArray.length === 0) {
        return 'No permissions found.'
    }
    const permissionNames = permissionsArray.map((perm) => perm.parentCapability)
    return permissionNames.reduce((acc, name) => `${acc}${name}, `, '').replace(/, $/u, '')
}

function renderUrl(url) {
    document.getElementById("url").href = url;
    document.getElementById("url").innerText = url;

    const baseImgUrl = 'http://api.qrserver.com/v1/create-qr-code/?color=000000&bgcolor=FFFFFF&data=${DATA}&qzone=1&margin=0&size=250x250&ecc=L';
    const qrCodeUrl = baseImgUrl.replace('${DATA}', escape(url));

    // if (document.getElementById("qr-wrapper").firstElementChild) {
    //     const img = document.getElementById("qr-wrapper").firstElementChild;
    //     img.src = qrCodeUrl;
    // } else {
    //     const img = document.createElement("img");
    //     img.src = qrCodeUrl
    //     document.getElementById("qr-wrapper").appendChild(img);
    // }
}


function generatePaymentUrl(ether_value) {
    const url_scheme = "ethereum";
    let prefix = null
    const target_address = '0x0bF89BC52dee9862c889891b00F9a5DA8761e787'
    const chain_id =
        document.getElementById("chain_id").value !== "" ?
        document.getElementById("chain_id").value :
        null;
    const function_name =
        document.getElementById("function_name").value !== "" ?
        document.getElementById("function_name").value :
        null;
    const decimals =
        document.getElementById("decimals").value !== "" ?
        document.getElementById("decimals").value :
        18;
    let params = {};

    paramFields.forEach(ts => {
        const key = document.getElementById(`key_${ts}`).value;
        let val = ether_value //document.getElementById(`val_${ts}`).value;
            //console.log(document.getElementById(`key_${ts}`).id)
        if (key === "value" && !function_name) {
            if (val !== "") {
                val += "e18";
            }
        }
        if (key === "uint256") {
            if (val !== "") {
                val += `e${decimals}`;
            }
        }
        if (val !== "") {
            params[key] = val;
        }
    });



    try {
        const data = {
            scheme: url_scheme,
            prefix,
            target_address,
            chain_id,
            function_name,
            parameters: params
        };

        const url = ethParser.build(data);
        console.log(url)
        var a = document.getElementById('url'); //or grab it by tagname etc
        var tt = url.replace('ethereum:', `${BASE_URL}/send/`)
        a.href = tt

        //renderUrl(url.replace('ethereum:', `${BASE_URL}/send/`));

    } catch (e) {
        alert(e.toString());
    }
}

function roundNumber(num, dec) {
    return Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
}
var docs = ''
paramFields.forEach(ts => {
    const key = document.getElementById(`key_${ts}`).value;
    let val = document.getElementById(`val_${ts}`).value;
    docs = document.getElementById(`val_${ts}`)

});

var keyid = docs.id

document.getElementById(keyid).setAttribute("style", "font-size: 19px;height: 55px;background-color: #776c6c00;color: white;")
    // console.log(document.getElementById(keyid).classList)
document.getElementById(keyid).classList.add('form-control')
    // console.log(document.getElementById(keyid).classList)
var vv = document.getElementById(keyid)

vv.onkeyup = async() => {
    ethfield2.innerHTML = 'Loading ether value'
    var usdvalue = vv.value

    // console.log('typed' + usdvalue)
    var tokenvalue = (1 / 0.02) * usdvalue;
    token2.innerHTML = tokenvalue + " BTCA";
    // var xmlHttp = new XMLHttpRequest();
    // xmlHttp.open("GET", 'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd', false); // false for synchronous request
    // xmlHttp.send(null);
    // var jsonvalue = xmlHttp.responseText

    // var obj = JSON.parse(jsonvalue);
    // var current_price = obj.ethereum.usd //1 ether =?usdt
    var ether_value = (1 / current_price) * usdvalue
    ethinput2.value = roundNumber(ether_value, 4)
    ethfield2.innerHTML = roundNumber(ether_value, 4) + " ETH"
    generatePaymentUrl(ether_value)

}

usdtfield.onkeyup = async() => {
    ethfield.innerHTML = 'Loading ether value'
    var usdvalue = document.getElementById('usdt').value
    console.log('typed' + usdvalue)
    var tokenvalue = (1 / 0.02) * usdvalue;
    token.innerHTML = tokenvalue + " BTCA";
    // var xmlHttp = new XMLHttpRequest();
    // xmlHttp.open("GET", 'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd ', false); // false for synchronous request
    // xmlHttp.send(null);
    // var jsonvalue = xmlHttp.responseText

    // var obj = JSON.parse(jsonvalue);
    // var current_price = obj.ethereum.usd //1 ether =?usdt
    var ether_value = (1 / current_price) * usdvalue
    ethinput.value = roundNumber(ether_value, 4)
    ethfield.innerHTML = roundNumber(ether_value, 4) + " ETH"


}


var canvas = document.getElementById('canvas')

QRCode.toCanvas(canvas, '0x0bF89BC52dee9862c889891b00F9a5DA8761e787', function(error) {
    if (error) console.error(error)
    console.log('success!');
})
document.getElementById('addresseth').innerHTML = '0x0bF89BC52dee9862c889891b00F9a5DA8761e787'




$(window).on('load', function() {
    var preLoder = $(".loader-wrapper");
    preLoder.delay(100).fadeOut(50);
    $('body').addClass('loaded');
});
