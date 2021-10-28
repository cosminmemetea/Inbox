const assert = require('assert');
const ganache = require('ganache-cli')
const Web3  = require('web3');
const web3 = new Web3(ganache.provider());
const {interface, bytecode} = require('../compile');
let accounts;
let inbox;
const INIT_MSG = 'This is my first day in ether.';
beforeEach(async () => {
    // Get a list of all accounts
    accounts = await web3.eth.getAccounts();
    // use one of the accounts to deploy the contract
    console.log('Compiled intrface is: --- ' + interface);
    console.log('Compiled bytecode is: --- ' + bytecode);
    inbox = await new web3.eth.Contract(interface).deploy({data: bytecode, arguments:[INIT_MSG]}).send({from: accounts[0], gas: '1000000'});
});

describe('Inbox', () => {
    it('Is contract deployed', () => {
        assert.ok(inbox.options.address);
    })

    it('Has a default message', async () => {
        const initMsg = await inbox.methods.message() // what method to be call on the given object
        .call(); // customize the method call above.
        assert.equal(INIT_MSG, initMsg);
    })

    it('Can change the message', async () => {
        const newMessage = 'Let\'s explore now';
        await inbox.methods.setMessage(newMessage).send({from : accounts[0]});
        const message = await inbox.methods.message().call(); 
        assert.equal(newMessage, message);
    })
});