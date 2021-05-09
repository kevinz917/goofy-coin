const GoofyToken = artifacts.require('GoofyToken');
const TokenSale = artifacts.require('TokenSale');

module.exports = function(deployer) {
  deployer.deploy(GoofyToken, 100); // constructor parameters
  deployer.deploy(TokenSale);
};
