import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import DataContext from '../../util/DataContext'
import { format, parseISO } from 'date-fns'
import CoinAreaChart from '../Chart/CoinAreaChart'
import CoinChartButton from '../Chart/CoinChartButton'

const CoinChart = () => {
  const { selectedItem } = useContext(DataContext)
  const [prices, setPrices] = useState([])
  const [days, setDays] = useState('30')
  const [interval, setDataInterval] = useState('daily')
  const [onLoad, setOnLoad] = useState(true)
  const data = []

  useEffect(() => {
    setOnLoad(prev => true)
    axios
      .get(
        `https://test-app-crypto-ep.herokuapp.com/api/backend/crypto/coins/${selectedItem.id}/market_chart?days=${days}&interval=${interval}`,
      )
      .then((response) => response.data.result)
      .then((data) => {
        setPrices((prev) => data.prices)
        setOnLoad(prev => false)
        return
      })
      .catch((error) => console.log('Coin Chart Error:', error))
  }, [selectedItem, days, interval])

  prices.map((price, index) => {
    return data.push({
      date: new Date(price[0]).toISOString().substr(0, 10),
      time: new Date(price[0]).toLocaleTimeString(),
      value: price[1],
    })
  })

  const color = () => {
  if (selectedItem.price_change_percentage_24h < 0.0) {
      return '#0ff8e1'
    } return '#31f5b4' }
  console.log(color())
 const ChartUI = () => {
  if(onLoad) {
    return (
    <h3 className='crypto-chart-loader'>Loading...</h3>)
    }
  else return  (<CoinAreaChart data={data} color={color} content={CustomTooltip} />)
}
  return (
    <div className="crypto-chart">
      {ChartUI()}
      <CoinChartButton days={days} setDays={setDays} setDataInterval={setDataInterval} />
    </div>
  )

}


function CustomTooltip({ active, payload, label }) {
  try {
    const currency_format = {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    }
    if (active) {
      const [{ value }] = payload
      return (
        <div className="tooltip">
          <h4>{format(parseISO(label), 'eeee, d MMM, yyyy')}</h4>
          <p>PHP {value.toLocaleString('en-US', currency_format)}</p>
        </div>
      )}
    return null
  } catch (error) {
    return console.log('Custom Tooltip')
  }
}

export default CoinChart
