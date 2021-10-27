// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.16 <0.9.0;
pragma abicoder v1;

abstract contract Inbox {
    function setMessage(string memory newMessage) public virtual;
}
contract InboxContract is Inbox{
     string  public message;

     constructor (string memory initialMessage) {
         message  = initialMessage;
     }

     function setMessage ( string memory newMessage) public override{
         message = newMessage;
     }
}