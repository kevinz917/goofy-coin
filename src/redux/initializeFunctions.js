import Web3 from 'web3';
import { mainStore } from '../index';
import TokenSale from '../abis/TokenSale.json';
import Token from '../abis/GoofyToken.json';
import networkActions from './network/networkActionCreator';

export const loadWeb3 = async () => {
  mainStore.dispatch(networkActions.setLoadingTrue());

  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    await window.ethereum.enable();
  } else if (window.web3) {
    window.web3 = new Web3(window.web3.currentProvider);
  } else {
    window.alert('No eth browser detected ~');
  }
};

export const loadBlockchainData = async () => {
  const web3 = window.web3;

  const accounts = await window.web3.eth.getAccounts();
  console.log('Account address: ', accounts[0]);

  mainStore.dispatch(networkActions.setAccount(accounts[0]));

  const networkId = await web3.eth.net.getId();

  const tokenSaleNetworkData = TokenSale.networks[networkId]; //from json

  if (tokenSaleNetworkData) {
    const tokenSaleContract = new web3.eth.Contract(TokenSale.abi, tokenSaleNetworkData.address);
    mainStore.dispatch(networkActions.setTokenSaleContract(tokenSaleContract));
  } else {
    window.alert('Not deployed to network');
  }

  const tokenData = Token.networks[networkId];

  if (tokenData) {
    const tokenContract = new web3.eth.Contract(Token.abi, tokenData.address);
    mainStore.dispatch(networkActions.setTokenContract(tokenContract));
  } else {
    window.alert('Not deployed to network');
  }
};
