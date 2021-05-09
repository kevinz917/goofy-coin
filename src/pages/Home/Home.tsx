import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Home.scss';

interface homeOwnProps {
  loading: boolean;
}

interface mapStateOwnProps {
  tokenSaleContract: any;
  tokenContract: any;
}

const mapStateToProps = (state: any): mapStateOwnProps => {
  return {
    tokenSaleContract: state.network.contracts.tokenSale,
    tokenContract: state.network.contracts.token,
  };
};

type homeAllProps = mapStateOwnProps & homeOwnProps;

class Home extends Component<homeAllProps> {
  constructor(props: homeAllProps) {
    super(props);

    this.state = {
      loading: true,
    };
  }

  async componentDidMount() {
    const { tokenSaleContract, tokenContract } = this.props;

    // let tokensSold = await tokenSaleContract.methods.tokensSold().call();
    // console.log(tokensSold);

    // token Name
    let tokenName = await tokenContract.methods.tokenName().call();
    console.log(tokenName);
  }

  render() {
    return <div>Placeholder Text</div>;
  }
}

export default connect(mapStateToProps)(Home);
