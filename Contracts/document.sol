pragma solidity ^0.4.0;

contract document {

    struct docData{
        string docText;
    }

    docData[] public docs;

    mapping (uint => address) public docToOwner;
    mapping (address => uint) ownerDocCount;

    function _getDoc(uint _docId) public returns (string){
        require(msg.sender == docToOwner[_docId]);
        return docs[_docId].docText;
    }

    function _storeDocument(string _docText) public returns (uint) {
        uint id = docs.push(docData(_docText)) - 1;
        docToOwner[id] = msg.sender;
        ownerDocCount[msg.sender]++;
        return id;
    }
}
