import React, { useContext, useState } from 'react'
import DataContext from '../../util/DataContext'

// import DataType from '../../util/DataType'

const CoinRow = ({coins, onSelect}, ...props) => {
    const [coinToggle, setCoinToggle] = useState(false)
    const {setShowCoin} = useContext(DataContext)
    const { 
            id, 
            name, 
            image, 
            symbol, 
            current_price: price, 
            price_change_percentage_24h: price_percent, 
        } = coins

    const toggleHandler = () => {
        setCoinToggle(prev => !prev)
        
    }
    // console.log('Coin Row:', coins)
    return (
        <>
        <div className="wrapper"  
            onClick={() => {
                onSelect(coins)
                setShowCoin(prev => !prev)
                }}
            >
            <div className="crypto-button-left">
                <img src={image} alt={['icon', coins.id].join('-')} />
                <div className="crypto-button-name">
                    <h4>{name}</h4>
                    <p className="crypto-symbol">
                        {symbol.toUpperCase()}
                    </p>
                </div>
            </div>
            
            {/* <div className='crypto-button-graph'>Graph</div>  */}

            <div className="crypto-button-price">
                <div className="crypto-price">
                    <h4> ₱
                        {price && price.toLocaleString("en-US", {maximumFractionDigits: 2, minimumFractionDigits: 2 })}
                    </h4>
                    <p
                        className={[
                        `price-change`, 
                        price_percent < 0? 'red' : 'green' ]
                        .join(' ')}>
                            {price_percent && price_percent.toFixed(2)}%
                    </p>
                </div>
                {/* <div className={[`arrow`, coinToggle? 'show': null].join(' ')}><p>›</p></div> */}
            </div>
        </div>

        {/* <div className={[`crypto-sub-button`, coinToggle? 'show': null].join(' ')}>
            <div className='sub-top'>
                <div>
                    <h4>ATH</h4>
                    <p>₱ {coins.ath.toLocaleString()}</p>      
                </div>
                <div>
                    <h4>High (24H)</h4>
                    <p>₱ {coins.high_24h && coins.high_24h.toLocaleString()}</p>      
                </div>
                <div>
                    <h4>Low (24H)</h4>
                    <p>₱ {coins.low_24h && coins.low_24h.toLocaleString()}</p>      
                </div>
                <div>
                    <h4>Market Cap</h4>
                    <p>₱ {coins.market_cap && coins.market_cap.toLocaleString()}</p>      
                </div>
            </div>
            <div className="sub-bottom">
                <button onClick={() => {
                    onSelect(coins)
                    setShowCoin(prev => !prev)
                    }}>More info</button>
            </div>
        </div> */}
        </>
    )
}

// CoinRow.propTypes = DataType

export default CoinRow
