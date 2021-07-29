import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import fetch from 'node-fetch'
import CoinChart from '../Crypto/CoinChart'
import DataContext from '../../util/DataContext'



const fetcher = async (url) => {
    let fetchs = await fetch(url)
    let result = await fetchs.json()

    return result
}


const CoinUpdate = () => {
    let {id} = useParams()
    const { selectedItem} = useContext(DataContext);
    const [currentData, setCurrentData] = useState([])
    console.log(selectedItem)

    const loadData = async () => {
        try {
            let fetch = await fetcher(`/api/backend/coin/${id}`)
            let response = await fetch.coin
            return response
        } catch (error) {
            return <h3 className='coin-loader'>No data found</h3>
        }

    }
    useEffect(() => {
        console.log('test');
        loadData().then(data => setCurrentData(prev => data))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if(currentData.length < 1) return <h3 className='coin-loader'>loading . . .</h3>
    if(!currentData.token_details) return <h3 className='coin-loader'>No data found</h3>
    const {description, relevant_resources, emission_type_precise, ...others} = currentData.token_details
    return (
        <div className='coin-container'>
            <div className="coin-wrapper">
            <div className="coin-header">
                <div className="coin-header-left">
                    <h1 className="coin-title">{currentData.name} <span>({currentData.symbol.toUpperCase()})</span></h1>
                    <p className="coin-tagline">{currentData.tagline}</p>
                </div>
                <img className='coin-image' src={currentData.image.small} alt={currentData.id} />
            </div>
            <CoinChart selectedItem={selectedItem} />
            
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
        </div>
    )
   
}

export default CoinUpdate
