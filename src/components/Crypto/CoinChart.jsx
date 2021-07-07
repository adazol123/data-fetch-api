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
  const data = [];
  useEffect(() => {
    selectedItem && 
    axios.get(
        `https://api.coingecko.com/api/v3/coins/${selectedItem.id}/market_chart?vs_currency=php&days=30&interval=daily`,
      )
      .then((response) => response.data)
      .then((data) => {
        setPrices((prev) => data.prices)
        console.log('Chart:',prices);
      })
      .catch((error) => console.log("Coin Chart Error:", error));
      
  }, [selectedItem]);
  
  

  prices && prices.map((price, index) => {
    return data.push({
      date: new Date(price[0]).toISOString().substr(0, 10),
      time: new Date(price[0]).toLocaleTimeString(),
      value: price[1],
    });
  });
  return (
    <div>
      <button >1 day</button>
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#31f5b4" stopOpacity={0.2} />
              <stop offset="75%" stopColor="#31f5b4" stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <Area type='natural' dataKey="value" stroke="#31f5b4" fill="url(#color)" />
          <XAxis
            dataKey="date"
            axisLine={true}
            tickLine={false}
            tickFormatter={() =>  ''}
          />
          <YAxis
            dataKey="value"
            axisLine={false}
            tickLine={false}
            tickCount={10}
            hide
          />
          <Tooltip  content={<CustomTooltop/>} position={{y: -20}}/>
          <CartesianGrid opacity="0.03" vertical={false} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};


function CustomTooltop({ active, payload, label}) {
    const currency_format = {maximumFractionDigits: 2, minimumFractionDigits: 2 }
    if(active) {
        return (
            <div className="tooltip">
                <h4>{format(parseISO(label), 'eeee, d MMM, yyyy')}</h4>
                <p>PHP {
                    payload[0].value.toLocaleString("en-US", currency_format)
                }</p>
            </div>
        )
    }
    return null
}

export default CoinChart;
