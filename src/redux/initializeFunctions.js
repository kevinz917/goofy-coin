import Web3 from 'web3';
import { mainStore } from '../index';
import Decentragram from '../abis/Decentragram.json';
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
  mainStore.dispatch(networkActions.setAccount(accounts[0]));

  const networkId = await web3.eth.net.getId();
  const networkData = Decentragram.networks[networkId]; //from json

  if (networkData) {
    console.log('NETWORK DATA AVAILABLE!');
    const decentragram = new web3.eth.Contract(Decentragram.abi, networkData.address);

    mainStore.dispatch(networkActions.setDecentagramContract(decentragram));
  } else {
    window.alert('Not deployed to network');
  }
};
