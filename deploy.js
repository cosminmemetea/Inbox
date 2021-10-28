const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const {interface, bytecode} = require('./compile');
//DO NOT PUBLISH IN GIT
const provider = new HDWalletProvider(
    'MENMONICS FOR YOUR ACCOUNT', 'https://infura.io/dashboard/ethereum path to a new project'
)
const web3 = new Web3(provider);

const deploy = async() => {
    const accounts = await web3.eth.getAccounts();

    console.log('Attempts to deploy from account ', accounts[0]);

    const contract = await new web3.eth.Contract(interface).deploy({ data: bytecode, arguments:['Welcome in ether.']})
    .send({gas: 1000000, gasPrice: '5000000000', from: accounts[0]});

    console.log('Contract deployed to the address: ', contract.options.address);
}
deploy();