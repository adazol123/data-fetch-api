import { useState, useEffect } from "react"
import axios from "axios"

const Crypto = () => {

    const [coins, setCoins] = useState([])
    const [filter, setFilter] = useState('')

    useEffect(() => {
        axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=php&order=market_cap_desc&per_page=50&page=1&sparkline=false')
            .then(response => response.data)
            .then(data => {
                setCoins(prev => data)
                return console.log(coins)
            })
            .catch(error => alert('Error Code: ', error))

            return console.log('mouted')
    }, [])
    // console.log(coins)
    return (
        <div>
            <h2 className='crypto-home-title'>Crypto</h2>
            <div className='form' >
                <input type="text" value={filter} onChange={(event) => setFilter(prev => event.target.value)}/>
                <button >Search</button>
            </div>
            <div className="crypto-button-container">
                {coins && coins
                            .filter(coins => coins.name.toLowerCase().includes(filter.toLowerCase()) || coins.symbol.toLowerCase().includes(filter.toLowerCase()) ||
                            coins.id.toLowerCase().includes(filter.toLowerCase()) )
                            .slice(0, 20)
                            .map(coin => (
                            <COIN_BUTTON
                                key={coin.id}
                                image={coin.image}
                                name={coin.name}
                                symbol={coin.symbol}
                                current_price={coin.current_price}
                                price_change={coin.price_change_percentage_24h}
                            />  
                                
                ))}
            </div>                 

        </div>
    )
}

export default Crypto


const COIN_BUTTON = ( {id, name, symbol, image, current_price, price_change }) => (
        <div className="wrapper" key={id}>
            <div className="crypto-button-left">
                <img src={image} alt={['icon', id].join('-')} /> 
                <div className='crypto-button-name'>
                    <h4>{name}</h4>
                    <p className='crypto-symbol'>{symbol.toUpperCase()}</p> 
                </div>
            </div>
        
            {/* <div className='crypto-button-graph'>Graph</div>  */}
            <div className="crypto-button-price">
                <div className='crypto-price'>
                    <h4> ₱ {            
                    current_price.toLocaleString("en-US", {maximumFractionDigits: 2, minimumFractionDigits: 2 })
                    
                    }</h4>
                    <p className={[
                        `price-change`, 
                        price_change < 0? 'red' : 'green' ]
                        .join(' ')}>
                        {price_change.toFixed(2)}%
                    </p> 
                </div>
                <div className="arrow">›</div> 
            </div>
            
        </div>
)