import { useState, useEffect } from "react"
import axios from "axios"
import DataContext from "../util/DataContext"
import CoinFilter from "../components/Crypto/CoinFilter"
import CoinTable from "../components/Crypto/CoinTable"
import CoinModal from "../components/Crypto/CoinModal"
import CoinTrending from "../components/Crypto/CoinTrending"
const Crypto = () => {

    const [coins, setCoins] = useState([])
    const [filter, setFilter] = useState('')
    const [selectedItem, setSelectedItem] = useState(null)
    const [status, setStatus]= useState('')
    const [showCoin, setShowCoin] = useState(false)
    console.log('Current Selecter:', selectedItem && selectedItem.id)
    useEffect(() => {
        setStatus(prev => 'Fetching Data from API ...')
        axios.get('/api/v3/markets')
            .then(response => response.data)
            .then(data => {
                setStatus(prev => 'Fetching ...')
                setCoins(prev => data)
                setStatus(prev => 'Successfully fetched')})
            .catch(err => alert('Error on Fetch: ', err))
            
            return console.log('unmouted')
    }, [])
    return (
        <DataContext.Provider
            value={{
                coins,
                filter,
                setCoins,
                setFilter,
                selectedItem,
                setSelectedItem,
                showCoin, 
                setShowCoin,
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

