import React, { useState } from 'react';
import {BrowserRouter as Router} from 'react-router-dom'
import Navbar from './components/Header/Navbar';
import { route as Route } from './util/route';
import DataContext from './util/DataContext'
import PageNavigationListenerUtils from './util/PageNavigationListener.utils';

function App() {
  const [coins, setCoins] = useState([])
  const [currentCoin, setCurrentCoin] = useState([])
  const [news, setNews] = useState([])
  const [trendsData, setTrendsData] = useState([])

  const [filter, setFilter] = useState('')
  const [status, setStatus] = useState('')

  const [selectedItem, setSelectedItem] = useState(null)
  const [price_btc, setPrice_btc] = useState(0)

  const [showCoin, setShowCoin] = useState(false)
  const [toggle, setToggle] = useState(false);

  return (

    <DataContext.Provider value={{
      coins,
      filter,
      status,
      setCoins,
      setFilter,
      selectedItem,
      setSelectedItem,
      showCoin,
      setShowCoin,
      setStatus,
      news,
      setNews,
      currentCoin,
      setCurrentCoin,
      trendsData,
      setTrendsData,
      price_btc,
      setPrice_btc,
      toggle,
       setToggle
  }}>
    <Router>
      <PageNavigationListenerUtils/>    

      <Navbar />
      <Route/>

    </Router>
    </DataContext.Provider>
  );
}

export default App;
