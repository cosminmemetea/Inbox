const path = require('path');
const fs = require('fs');
const solc = require('solc');

const pathToSolFile = path.resolve(__dirname, 'contracts', 'Inbox.sol');
const source = fs.readFileSync(pathToSolFile, 'UTF-8');
var input = {
    language: 'Solidity',
    sources: {
        'Inbox.sol' : {
            content: source
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': [ '*' ]
            }
        }
    }
};
const output = JSON.parse(solc.compile(JSON.stringify(input)));
const interface = output.contracts['Inbox.sol']['InboxContract'].abi;
const bytecode = output.contracts['Inbox.sol']['InboxContract'].evm.bytecode.object;

module.exports = {interface, bytecode};