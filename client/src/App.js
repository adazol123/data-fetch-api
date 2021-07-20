import React, { useState } from 'react';
import {BrowserRouter as Router} from 'react-router-dom'
import Navbar from './components/Header/Navbar';
import { route as Route } from './util/route';
import DataContext from './util/DataContext'
import PageNavigationListenerUtils from './util/PageNavigationListener.utils';
import {AnimateSharedLayout} from 'framer-motion'

function App() {
  const [coins, setCoins] = useState([])
  const [coinV1, setCoinV1] = useState([])
  const [coinV2, setCoinV2] = useState([])
  const [filter, setFilter] = useState('')
  const [selectedItem, setSelectedItem] = useState(null)
  const [status, setStatus] = useState('')
  const [showCoin, setShowCoin] = useState(false)
  const [news, setNews] = useState([])
  const [trendsData, setTrendsData] = useState([])
  const [price_btc, setPrice_btc] = useState(0)

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
      coinV1,
      setCoinV1,
      coinV2,
      setCoinV2,
      trendsData,
      setTrendsData,
      price_btc,
      setPrice_btc
  }}>
    <Router>
      <PageNavigationListenerUtils/>    
      <AnimateSharedLayout type="crossfade">
      <Navbar />
      <Route/>
    </AnimateSharedLayout>
    </Router>
    </DataContext.Provider>
  );
}

export default App;
