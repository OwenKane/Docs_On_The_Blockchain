const path = require('path');
const fs = require('fs');
const solc = require('solc');

const documentPath = path.resolve(__dirname, 'contracts', 'document.sol');
const source = fs.readFileSync(documentPath, 'utf8');

module.exports = solc.compile(source, 1).contracts[':document'];