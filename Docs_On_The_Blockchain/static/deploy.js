const Web3 = require('web3');
let accounts;
let document;
let web3;


web3 = new Web3(window.web3.currentProvider);
console.log(web3);
console.log("Web3 version: " + web3.version);

const address = '0xFA80E145c8E820F23703b90c23F7E02E13343f3a';
const abi = [
   {
      "constant":true,
      "inputs":[
         {
            "name":"",
            "type":"uint256"
         }
      ],
      "name":"docs",
      "outputs":[
         {
            "name":"docText",
            "type":"string"
         },
         {
            "name":"isEncrypted",
            "type":"bool"
         }
      ],
      "payable":false,
      "stateMutability":"view",
      "type":"function"
   },
   {
      "constant":false,
      "inputs":[
         {
            "name":"_docText",
            "type":"string"
         },
         {
            "name":"_isEncrypted",
            "type":"bool"
         }
      ],
      "name":"_storeDocument",
      "outputs":[
         {
            "name":"",
            "type":"uint256"
         }
      ],
      "payable":false,
      "stateMutability":"nonpayable",
      "type":"function"
   },
   {
      "constant":true,
      "inputs":[
         {
            "name":"_docId",
            "type":"uint256"
         }
      ],
      "name":"_getDoc",
      "outputs":[
         {
            "name":"",
            "type":"string"
         }
      ],
      "payable":false,
      "stateMutability":"view",
      "type":"function"
   },
   {
      "constant":true,
      "inputs":[
         {
            "name":"",
            "type":"uint256"
         }
      ],
      "name":"docToOwner",
      "outputs":[
         {
            "name":"",
            "type":"address"
         }
      ],
      "payable":false,
      "stateMutability":"view",
      "type":"function"
   }
]

async function asyncCall() {
  console.log('calling');
  accounts = await web3.eth.getAccounts();

  var myContract = new web3.eth.Contract(abi, address, { });

  console.log("Accounts: " + accounts);
  //await  myContract.methods._storeDocument('Hello World', false).send();
  //const doc = await myContract.methods._getDoc(0).call();
  console.log("Contract returned: ");
  //console.log(doc);

  const doc = await myContract.methods._getDoc(0).call().then((symbol) => {
     const symbolString = web3.utils.hexToAscii(symbol).replace(/\u0000*$/, '');
     console.log(symbolString);
  });
}

asyncCall();