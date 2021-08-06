import React, { useEffect, useState } from 'react'
import axios from 'axios'
export const TestPage = () => {
    let url = 'https://data.messari.io/api/v1/assets?limit=500'
    const [coins, setCoin] = useState(null)
    async function getCoin() {
        let data = await axios(url)
        let response = await data.data
        
        return await response.data
    }
    useEffect(() => {
        console.log(coins)
        getCoin().then(data =>  setCoin(prev => data)  )  

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    if(!coins) { return <div>loading ...</div>}
    console.log(coins)
    return (
        <div>
            {coins.map(coin => (
                <div key={coin.id}>
                <img src={`https://messari.io/asset-images/${coin.id}/64.png`} alt={coin.symbol} />
                <h3>{coin.name}</h3>
                <p>{coin.profile.sector}</p>
                <p>{coin.profile.tagline}</p>
                </div>
            ))}
        </div>
    )
}
