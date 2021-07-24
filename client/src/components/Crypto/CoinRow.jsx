import React, { useContext } from "react";
import DataContext from "../../util/DataContext";
import { m } from "framer-motion";
// import DataType from '../../util/DataType'

const CoinRow = ({ coins, onSelect }, ...props) => {
  const { setShowCoin } = useContext(DataContext);
  const {
    name,
    image,
    symbol,
    current_price: price,
    price_change_percentage_24h: price_percent,
  } = coins;

  return (
    <>
      <m.div
        className="wrapper"
        layout
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          onSelect(coins);
          setShowCoin((prev) => !prev);
        }}>
        <div className="crypto-button-left">
          <img src={image} alt={["icon", coins.id].join("-")} />
          <div className="crypto-button-name">
            <h4>{name}</h4>
            <p className="crypto-symbol">{symbol.toUpperCase()}</p>
          </div>
        </div>

        <div className="crypto-button-price">
          <div className="crypto-price">
            <h4>
              {" "}
              ₱
              {price &&
                price.toLocaleString("en-US", {
                  maximumFractionDigits: 2,
                  minimumFractionDigits: 2,
                })}
            </h4>
            <p
              className={[
                `price-change`,
                price_percent < 0 ? "red" : "green",
              ].join(" ")}>
              {price_percent && price_percent.toFixed(2)}%
            </p>
          </div>
        </div>
      </m.div>
    </>
  );
};

// CoinRow.propTypes = DataType

export default CoinRow;
