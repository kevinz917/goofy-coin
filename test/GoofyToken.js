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

  describe('Approval', async () => {
    it('Successful approval', async () => {
      let instance = await GoofyToken.deployed();

      let receipt = await instance.approve(author, 10);
      assert.equal(receipt.logs.length, 1, 'Trigger one event');
      assert.equal(receipt.logs[0].args._value, 10, 'Has correct transfer value');
    });

    it('Approval allocated into allowance', async () => {
      let instance = await GoofyToken.deployed();

      let allowance = await instance.allowance(deployer, author);
      assert.equal(allowance, 10);
    });
  });

  describe('TransferFrom method', async () => {
    it('Issue approval', async () => {
      let instance = await GoofyToken.deployed();

      let receipt = await instance.approve(author, 10, { from: deployer });
      assert.equal(receipt.logs[0].args._value, 10, 'Has correct transfer value');

      // Delegated transfer event
      let delegatedTransferResult = await instance.transferFrom(deployer, author, 1, {
        from: author,
      });
      assert.equal(delegatedTransferResult.logs[0].args._value, 1);

      // Allowance after delegated transfer
      let allowanceAfterTransfer = await instance.allowance(deployer, author);
      assert.equal(allowanceAfterTransfer, 9);
    });
  });
});
