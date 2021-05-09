const { assert } = require('chai');
var GoofyToken = artifacts.require('./GoofyToken.sol');

contract('Goofy Token', ([deployer, author, tipper]) => {
  let tokenInstance;

  before(async () => {
    tokenInstance = await GoofyToken.deployed();
  });

  // Supply test
  describe('Deployment checks', async () => {
    it('Sets the total supply', async () => {
      const totalSupply = await tokenInstance.totalSupply();

      assert.equal(totalSupply, 100);
    });

    it('Allocated admin supply', async () => {
      const balance = await tokenInstance.balanceOf(deployer);

      assert.equal(balance, 100);
    });
  });

  describe('Transfer checks', async () => {
    it('Amount exceeds holding', async () => {
      try {
        await tokenInstance.transfer.call(author, 100000);
        assert.fail('Exception should be thrown');
      } catch (err) {}
    });

    it('Transfer ownership success', async () => {
      let instance = await GoofyToken.deployed();

      await instance.transfer(author, 10);

      let deployerBalance = await instance.balanceOf(deployer);
      assert.equal(deployerBalance, 90);
    });
  });
});
