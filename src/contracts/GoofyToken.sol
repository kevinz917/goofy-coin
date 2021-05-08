pragma solidity >0.5.2;

contract GoofyToken {
    address admin;
    string public tokenName;
    uint256 public tokenPrice;
    uint256 public totalSupply;

    // constructor to initialize sale
    constructor() public {
        tokenName = 'Goofy Token';
        tokenPrice = 0.1 ether;
        totalSupply = 1000;
    }

    // events
    event sell(address _seller, uint256 _amount);
}
