import { useContext } from "react";
import DataContext from "../util/DataContext";
import CoinFilter from "../components/Crypto/CoinFilter";
import CoinTable from "../components/Crypto/CoinTable";
import CoinModal from "../components/Crypto/CoinModal";
import CoinTrending from "../components/Crypto/CoinTrending";

const Crypto = () => {
  const { status } = useContext(DataContext);
  return (
    <div className="crypto-page">
       <CoinTrending />

      <div className="form">
        <div className="header">
          <h2 className="crypto-home-title">Markets</h2>
          <p className="status">{status}</p>
        </div>
        <CoinFilter />
      </div>
      <CoinTable />
      <CoinModal />
    </div>
  );
};

export default Crypto;
