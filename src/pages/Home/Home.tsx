import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Home.scss';

interface homeOwnProps {
  loading: boolean;
}

interface mapStateOwnProps {
  tokenSaleContract: any;
}

const mapStateToProps = (state: any): mapStateOwnProps => {
  return {
    tokenSaleContract: state.network.contracts.tokenSale,
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
    const { tokenSaleContract } = this.props;

    let tokenPrice = await tokenSaleContract.methods.tokenPrice().call();
    let tokenSupply = await tokenSaleContract.methods.tokenSupply().call();
    console.log(tokenPrice, tokenSupply);
  }

  render() {
    return <div>Placeholder Text</div>;
  }
}

export default connect(mapStateToProps)(Home);
