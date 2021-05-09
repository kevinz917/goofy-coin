const { assert } = require('chai');
var TokenSale = artifacts.require('./TokenSale.sol');

contract('Goofy Token', ([deployer, author, tipper]) => {
  let tokenInstance;

  before(async () => {
    tokenInstance = await TokenSale.deployed();
  });
});
