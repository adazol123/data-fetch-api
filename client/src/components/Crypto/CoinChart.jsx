import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import DataContext from "../../util/DataContext";
import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  Area,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { format, parseISO } from "date-fns";




const CoinChart = () => {
  const { selectedItem } = useContext(DataContext);
  const [prices, setPrices] = useState([]);
  const [days, setDays] = useState('183')
  const [interval, setInterval] = useState('daily')
  const data = [];
  useEffect(() => {
    selectedItem &&
      axios
        .get(`/api/backend/crypto/coins/${selectedItem.id}/market_chart?days=${days}&interval=${interval}`)
        .then((response) => response.data.result)
        .then((data) => {
          console.log("Chart:", data.prices);
          return setPrices((prev) => data.prices);
        })
        .catch((error) => console.log("Coin Chart Error:", error));
  }, [selectedItem, days, interval]);

  prices &&
    prices.map((price, index) => {
      return data.push({
        date: new Date(price[0]).toISOString().substr(0, 10),
        time: new Date(price[0]).toLocaleTimeString(),
        value: price[1],
      });
    });
    const color = () => {
      if(selectedItem.price_change_percentage_24h < 0.0 ) 
      {
        return '#0ff8e1' 
      }      
      return '#31f5b4' 
    }
    console.log(color())
  return (
    <div className='crypto-chart'>
      <ResponsiveContainer width="100%" height={130}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color()} stopOpacity={0.08} />
              <stop offset="75%" stopColor={color()} stopOpacity={0.01} />
            </linearGradient>
          </defs>
          <Area
            connectNulls
            type="natural"
            dataKey="value"
            strokeWidth={2}
            stroke={color()}
            fill="url(#color)"
            margin={{
              top: 10,
              right: 0,
              left: 0,
              bottom: 2,
            }}
          />
          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tickFormatter={() => ""}
            hide
          />
          <YAxis
            dataKey="value"
            axisLine={false}
            tickLine={false}
            tickCount={10}
            hide
          />
          <Tooltip content={CustomTooltop} position={{ y: -40,  }} />
          <CartesianGrid
            strokeDasharray="8 4"
            strokeWidth='0.4'
            opacity="0.3"
            
            vertical={false}
          />
        </AreaChart>
      </ResponsiveContainer>
      <div className="row-days">
        <button className={days === '1'? 'active': null} onClick={() => {
          setDays(prev => '1')
          setInterval(prev => 'minutely')
        }}>1D</button>
        <button className={days === '7'? 'active': null} onClick={() => {
          setDays(prev => '7')
          setInterval(prev => 'hourly')
        }}>1W</button>
        <button className={days === '30'? 'active': null} onClick={() => {
          setDays(prev => '30')
          setInterval(prev => 'daily')
        }}>1M</button>
        <button className={days === '183'? 'active': null} onClick={() => setDays(prev => '183')}>6M</button>
        <button className={days === '366'? 'active': null} onClick={() => setDays(prev => '366')}>1Y</button>
        <button className={days === 'max'? 'active': null} onClick={() => setDays(prev => 'max')}>All</button>
      </div>
    </div>
  );
};


function CustomTooltop({ active, payload, label }) {
  try {
    
  const currency_format = {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  };
  if (active) {
    const [{value}] = payload
    return (
      <div className="tooltip">
          <h4>{format(parseISO(label), "eeee, d MMM, yyyy")}</h4>
          <p>PHP {value.toLocaleString("en-US", currency_format)}</p>
      </div>
    )
       
  }

    return null


  }
  catch(error)
 { return console.log('Custom Tooltip')}
}

export default CoinChart;
