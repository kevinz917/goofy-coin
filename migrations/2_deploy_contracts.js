const GoofyToken = artifacts.require('GoofyToken');

module.exports = function(deployer) {
  deployer.deploy(GoofyToken, 100);
};
