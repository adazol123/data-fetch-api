import React, { useContext, useState, useEffect} from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import DataContext from '../../util/DataContext'
const Coin = ( { match: { params: { id }}}) => {
    const {selectedItem, showCoin, setShowCoin} = useContext(DataContext)
    const [coinData, setCoinData] = useState(null)
    const [dataLoading, setDataLoading] = useState(false)
    let locale = 'php'
    const  fetch = useEffect(  () => {
         console.log(coinData)
    axios.get(`https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&community_data=false&developer_data=false`)
            .then(response => response.data)
            .then(data => {
                setDataLoading(false)
                setCoinData(data)
                coinData && console.log('Fetch:', coinData)
                setDataLoading(true)
            })

            
    }, [])

    
    
    if(coinData ) {
        if (id === coinData.id) {
            return (
                <div >
                    <h3 align='center'>I am the coin panel for { coinData.id }</h3>
                    <h2>{[(locale).toUpperCase(), (coinData.market_data.current_price.php).toLocaleString()].join(' ')} </h2>
                    <p align='center' style={{ color: '#333'}}>Page current on building phase</p>
                    <h4>About {(coinData.name)} </h4>
                    <p dangerouslySetInnerHTML={{ __html: `${coinData.description.en}`}} />
                </div>
               
            )
        }
        return (
            <Redirect to={{ pathname: '/404'}} />
        )
       
        
    }
    return (
        <div align='center'>
            <h3>Loading data...</h3>
            <p style={{ color: '#333'}}>Page current on building phase</p>
        </div>
       
    )
   
}

export default Coin
