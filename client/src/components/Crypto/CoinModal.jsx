import React, { useContext, useEffect, useRef, useState } from "react";
import DataContext from "../../util/DataContext";
import { useMotionValue, motion as m, AnimatePresence } from "framer-motion";
import axios from "axios";
import { Link } from "react-router-dom";
import CoinChart from "./CoinChart";
// import DataType from '../../util/DataType'

const CoinModal = () => {
  const { selectedItem, showCoin, setShowCoin, setCoinV1, setCoinV2 } =
    useContext(DataContext);
  const [coinData, setCoinData] = useState(null);
  const [dataLoading, setDataLoading] = useState(false);
  const description = useRef();

  const geckData = async () => {
    const api = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${selectedItem.id}?localization=true`
    );
    const response = await api.data;
    setCoinData(response);
    setCoinV1((prev) => response);
    localStorage.setItem("coinV1", JSON.stringify(response));
    setDataLoading(prev => true);
    console.log("Fetch coin version 1");
  };

  const messData = async () => {
    const mes = await axios.get(
      `https://data.messari.io/api/v1/assets/${selectedItem.id}/profile`
    );
    const mesdata = await mes.data.data;
    setCoinV2((prev) => mesdata);
    localStorage.setItem("coinV2", JSON.stringify(mesdata));
    console.log("Fetch coin version 2");
    setDataLoading(prev => true);
  };

  useEffect(() => {
    setDataLoading(false);
    try {
      if (selectedItem) geckData();
      else console.log(`no data`);
    } catch (error) {
      console.log(error);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedItem]);

  // const loadFeatures = () => import('../../util/features-animate.js').then(res => res.default)

  const currency_format = {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  };
  const y = useMotionValue(0);

  const variants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.2, ease: "linear" },
    },
    exit: {
      opacity: 0,
      y: 500,
      transition: { ease: "linear", duration: 0.2 },
    },
  };

  return (
    <AnimatePresence>
      {showCoin && (
        <m.div data-modal="show" className="crypto-modal">
          <div
            className="modal-backdrop"
            onClick={() => {
              setShowCoin((prev) => !prev);
            }}
          />
          {selectedItem && (
            <m.div
              initial="exit"
              animate="visible"
              exit="exit"
              variants={variants}
              drag="y"
              dragConstraints={{ top: 0, bottom: -20 }}
              dragElastic={1}
              transition={{
                type: "spring",
                velocity: 50,
                duration: 0.2,
                mass: 0.5,
              }}
              style={{ y }}
              onDrag={() => {
                if (y.get() > 140) {
                  setShowCoin((prev) => false);
                }
              }}
              onDragEnd={() => {
                if (y.get() > 120) {
                  setShowCoin((prev) => false);
                }
              }}
              className="coin-container-modal"
            >
              <div className="modal-content">
                {/* <div className="indicator"/> */}
                <div
                  className="close-button"
                  onClick={() => setShowCoin(false)}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <line
                      x1="22.3357"
                      y1="9.3249"
                      x2="9.32493"
                      y2="22.3357"
                      stroke="currentColor"
                      strokeWidth="0.8"
                      strokeLinecap="round"
                    />
                    <line
                      x1="22.6751"
                      y1="22.3357"
                      x2="9.66433"
                      y2="9.32493"
                      stroke="currentColor"
                      strokeWidth="0.8"
                      strokeLinecap="round"
                    />
                    <circle
                      cx="16"
                      cy="16"
                      r="15.9"
                      stroke="currentColor"
                      strokeWidth="0.2"
                    />
                  </svg>
                </div>
                <div className="head">
                  <img
                    src={selectedItem && selectedItem.image}
                    alt={selectedItem.id}
                  />
                  <div className="price">
                    <h2>{selectedItem && selectedItem.name}</h2>
                    {selectedItem && (
                      <div className="modal-price">
                        <p>
                          {" "}
                          ₱{" "}
                          {selectedItem.current_price.toLocaleString(
                            "en-US",
                            currency_format
                          )}
                        </p>
                        <p
                          className={[
                            `modal-price-change`,
                            selectedItem.price_change_percentage_24h < 0.0
                              ? "red"
                              : "green",
                          ].join(" ")}
                        >
                          {" "}
                          {selectedItem.price_change_percentage_24h.toFixed(
                            2
                          )}{" "}
                          %
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <CoinChart />

                <p
                  ref={description.current}
                  className="description"
                  dangerouslySetInnerHTML={{
                    __html: `${
                      dataLoading
                        ? coinData && coinData.description.en
                        : "loading...."
                    }`,
                  }}
                ></p>
              </div>
              <Link to={`/crypto/${selectedItem.id}`}>
                <button
                  className="modal-expand-button"
                  onClick={() => {
                    messData();
                  }}
                >
                  {" "}
                  Expand{" "}
                </button>
              </Link>
            </m.div>
          )}
        </m.div>
      )}
    </AnimatePresence>
  );
};

// CoinModal.propTypes = DataType

export default CoinModal;
