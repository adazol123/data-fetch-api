import { lazy, Suspense } from 'react';
import {Route, Switch} from 'react-router-dom'
import { TestPage } from '../pages/TestPage';
const Home = lazy(() => import('../pages/Home'))
const Crypto = lazy(() => import('../pages/Crypto'))
const Coin = lazy(() => import('../components/Coin/CoinUpdate'))
const About = lazy(() => import('../pages/About'))
const PageNotFound = lazy(() => import('../pages/PageNotFound'))

export const route = () => {
  const loading = <h2 className="coin-loader">Loading ...</h2>
  return (
    <Suspense fallback={loading}>
      <Switch>
        <Route path='/about' exact component={About} />
        <Route path='/news' exact component={Home} />
        <Route path='/crypto' exact component={Crypto} />
        <Route path='/test' exact component={TestPage} />
        <Route path='/crypto/:id' exact component={Coin} />
        <Route path='/' exact component={Crypto} />
        <Route component={PageNotFound} />
      </Switch>
    </Suspense>
  );
}

