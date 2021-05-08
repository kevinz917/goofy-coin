import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

export const navigateTo = (url) => {
  if (url) {
    history.push(url);
  }
};

export default history;
