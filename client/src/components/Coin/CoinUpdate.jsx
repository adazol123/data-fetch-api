import React, { useState, useEffect, useContext } from 'react'
import fetch from 'node-fetch'
import DataContext from '../../util/DataContext'
import CoinChart from '../Crypto/CoinChart'


const fetcher = async (url) => {
    let fetchs = await fetch(url)
    let result = await fetchs.json()

    return result
}


const CoinUpdate = () => {
    const [currentData, setCurrentData] = useState([])
    const { selectedItem } = useContext(DataContext);

    const loadData = async () => {
        try {
            let fetch = await fetcher(`/api/backend/coin/${selectedItem.id}`)
            let response = await fetch.coin
            return response
        } catch (error) {
            return <h3 className='coin-loader'>No data found</h3>
        }

    }
    useEffect(() => {
        loadData().then(data => setCurrentData(prev => data))
    }, []);

    if(currentData.length < 1) return <h3 className='coin-loader'>loading . . .</h3>
    if(!currentData.token_details) return <h3 className='coin-loader'>No data found</h3>
    const {description, relevant_resources, emission_type_precise, ...others} = currentData.token_details
    return (
        <div className='coin-container'>
            <div className="coin-header">
                <div className="coin-header-left">
                    <h1 className="coin-title">{currentData.name} <span>({currentData.symbol.toUpperCase()})</span></h1>
                    <p className="coin-tagline">{currentData.tagline}</p>
                </div>
                <img className='coin-image' src={currentData.image.small} alt={currentData.id} />
            </div>
            <CoinChart />
            
                <h2 className="coin-subtitle">Overview</h2>
            <div className="coin-overview">
                {Object.entries(others).map((other,index) => {
                    return(
                        <div className='row' key={index}>
                        <h4>{other[0].replace('_', ' ').replace('_', ' ')}</h4>
                        <p>{other[1] || '- - -'}</p>
                    </div>
                )})}
                <div className="row">
                    <h4>Sector</h4>
                    <p>{currentData.sector}</p>
                </div>
            </div>
            
            <h2 className="coin-subtitle">About <span>{currentData.name}</span></h2>
            <p className="coin-description" dangerouslySetInnerHTML={{ __html: `${currentData.description}`}}/>

        </div>
    )
   
}

export default CoinUpdate
