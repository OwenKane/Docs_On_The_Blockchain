const Web3 = require('web3');
let accounts;
let web3;

web3 = new Web3(window.web3.currentProvider);
const address = '0x159761E018B920Ca930f71e86E1Ba86eAE818C4F';
const abi = [
  {
    "constant": false,
    "inputs": [
      {
        "name": "_docText",
        "type": "bytes32"
      },
      {
        "name": "_isEncrypted",
        "type": "bool"
      }
    ],
    "name": "_storeDocument",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_docId",
        "type": "uint256"
      }
    ],
    "name": "_getDoc",
    "outputs": [
      {
        "name": "",
        "type": "bytes32"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "docs",
    "outputs": [
      {
        "name": "docText",
        "type": "bytes32"
      },
      {
        "name": "isEncrypted",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "docToOwner",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }
];


async function asyncCall() {
  console.log('calling');
  accounts = await web3.eth.getAccounts();

  let myContract = new web3.eth.Contract(abi, address, { });
  await  myContract.methods._storeDocument('Hello World', false).send();
}

asyncCall();
