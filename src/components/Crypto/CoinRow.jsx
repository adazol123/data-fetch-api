import React, { useState } from 'react'
import DataType from '../../util/DataType'

const CoinRow = ({coins}) => {
    const [coinToggle, setCoinToggle] = useState(false)
    const toggleHandler = () => setCoinToggle(prev => !prev)
    console.log(coins)
    return (
        <>
        <div className="wrapper" onClick={toggleHandler}>
            <div className="crypto-button-left">
                <img src={coins.image} alt={['icon', coins.id].join('-')} />
                <div className="crypto-button-name">
                    <h4>{coins.name}</h4>
                    <p className="crypto-symbol">
                        {coins.symbol.toUpperCase()}
                    </p>
                </div>
            </div>
            
            {/* <div className='crypto-button-graph'>Graph</div>  */}

            <div className="crypto-button-price">
                <div className="crypto-price">
                    <h4> ₱
                        {coins.current_price.toLocaleString("en-US", {maximumFractionDigits: 2, minimumFractionDigits: 2 })}
                    </h4>
                    <p
                        className={[
                        `price-change`, 
                        coins.price_change_percentage_24h < 0? 'red' : 'green' ]
                        .join(' ')}>
                            {coins.price_change_percentage_24h.toFixed(2)}%
                    </p>
                </div>
                <div className={[`arrow`, coinToggle? 'show': null].join(' ')}><p>›</p></div>
            </div>
        </div>

        <div className={[`crypto-sub-button`, coinToggle? 'show': null].join(' ')}>
            <div className='sub-top'>
                <div>
                    <h4>ATH</h4>
                    <p>₱ {coins.ath.toLocaleString()}</p>      
                </div>
                <div>
                    <h4>High (24H)</h4>
                    <p>₱ {coins.high_24h.toLocaleString()}</p>      
                </div>
                <div>
                    <h4>Low (24H)</h4>
                    <p>₱ {coins.low_24h.toLocaleString()}</p>      
                </div>
                <div>
                    <h4>Market Cap</h4>
                    <p>₱ {coins.market_cap.toLocaleString()}</p>      
                </div>
            </div>
            <div className="sub-bottom">
                <button>More info</button>
            </div>
        </div>
        </>
    )
}

CoinRow.propTypes = DataType

export default CoinRow
