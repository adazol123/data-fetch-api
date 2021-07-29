import React, { useContext } from "react";
import DataContext from "../../util/DataContext";
import { Link } from "react-router-dom";
import CoinChart from "./CoinChart";
import { Modal } from "../Modals/Modal";
// import DataType from '../../util/DataType'



const CoinModal = () => {

  const { selectedItem, showCoin, setShowCoin} = useContext(DataContext);


  if(!selectedItem) return null

  return (
    <>

        <Modal toggle={showCoin} setToggle={setShowCoin}>
          <CloseIcon isClosed={setShowCoin} />
          <Header selectedItem={selectedItem} />
          <CoinChart selectedItem={selectedItem} />

          <Link to={`/crypto/${selectedItem.id}`}>
            <button
              className="modal-expand-button"
            >
              Expand
            </button>
          </Link>
        </Modal>

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
