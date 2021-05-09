import Web3 from 'web3';
import { mainStore } from '../../../index';

export const fetchAuctionInfo = async () => {
  const tokenSaleContract = mainStore.getState().network.contracts.tokenSale;

  console.log(tokenSaleContract);

  const price = await tokenSaleContract.methods.tokenPrice().call();
  console.log(price);

  return { price: price / 1000000000000000000 };
};
