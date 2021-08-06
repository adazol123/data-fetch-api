import { lazy, Suspense, useContext } from "react";
import DataContext from "../util/DataContext";
import CoinFilter from "../components/Crypto/CoinFilter";
import CoinTable from "../components/Crypto/CoinTable";
import CoinTrending from "../components/Crypto/CoinTrending";
const CoinModal = lazy(() => import("../components/Crypto/CoinModal")) ;

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
      <Suspense fallback={<h5 className='coin-loader'>Loading ....</h5>}>
        <CoinModal />
      </Suspense>
    </div>
  );
};

export default Crypto;
