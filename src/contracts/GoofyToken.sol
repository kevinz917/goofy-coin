pragma solidity >0.5.2;

contract GoofyToken {
    address admin;
    string public tokenName;
    string public symbol = 'GOOFY';
    uint256 public tokenPrice;
    uint256 public totalSupply;

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    // constructor to initialize sale
    constructor(uint256 _initialSupply) public {
        tokenName = 'Goofy Token';
        tokenPrice = 0.1 ether;

        balanceOf[msg.sender] = _initialSupply;
        totalSupply = _initialSupply;
    }

    // Events
    event sell(address _seller, uint256 _amount);
    event Transfer(address indexed _from, address indexed _to, uint256 _value);

    // Transfer
    function transfer(address _to, uint256 _value) public returns (bool success) {
        require(balanceOf[msg.sender] >= _value);

        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;

        emit Transfer(msg.sender, _to, _value);

        return true;
    }

    // Delegated transfer
    function transferFrom(
        address _from,
        address _to,
        uint256 _value
    ) public returns (bool success) {
        require(balanceOf[_from] >= _value);
        require(allowance[_from][msg.sender] >= _value);

        balanceOf[_from] -= _value;
        balanceOf[_to] += _value;

        allowance[_from][msg.sender] -= _value;

        emit Transfer(_from, _to, _value);

        return true;
    }
}
