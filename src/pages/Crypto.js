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
                                id={coin.id}
                                key={coin.id}
                                image={coin.image}
                                name={coin.name}
                                symbol={coin.symbol}
                                current_price={coin.current_price}
                                price_change={coin.price_change_percentage_24h}
                                ath={coin.ath}
                                high_24h={coin.high_24h}
                                low_24h={coin.low_24h}
                                market_cap={coin.market_cap}
                            />  
                                
                ))}
            </div>                 

        </div>
    )
}

export default Crypto


const COIN_BUTTON = ( props) => {

    const {
        id, 
        name, 
        symbol, 
        image, 
        current_price, 
        price_change,
        ath,
        high_24h,
        low_24h,
        market_cap,

    } = props
    
    const [coinToggle, setCoinToggle] = useState(false)

    const toggleHandler = () => {

            setCoinToggle(prev => !prev)

    }
    
    return (
        <>
        
        <div className="wrapper" key={id} onClick={toggleHandler} >
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
                <div className={[`arrow`, coinToggle? 'show': null].join(' ')}><p>›</p> </div> 
            </div>
            
        </div>
        <div className={[`crypto-sub-button`, coinToggle? 'show': null].join(' ')}>
            <div className='sub-top'>
                <div>
                    <h4>ATH</h4>
                    <p>₱ {ath.toLocaleString()}</p>      
                </div>
                <div>
                    <h4>High (24H)</h4>
                    <p>₱ {high_24h.toLocaleString()}</p>      
                </div>
                <div>
                    <h4>Low (24H)</h4>
                    <p>₱ {low_24h.toLocaleString()}</p>      
                </div>
                <div>
                    <h4>Market Cap</h4>
                    <p>₱ {market_cap.toLocaleString()}</p>      
                </div>
            </div>
            <div className="sub-bottom">
                <button>More info</button>
            </div>
        </div>
        </>
)}