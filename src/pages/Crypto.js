import { useState } from "react"
import DataContext from "../util/DataContext"
import CoinFilter from "../components/Crypto/CoinFilter"
import CoinTable from "../components/Crypto/CoinTable"
import CoinModal from "../components/Crypto/CoinModal"
import CoinTrending from "../components/Crypto/CoinTrending"

const Crypto = () => {

    const [coins, setCoins] = useState([])
    const [filter, setFilter] = useState('')
    const [selectedItem, setSelectedItem] = useState(null)
    const [status, setStatus] = useState('')
    const [showCoin, setShowCoin] = useState(false)

    return (
        <DataContext.Provider
            value={{
                coins,
                filter,
                status,
                setCoins,
                setFilter,
                selectedItem,
                setSelectedItem,
                showCoin,
                setShowCoin,
                setStatus
            }}>
            <div className='crypto-page'>
                {coins && <CoinTrending />}

                <div className='form' >
                    <div className='header'>
                        <h2 className='crypto-home-title'>Markets</h2>
                        <p className='status'>{status}</p>
                    </div>

                    <CoinFilter />
                </div>
                <CoinTable />
                <CoinModal />
            </div>

        </DataContext.Provider>
    )
}

export default Crypto

