import { mainStore } from '../../../index';
import networkActions from '../../../redux/network/networkActionCreator';

export const getImagesFromNetwork = async () => {
  const decentragram = mainStore.getState().network.contracts.decentragram;

  const imageCount = await decentragram.methods.imageCount().call(); // fetch images from web3
  console.log(imageCount);

  const fetchedImages = [];
  for (let i = 0; i < imageCount; i++) {
    const image = await decentragram.methods.images(i).call();
    fetchedImages.push(image);
  }

  mainStore.dispatch(networkActions.setImages(fetchedImages));
};
