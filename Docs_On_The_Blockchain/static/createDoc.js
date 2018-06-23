const Web3 = require('web3');
let accounts;
let web3;

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

if (typeof window.web3 !== 'undefined') {
  // Use Mist/MetaMask's provider
  web3 = new Web3(window.web3.currentProvider);
  console.log('Found window.web3');
} else {
  console.log('No window.web3, using Infura');
  // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
  web3 = new Web3(new Web3.providers.HttpProvider(
      "https://rinkeby.infura.io/2jyiuMt1W9jiQa7b3y0w"
  ));
}

async function createDoc() {
  console.log('calling');
  accounts = await web3.eth.getAccounts();

  let myContract = new web3.eth.Contract(abi, address, { });
  let docData = asciiToHex(CKEDITOR.instances.editor1.getData());
  await  myContract.methods._storeDocument(docData, false).send();
  console.log('Done');
}