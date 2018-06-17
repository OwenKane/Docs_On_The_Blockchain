const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');

const provider = ganache.provider();
const web3 = new Web3(provider);

const{ interface, bytecode }= require('../compile');

let document;
let accounts;

beforeEach(async () =>{
    accounts = await web3.eth.getAccounts();

    document = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode })
        .send({from: accounts[0], gas: '1000000'});

    document.setProvider(provider);
});

describe('document', () => {

    it('deploys a contract', () => {
        assert.ok(document.options.address);
    });

    it('It can store a document', async() => {
        await document.methods._storeDocument('Hello World', false).send({ from: accounts[0],  gas: '1000000' });
        const doc = await document.methods._getDoc(0).call();
        console.log(interface);
        assert.equal(doc, 'Hello World');
    });
});