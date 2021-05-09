const GoofyToken = artifacts.require('GoofyToken');
const TokenSale = artifacts.require('TokenSale');

module.exports = function(deployer) {
  // 100 coins
  deployer.deploy(GoofyToken, 100).then(() => {
    // Token price is 0.001 Ether
    var tokenPrice = 1000000000000000;
    return deployer.deploy(TokenSale, GoofyToken.address, tokenPrice);
  });
};
