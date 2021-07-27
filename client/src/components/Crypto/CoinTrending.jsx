import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import {motion, AnimatePresence} from 'framer-motion'
import DataContext from '../../util/DataContext'

const CoinTrending = () => {
    const {trendsData, setTrendsData, price_btc} = useContext(DataContext)

    useEffect(() => {
        axios.get('/api/trends')
            .then(response => response.data.result)
            .then(data => {
                console.log('fetching trends:', data.coins)
                return setTrendsData(prev => data.coins)
            })
            .catch(error => console.log('error on trends:', error))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    
    const container = {
        hidden: { opacity: 1, x: 0},
        visible: { 
            opacity: 1, 
            x: 0,
            transition: {
                delayChildren: 0.2,
                staggerChildren: 0.2,  
            }
        },
        
    }
    const item = {
        hidden: { x: 10, opacity: 0},
        visible: { x: 0, opacity: 1},
    }

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
                        whileHover={{ scale: 1.02}}
                        whileTap={{ scale: 0.95}}
                        >
                        <img src={data.item.small} alt={data.item.id} />
                        <h4> ₱ {(data.item.price_btc * price_btc).toPrecision(5)}</h4>
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



