import React, { useState } from 'react';
import { connect } from 'react-redux';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import { navigateTo } from '../../components/Router/history';
import UploadArea from '../../components/UploadArea/UploadArea';
import networkActions from '../../redux/network/networkActionCreator';
import './Upload.scss';

// Abi setup // TODO
import abiDecoder from 'abi-decoder';
import DecentragramAbi from '../../abis/Decentragram.json';
import { getImagesFromNetwork } from '../Home/Util/imageDataHelpers';
abiDecoder.addABI(DecentragramAbi.abi);

const ipfsClient = require('ipfs-http-client');
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' }); // leaving out the arguments will default to these values

const mapStateToProps = (state) => {
  return {
    account: state.network.account,
    decentragram: state.network.contracts.decentragram,
  };
};

const mapDispatchToProps = {
  setImages: networkActions.setImages,
};

const Upload = (props) => {
  const { decentragram, account, setImages } = props;

  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState('');
  const [buffer, setBuffer] = useState(null);

  const onSubmit = (event) => {
    event.preventDefault();
    uploadImage(description);
  };

  //upload image
  const uploadImage = async (description) => {
    try {
      console.log('Submitting file to IPFS ...');

      //adding file to the IPFS
      let ipfsRes = await ipfs.add(buffer);
      if (ipfsRes) console.log('Ipfs result: ', ipfsRes);

      let transactionHash = await decentragram.methods
        .uploadImage(ipfsRes[0].hash, description)
        .send({ from: account });

      await getImagesFromNetwork();
      navigateTo('/');
    } catch (error) {
      console.log(error);
    }
  };

  const captureFile = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    const reader = new window.FileReader(); // TODO
    reader.readAsArrayBuffer(file);

    reader.onloadend = () => {
      setBuffer(Buffer(reader.result));
    };
  };

  return (
    <div className="upload-container">
      <div className="header1">Upload Image</div>
      <br />

      <UploadArea onChange={captureFile} />
      <br />

      <Input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        width="100%"
      />

      <Button onClick={onSubmit} width="100%">
        Upload Image
      </Button>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Upload);
