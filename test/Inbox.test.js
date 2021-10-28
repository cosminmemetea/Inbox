const assert = require('assert');
const ganache = require('ganache-cli');
const Web3  = require('web3');
const web3 = new Web3(ganache.provider());
const {interface, bytecode} = require('../compile');
let accounts;
let inbox;
beforeEach(async () => {
    // Get a list of all accounts
    accounts = await web3.eth.getAccounts();
    // use one of the accounts to deploy the contract
    console.log('Compiled intrface is: --- ' + interface);
    console.log('Compiled bytecode is: --- ' + bytecode);
    inbox = await new web3.eth.Contract(interface).deploy({data: bytecode, arguments:['Hi there']}).send({from: accounts[0], gas: '1000000'});
});

describe('Deploys a contract', () => {
    it('testMessage', () => {
        console.log(inbox);
        assert.equal(1,1);
    })
});