const { assert } = require('chai');
var TokenSale = artifacts.require('./TokenSale.sol');
var GoofyToken = artifacts.require('./GoofyToken.sol');

contract('Token Sale', ([deployer, author, tipper]) => {
  describe('End token sale', async () => {
    it('Only admin can end sale', async () => {
      let tokenSaleInstance = await TokenSale.deployed();

      try {
        // Third party tries to end sale
        await tokenSaleInstance.endSale({ from: author });
        assert.fail('Only admin can end sale');
      } catch (err) {}
    });

    it('All unsold transfers to admin', async () => {
      let tokenSaleInstance = await TokenSale.deployed();
      let tokenInstance = await GoofyToken.deployed();

      // Transfer all to admin
      await tokenSaleInstance.endSale({ from: deployer });
      let balance = await tokenInstance.balanceOf(deployer);

      assert.equal(balance, 100);
    });
  });
});
