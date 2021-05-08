const { assert } = require('chai');
var GoofyToken = artifacts.require('./GoofyToken.sol');

contract('Goofy Token', ([deployer, author, tipper]) => {
  let tokenInstance;

  before(async () => {
    tokenInstance = await GoofyToken.deployed();
  });

  // Supply test
  describe('Deployment Checks', async () => {
    it('Sets the total supply upon deployment', async () => {
      const totalSupply = await tokenInstance.totalSupply();

      assert.equal(totalSupply, 1000);
    });
  });
});
