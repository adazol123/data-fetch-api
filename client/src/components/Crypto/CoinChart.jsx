import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import DataContext from "../../util/DataContext";
import { format, parseISO } from "date-fns";
import CoinAreaChart from "../Chart/CoinAreaChart";
import CoinChartButton from "../Chart/CoinChartButton";
const currency_format = { maximumFractionDigits: 2, minimumFractionDigits: 2};

const CoinChart = () => {
  const { selectedItem } = useContext(DataContext);
  const [prices, setPrices] = useState([]);
  const [days, setDays] = useState("1");
  const [interval, setDataInterval] = useState("minutely");
  const [onLoad, setOnLoad] = useState(true);
  const data = [];

  useEffect(() => {
    setOnLoad((prev) => true);
    const getData = async () => {
      try {
        const coinSelect = 
          await axios.get(`/api/backend/crypto/coins/${selectedItem.id}/market_chart?days=${days}&interval=${interval}`);
        const result = await coinSelect.data.result;
        const data = await result.prices;
        setPrices((prev) => data);
        setOnLoad((prev) => false);

      } catch (error) {
        console.log("Coin Chart Error:", error);
      }
    };
    getData();
  }, [selectedItem.id, days, interval]);

  prices.map((price) => {
    return data.push({
      date: new Date(price[0]).toISOString().substr(0, 10),
      time: new Date(price[0]).toLocaleTimeString(),
      value: price[1],
    });
  });

  function color() {
    if (data.length !== 0) {
      let start = data[0].value;
      let end = data[data.length - 1].value;
      if (end > start) {
        return "#0ff8e1"};
      return '#f80f68';
    }
    return console.log("Color: loading data...");
  };

  function ChartUI() {
    if (onLoad) return <h3 className="crypto-chart-loader">Loading...</h3>;
    else
      return <CoinAreaChart data={data} color={color()} content={CustomTooltip} />;
  }

  return (
    <div className="crypto-chart">
      {ChartUI()}
      <CoinChartButton
        days={days}
        setDays={setDays}
        setDataInterval={setDataInterval}
      />
    </div>
  );
};

function CustomTooltip({ active, payload, label }) {
  try {
    if (active) {
      const [{ value }] = payload;
      return (
        <div className="tooltip">
          <h4>{format(parseISO(label), "eeee, d MMM, yyyy")}</h4>
          <p>PHP {value.toLocaleString("en-US", currency_format)}</p>
        </div>
      );
    }
    return null;
  } catch (error) {
    return console.log("Custom Tooltip");
  }
}

export default CoinChart;
