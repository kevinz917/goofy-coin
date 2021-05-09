import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Button from '../../../components/Button/Button';
import Input from '../../../components/Input/Input';
import { fetchAuctionInfo } from './auctionHelpers';
import './OfferingContainer.scss';

interface offeringContainerMapProps {
  tokenContract: number;
}

const mapStateToProps = (state: any) => {
  return {
    tokenContract: state.network.contracts.token,
  };
};

const OfferingContainer = () => {
  const [price, setPrice] = useState('');

  useEffect(() => {
    const onMount = async () => {
      const auctionInfo: any = await fetchAuctionInfo();
      setPrice(auctionInfo.price);
    };

    onMount();
  }, []);

  return (
    <div className="offering-container">
      <div className="body1 secondary">Initial coin offering</div>
      <div className="hero-header">Goofy coin</div>

      <div style={{ height: '40px' }} />

      <div className="horizontal-container">
        <div className="vertical-container">
          <div className="body1 secondary">Your tokens</div>
          <div className="header1">20</div>
        </div>

        <div className="vertical-container">
          <div className="body1 secondary">Token price</div>
          <div className="header1">{`${price} Ξ`}</div>
        </div>
      </div>

      <div style={{ height: '40px' }} />

      <div className="bottom-container">
        <Input
          value="123"
          onChange={() => {}}
          placeholder="Enter amount"
          width="100%"
          className="input"
        />
        <Button>Purchase</Button>
      </div>
    </div>
  );
};

export default connect(mapStateToProps)(OfferingContainer);
