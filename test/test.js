const { assert } = require('chai');

const Decentragram = artifacts.require('./Decentragram.sol');

// test for smart contract
require('chai')
  .use(require('chai-as-promised'))
  .should();

contract('Decentragram', ([deployer, author, tipper]) => {
  let decentragram;

  before(async () => {
    decentragram = await Decentragram.deployed();
  });

  describe('deployment', async () => {
    it('deploys successfully', async () => {
      const address = await decentragram.address;
      assert.notEqual(address, 0x0);
      assert.notEqual(address, '');
      assert.notEqual(address, null);
      assert.notEqual(address, undefined);
    });

    it('has a name', async () => {
      const name = await decentragram.name();
      assert.equal(name, 'Decentragram');
    });
  });

  describe('images', async () => {
    let result, imageCount;

    const hash = 'abcdef';

    before(async () => {
      result = await decentragram.uploadImage(hash, 'Image Description', { from: author });
      imageCount = await decentragram.imageCount();
      console.log(imageCount);
    });

    it('Create images', async () => {
      // SUCCESS
      assert.equal(imageCount, 1);
      const event = result.logs[0].args;

      // Image must have hash
      await decentragram.uploadImage('', 'Image Description', { from: author }).should.be.rejected;
    });

    // change description
    it('Allow user to change description', async () => {
      await decentragram.uploadImage('1', 'PLACEHOLDER', { from: author });
      let updatedCount = await decentragram.imageCount();

      const newDescription = 'HELLO';
      // change image of latest image
      await decentragram.changeDescription(updatedCount, newDescription);
      let updatedImage = await decentragram.images(updatedCount);
      assert.equal(newDescription, updatedImage.description);
    });
  });
});
