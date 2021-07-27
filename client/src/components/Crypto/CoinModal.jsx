import React, { useContext, useEffect, useRef, useState } from "react";
import DataContext from "../../util/DataContext";
import axios from "axios";
import { Link } from "react-router-dom";
import CoinChart from "./CoinChart";
import { Modal } from "../Modals/Modal";
// import DataType from '../../util/DataType'

const CoinModal = () => {
  const { selectedItem, showCoin, setShowCoin, setCoinV1, setCoinV2 } =
    useContext(DataContext);
  const [coinData, setCoinData] = useState(null);
  const [dataLoading, setDataLoading] = useState(false);
  const description = useRef();

  const geckData = async () => {
    try {
      const api = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${selectedItem.id}?localization=true`
      );
      const response = await api.data;
      setCoinData(response);
      setCoinV1((prev) => response);
      localStorage.setItem("coinV1", JSON.stringify(response));
      setDataLoading((prev) => true);
      console.log("Fetch coin version 1");
    } catch (error) {
      console.log('Error on Coin Modal: ', error.message)
    }

  };

  const messData = async () => {
    try {
      const mes = await axios.get(
        `https://data.messari.io/api/v1/assets/${selectedItem.id}/profile`
      );
      const mesdata = await mes.data.data;
      setCoinV2((prev) => mesdata);
      localStorage.setItem("coinV2", JSON.stringify(mesdata));
      console.log("Fetch coin version 2");
      setDataLoading((prev) => true);
    } catch (error) {
      console.log('Error on Coin Modal: ', error.message)
    }
    
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



  return (
    <>
      {selectedItem && (
        <Modal toggle={showCoin} setToggle={setShowCoin}>
          <CloseIcon isClosed={setShowCoin} />
          <Header selectedItem={selectedItem} />
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
            }}/>

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
        </Modal>
      )}
    </>
  );
};

// CoinModal.propTypes = DataType

function CloseIcon({ isClosed, ...rest }) {
  return (
    <div className="close-button" onClick={() => isClosed(false)}>
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
  );
}

function Header({ selectedItem }) {
  const currency_format = {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  };
  return (
    <div className="modal-head">
      <img src={selectedItem && selectedItem.image} alt={selectedItem.id} />

      <div className="modal-price">
        <h2>{selectedItem && selectedItem.name}</h2>
        {selectedItem && (
          <div className="price">
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
              {selectedItem.price_change_percentage_24h.toFixed(2)} %
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default CoinModal;
