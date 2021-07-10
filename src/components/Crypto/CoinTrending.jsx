import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import {motion, AnimatePresence} from 'framer-motion'
import DataContext from '../../util/DataContext'
import useSWR from 'swr'
const fetcher = (...args) => fetch(...args).then(response => response.json())

const CoinTrending = () => {
    const {setSelectedItem} = useContext(DataContext)
    const [trendsData, setTrendsData] = useState([])
    const [btcPrice, setBtcPrice] = useState(1651325)

    const {data, error} = useSWR('/api/v3/trending', fetcher ,{
        revalidateOnFocus: false,
        refreshInterval: 50000
    })
    useEffect(() => {
        axios.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=php')
            .then(response => response.data)
            .then( data => data.bitcoin.php)
            .then( price => setBtcPrice( prev => price))
            .catch(error => console.log('Trends Error:', error))
    },[setSelectedItem])

    useEffect(() => {
        setTrendsData(prev => data && data.coins)
        // axios.get('api/v3/trending')
        //     .then(response => response.data)
        //     .then( data => setTrendsData(prev => data.coins))
        //     .catch(error => console.log('Trends Error:', error))
    },[data])
    // console.log(trendsData)
    const container = {
        hidden: { opacity: 1, x: 0},
        visible: { 
            opacity: 1, 
            x: 0,
            transition: {
                delayChildren: 0.2,
                staggerChildren: 0.3,
                
            }
        },
        
    }
    const item = {
        hidden: { x: 100, opacity: 0},
        visible: { x: 0, opacity: 1},


    }
    if (!data) return <div >Loading...</div> 
    if (error) return <div >Error on initial fetch</div> 
    return (
        <AnimatePresence exitBeforeEnter>
        <React.Fragment>
            <h2 className='trends-title'>Trends</h2>
            <div className="trends-list"
               
                >
                <motion.div 
                initial='hidden'
                animate={trendsData? 'visible' : 'hidden'}
                variants={container}
                exit='hidden'
                drag='x' 
                dragConstraints={{ left: (-110 * 7), right: 30}}
                style={{ width: 800 }}
                className="trends-row">


                {trendsData && trendsData.map(data => (
                    <motion.div  
                        key={data.item.id}
                        variants={item}
                        >
                        <img src={data.item.small} alt={data.item.id} />
                        <h4> ₱ {(data.item.price_btc * btcPrice).toPrecision(5)}</h4>
                        <p>{data.item.symbol}</p>
                    </motion.div>
                ))}
                </motion.div>
            </div>
        </React.Fragment>
        </AnimatePresence>
    )
}

export default CoinTrending



