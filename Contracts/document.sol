pragma solidity ^0.4.0;

contract document {

    struct docData{
        bytes32 docText;
        bool isEncrypted;
    }

    docData[] public docs;

    mapping (uint => address) public docToOwner;
    mapping (address => uint) ownerDocCount;

    function _getDoc(uint _docId) view public returns (bytes32){

        return docs[_docId].docText;
    }

    function _storeDocument(bytes32 _docText, bool _isEncrypted) public returns (uint) {
        uint id = docs.push(docData(_docText, _isEncrypted)) - 1;
        docToOwner[id] = msg.sender;
        ownerDocCount[msg.sender]++;
        return id;
    }
}
