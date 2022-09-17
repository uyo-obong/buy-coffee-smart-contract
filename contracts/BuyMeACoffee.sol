// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

// Contract has been deployed to:  0x38620807694Ce304dCB7E0999f029ca4926F9B25

contract BuyMeACoffee {
    event GiftEvent(
        address indexed from,
        uint256 timestamp,
        string name,
        string message
    );

    struct Gift {
        address from;
        uint256 timestamp;
        string name;
        string message;
    }

    Gift[] gifts;

    address payable owner;

    constructor() {
        owner = payable(msg.sender);
    }

    function buyCoffee(string memory _name, string memory _message)
        public
        payable
    {
        require(msg.value > 0, 'The amount you send can not buy a coffee');

        gifts.push(Gift(msg.sender, block.timestamp, _name, _message));

        emit GiftEvent(msg.sender, block.timestamp, _name, _message);
    }

    function fetchGiftedSent() public view returns (Gift[] memory) {
        return gifts;
    }

    function withdrawGiftedMoney() public {
        require(owner.send(address(this).balance));
    }
}
