import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Feed.scss';

const mapStateToProps = (state) => {
  return {
    account: state.network.account,
    decentragram: state.network.contracts.decentragram,
    images: state.network.images,
  };
};

class Feed extends Component {
  //tip post
  tipImageOwner = (id, tipAmount) => {
    const { decentragram, account } = this.props;

    decentragram.methods
      .tipImageowner(id)
      .send({ from: account, value: tipAmount })
      .on('transactionHash', (hash) => {
        this.setState({ loading: false });
      });
  };

  render() {
    const { images } = this.props;

    return (
      <div className="feed-container fade-in-default">
        <div className="info-header">
          <div className="header1">Decentragram</div>
          <div className="body1 secondary">A decentralized instagram</div>
        </div>
        {images.map((image, key) => {
          return (
            <div className="feed-card-container" key={key}>
              <div className="header-container">
                <div className="body1">From: {image.author}</div>
              </div>
              <div className="image-container">
                <img
                  src={`https://ipfs.infura.io/ipfs/${image.hash}`}
                  alt={image.hash}
                  className="image-cover"
                />
              </div>
              <div className="bottom-container">
                <div className="body1 secondary">
                  TIPS: {window.web3.utils.fromWei(image.tipAmount.toString(), 'Ether')} ETH
                </div>
                <button
                  className="btn btn-link btn-sm float-right pt-0"
                  name={image.id}
                  onClick={(event) => {
                    let tipAmount = window.web3.utils.toWei('0.1', 'Ether');
                    console.log(event.target.name, tipAmount);
                    this.tipImageOwner(event.target.name, tipAmount);
                  }}
                >
                  TIP 0.1 ETH
                </button>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default connect(mapStateToProps, null)(Feed);
