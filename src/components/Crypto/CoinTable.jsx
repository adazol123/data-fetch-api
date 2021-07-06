import {useContext} from 'react'
import DataContext from '../../util/DataContext'
import CoinRow from './CoinRow'
const CoinTable = () => {
    const {coins, filter, setSelectedItem} = useContext(DataContext)
    const page = () => {
        if(filter) return (50) 
        else return (10)
    }
    return (
        <div className="crypto-button-container">
            {coins? coins
                .filter(coins => coins.name.toLowerCase().includes(filter.toLowerCase()) || coins.symbol.toLowerCase().includes(filter.toLowerCase()) ||
                coins.id.toLowerCase().includes(filter.toLowerCase()) )
                .slice(0,page())
                .map(coin => (
                <CoinRow 
                    key={coin.id}
                    coins={coin}
                    onSelect={(coin) => {
                        setSelectedItem(coin)
                }} /> 
                                
            )) : <h2>Loading...</h2>}

            {/* This section is currently on debugging mode when no search is found on the filter  */}
            <div className="sub-footer">
                <p>Coins shown above are only sorted based on top 10 market cap </p>
                <span>You can search for other coins in the search field above </span>
            </div>
        </div>
    )
}

export default CoinTable
