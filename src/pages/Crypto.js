import { useState, useEffect, useRef } from "react"
import axios from "axios"
import DataContext from "../util/DataContext"
import CoinFilter from "../components/Crypto/CoinFilter"
import CoinTable from "../components/Crypto/CoinTable"
const Crypto = () => {

    const [coins, setCoins] = useState([])
    const [filter, setFilter] = useState('')
    const [selectedItem, setSelectedItem] = useState(null)
    const [status, setStatus]= useState('')
    const currentButton = useRef(null)

    console.log('Current Selecter:', currentButton)
    useEffect(() => {
        setStatus(prev => 'Fetching Data from API ...')
        axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=php&order=market_cap_desc&per_page=100&page=1&sparkline=false')
            .then(response => response.data)
            .then(data => {
                setStatus(prev => 'Fetching ...')
                setCoins(prev => data)
                setStatus(prev => 'Successfully fetched')})
            .catch(err => alert('Error on Fetch: ', err))
            
            return console.log('unmouted')
    }, [])
    // console.log(coins)
    return (
        <DataContext.Provider
            value={{
                coins,
                filter,
                setCoins,
                setFilter,
                selectedItem,
                setSelectedItem,
            }}>
            <div className='form' >
                <div className='header'>
                <h2 className='crypto-home-title'>Markets</h2>
                <p className='status'>{status}</p>
                </div>
                
                <CoinFilter />   
            </div>
            <CoinTable />

        </DataContext.Provider>
    )
}

export default Crypto

