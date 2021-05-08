import React, { useEffect, useState } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Upload from '../pages/Upload/Upload';
import { loadBlockchainData, loadWeb3 } from '../redux/initializeFunctions';
import Navbar from './Navbar/Navbar';
import history from './Router/history';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const onMount = async () => {
      setIsLoading(true);
      await loadWeb3();
      await loadBlockchainData();
      setIsLoading(false);
    };
    onMount();
  }, []);

  if (isLoading) return null;

  return (
    <div className="main-background">
      <Router history={history}>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/new" component={Upload} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
