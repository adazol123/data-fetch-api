import {lazy, Suspense} from 'react'
import {AnimatePresence, motion} from 'framer-motion'
import { Redirect } from "react-router-dom";
import TimeAgoFormat from '../../components/News/TimeAgoFormat'


const CoinChart = lazy(() => import('../Crypto/CoinChart'))

const Coin = ({
  match: {
    params: { id },
  },
}) => {
  const coinData = JSON.parse(localStorage.getItem("coinV1"));
  const dataV2 = JSON.parse(localStorage.getItem("coinV2"));

  if (coinData && dataV2) {
    const {
      id: coin_id,
      name: coin_name,
      description,
      categories,
      image: coin_image,
      last_updated,
      links,
      market_data: {
        market_cap_rank,
        current_price, //php
        price_change_24h, //percent
        price_change_24h_in_currency, //php
        price_change_percentage_24h, //percent
        price_change_percentage_24h_in_currency, //php
        market_cap, //php
        market_cap_change_percentage_24h, //percent
        market_cap_change_percentage_24h_currency, //php
        market_rank,
        max_supply,
        total_supply,
        total_volume, //php
      },
    } = coinData;

    if (id === coin_id) {
      return (
        <AnimatePresence >
        <motion.div className="coin-container"
          layout
          layoutId={coinData.id}
          initial='hidden'
        >
          <div>
          <div className="coin-price">
              <h1>
                {['₱', current_price.php.toLocaleString()].join(
                  " ",
                )}{" "}
              </h1>
              <p className={[
                        `price-change`, 
                        price_change_percentage_24h < 0.0? 'red' : 'green' ]
                        .join(' ')}>{price_change_percentage_24h.toFixed(2)}% </p>
          </div>
          {last_updated && <p className='coin-update'>Latest Update: <span><TimeAgoFormat date={last_updated}/></span></p>}
          </div>
          <Suspense fallback={<div>Loading...</div>}>
          <CoinChart/>
          </Suspense>


                
          <div className="coin-data">

            <h3>Overview</h3>
            <div className="coin-overview">
              <div className="row">
                <p>
                  Market Cap<span>(PHP)</span>
                </p>
                <h4>{market_cap.php.toLocaleString()} </h4>
              </div>
              <div className="row">
                <p>
                  Supply <span>Total (PHP)</span>
                </p>
                <h4>{total_supply && total_supply.toLocaleString()} </h4>
              </div>
              <div className="row">
                <p>
                  Volume <span>Total (PHP)</span>
                </p>
                <h4>{total_volume && total_volume.php.toLocaleString()} </h4>
              </div>

              <div className="row">
                <p>
                  Rank <span>Market</span>
                </p>
                <h4>{market_cap_rank && market_cap_rank} </h4>
              </div>
              <div className="row">
                <p>Category</p>
                <h4>{dataV2.category} </h4>
              </div>
              <div className="row">
                <p>Consensus</p>
                <h4>{dataV2.consensus_algorithm} </h4>
              </div>
              <div className="row">
                <p>Emmission</p>
                <h4>{dataV2.token_details.emission_type_general} </h4>
              </div>
              <div className="row">
                <p>Token Type</p>
                <h4>{dataV2.token_details.type} </h4>
              </div>
            </div>
            <div className="coin-market"></div>
          </div>
          <p style={{ textAlign: 'center', color: "#444", marginBottom: '0.5em' }}>
               {dataV2.tagline} 
            </p>

          <div className="coin-about">
            <h3>About {coin_name} </h3>

            <p
              className="coin-description"
              dangerouslySetInnerHTML={{ __html: `${dataV2.overview}` }}
            />
            <p
              className="coin-description"
              dangerouslySetInnerHTML={{ __html: `${description.en}` }}
            />
          </div>
        </motion.div>
        </AnimatePresence>
      );
    }
    return <Redirect to={{ pathname: "/404" }} />;
  }
  return (
    <div align="center">
      <h3>Loading data...</h3>
      <p style={{ color: "#333" }}>Page current on building phase</p>
    </div>
  );
};

export default Coin;
