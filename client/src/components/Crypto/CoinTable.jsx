import { useContext, useEffect } from "react";
import DataContext from "../../util/DataContext";
import CoinRow from "./CoinRow";
import { LazyMotion, m } from "framer-motion";
import axios from "axios";


const CoinTable = () => {
  const { coins, setCoins, filter, setSelectedItem, setStatus, setPrice_btc } =
    useContext(DataContext);
  

  const page = () => {
    if (filter) return 200;
    else return 30;
  };
  const loadFeatures = () =>
    import("../../util/features.js").then((res) => res.default);
  const container = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.2,
      },
    },
  };
  const item = {
    hidden: { y: 10, opacity: 0 },
    visible: { y: 0, opacity: 1 },
    exit: { y: 10, opacity: 0 },
  };

  useEffect(() =>{
    setStatus((prev) => "Fetching Data from API ...")
    axios.get('/api/coins')
      .then(response => response.data.result)
      .then(data => {
        setStatus((prev) => " ")
        setPrice_btc(prev => data[0].current_price)
        return setCoins((prev) => data)
      })
      .catch(error => {
        setStatus((prev) => "Error Data from API ...")
        console.log('error on coin table:', error)
      })
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <LazyMotion features={loadFeatures}>
      <m.div
        className="crypto-button-container"
        variants={container}
        initial="hidden"
        animate={coins ? "visible" : "hidden"}
        exit="hidden">
        {coins ? (
          coins
            .filter(
              (coins) =>
                coins.name.toLowerCase().includes(filter.toLowerCase()) ||
                coins.symbol.toLowerCase().includes(filter.toLowerCase()) ||
                coins.id.toLowerCase().includes(filter.toLowerCase()),
            )
            .slice(0, page())
            .map((coin, index) => (
              <m.div key={index} variants={item}>
                <CoinRow
                  coins={coin}
                  onSelect={(coin) => {
                    setSelectedItem(coin);
                    // setCoinV1(coin)
                    
                  }}
                />
              </m.div>
            ))
        ) : (
          <h2 >Loading...</h2>
        )}

        {/* This section is currently on debugging mode when no search is found on the filter  */}
        <div className="sub-footer">
          <p>Coins shown above are only sorted based on top 30 market cap </p>
          <span>You can search for other coins in the search field above </span>
        </div>
      </m.div>
    </LazyMotion>
  );
};

export default CoinTable;
