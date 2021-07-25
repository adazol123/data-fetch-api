
import {Route, Switch} from 'react-router-dom'
import About from '../pages/About';
import Crypto from '../pages/Crypto';
import Home from '../pages/Home';
import Coin from '../components/Coin/Coin'
import PageNotFound from '../pages/PageNotFound';

export const route = () => {
  return (
      <Switch>
        <Route path='/about' exact component={About} />
        <Route path='/news' exact component={Home} />
        <Route path='/crypto' exact component={Crypto} />
        <Route path='/crypto/:id' exact component={Coin} />
        <Route path='/' exact component={Crypto} />
        <Route component={PageNotFound} />
      </Switch>
  );
}

