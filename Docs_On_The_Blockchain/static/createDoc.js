const Web3 = require('web3');
let accounts;
let web3;

const address = '0xf4BBF8365ACAE4dbe0b131c5BE3d8297A70dA573';
const abi = [
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
				"type": "string"
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
		"constant": false,
		"inputs": [
			{
				"name": "_docText",
				"type": "string"
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
				"name": "",
				"type": "address"
			},
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "ownerToDocsIds",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
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
				"name": "_docId",
				"type": "uint256"
			}
		],
		"name": "_getDoc",
		"outputs": [
			{
				"name": "",
				"type": "string"
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
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_userAddr",
				"type": "address"
			}
		],
		"name": "_getDocIDs",
		"outputs": [
			{
				"name": "",
				"type": "uint256[]"
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
  web3 = new Web3(new Web3.providers.HttpProvider(
      "https://rinkeby.infura.io/2jyiuMt1W9jiQa7b3y0w"
  ));
}

async function createDoc() {
  console.log('calling');
  accounts = await web3.eth.getAccounts();

  let myContract = new web3.eth.Contract(abi, address, { });
  let docData = web3.utils.asciiToHex(CKEDITOR.instances.editor1.getData());
  let temp = await  myContract.methods._storeDocument(docData, false).send({
      from: accounts[0]
  });
}

$( "#createDocBtn" ).click(function() {
  createDoc();
});