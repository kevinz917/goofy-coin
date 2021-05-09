import { mainStore } from '../../../index';

import { TOKEN_SALE_CONTRACT_ADDRESS } from '../../../common/constants/networkConstants';

export const fetchAuctionInfo = async () => {
  const tokenSaleContract = mainStore.getState().network.contracts.tokenSale;
  const tokenContract = mainStore.getState().network.contracts.token;

  const price = await tokenSaleContract.methods.tokenPrice().call();

  const reserve = await tokenContract.methods.balanceOf(TOKEN_SALE_CONTRACT_ADDRESS).call();

  return { price: price / Math.pow(10, 18), reserve };
};
