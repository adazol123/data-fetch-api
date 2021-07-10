import { useState } from "react"
// import axios from "axios"
import DataContext from "../util/DataContext"
import CoinFilter from "../components/Crypto/CoinFilter"
import CoinTable from "../components/Crypto/CoinTable"
import CoinModal from "../components/Crypto/CoinModal"
import CoinTrending from "../components/Crypto/CoinTrending"
// import useSWR from 'swr'
// const fetcher = (...args) => fetch(...args).then(response => response.json())
const Crypto = () => {

    const [coins, setCoins] = useState([])
    const [filter, setFilter] = useState('')
    const [selectedItem, setSelectedItem] = useState(null)
    const [status, setStatus]= useState('')
    const [showCoin, setShowCoin] = useState(false)
    // console.log('Current Selecter:', selectedItem && selectedItem.id)
    // const {data, error} = useSWR('/api/v3/markets', fetcher ,{
    //     revalidateOnFocus: false,
    //     refreshInterval: 50000
    // })
    
    // useEffect(() => {
    //     setStatus(prev => 'Fetching Data from API ...')
    //     setCoins(data)
    //     console.log('Fetching ...')
    //     // axios.get('/api/v3/markets')
    //     //     .then(response => response.data)
    //     //     .then(data => {
    //     //         setStatus(prev => 'Fetching ...')
    //     //         setCoins(prev => data)
    //     //         setStatus(prev => 'Successfully fetched')})
    //     //     .catch(err => alert('Error on Fetch: ', err))
            
    //     //     return console.log('unmouted')

    //     }, [data])
        
    
    // if (!data) return <div >Loading...</div> 
    // if (error) return <div >Error on initial fetch</div> 

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

