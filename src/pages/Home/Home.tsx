import React, { Component } from 'react';
import Feed from './Feed/Feed';
import { getImagesFromNetwork } from './Util/imageDataHelpers';
import './Home.scss';

interface homeOwnProps {
  loading: boolean;
}

class Home extends Component<{}, homeOwnProps> {
  constructor(props: homeOwnProps) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  async componentDidMount() {
    await getImagesFromNetwork();
    this.setState({ loading: false });
  }

  render() {
    return (
      <div>
        {this.state.loading ? (
          <div className="loading-container">
            <div className="body2 italic">CONNECTING TO THE NETWORK ...</div>
          </div>
        ) : (
          <div>
            <Feed />
          </div>
        )}
      </div>
    );
  }
}

export default Home;
