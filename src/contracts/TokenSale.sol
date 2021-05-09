pragma solidity >0.5.2;

import './GoofyToken.sol';

contract TokenSale {
    address admin;
    GoofyToken public tokenContract;
    uint256 public tokenPrice;
    uint256 public tokensSold;

    event Sell(address _buyer, uint256 _amount);

    constructor(GoofyToken _tokenContract, uint256 _tokenPrice) public {
        admin = msg.sender;
        tokenContract = _tokenContract;
        tokenPrice = _tokenPrice;
    }

    function multiply(uint256 x, uint256 y) internal pure returns (uint256 z) {
        require(y == 0 || (z = x * y) / y == x);
    }

    function buyTokens(uint256 _amount) public payable {
        require(msg.value == multiply(_amount, tokenPrice));
        require(tokenContract.balanceOf(this) >= _amount);
        require(tokenContract.transfer(msg.sender, _amount));

        tokensSold += _amount;

        emit Sell(msg.sender, _amount);
    }
}
