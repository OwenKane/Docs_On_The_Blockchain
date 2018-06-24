pragma solidity ^0.4.0;

contract document {

    struct docData{
        string docText;
        bool isEncrypted;
    }

    docData[] public docs;

    mapping (uint => address) public docToOwner;
    mapping (address => uint[]) public ownerToDocsIds;

    function _getDoc(uint _docId) view public returns (string){
        return docs[_docId].docText;
    }

    function _storeDocument(string _docText, bool _isEncrypted) public returns (uint) {
        uint id = docs.push(docData(_docText, _isEncrypted)) - 1;
        docToOwner[id] = msg.sender;
        ownerToDocsIds[msg.sender].push(id);
        return id;
    }

    function _getDocIDs(address _userAddr) view public returns (uint[]){
        return ownerToDocsIds[_userAddr];
    }
}
