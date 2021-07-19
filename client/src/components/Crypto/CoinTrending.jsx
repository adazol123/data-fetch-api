import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import {motion, AnimatePresence} from 'framer-motion'
import DataContext from '../../util/DataContext'

const CoinTrending = () => {
    const {trendsData , setTrendsData, price_btc} = useContext(DataContext)

    useEffect(() => {
        console.log('fetching...')
        axios.get('/api/trends')
            .then(response => response.data)
            .then(data => {
                console.log('fetching trends:', data)
                return (
                    setTrendsData(prev => data.coins),
                    console.log('trends fetched!')
                    )
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


                {trendsData.map(data => {
                    const {item : {
                        id,
                        small,
                        price_btc : btc,
                        symbol
                    }} = data

                    return (
                    <motion.div  
                        key={id}
                        variants={item}
                        whileHover={{ scale: 1.02}}
                        whileTap={{ scale: 0.95}}
                        >
                        <img src={small} alt={id} />
                        <h4> ₱ {(btc * price_btc).toPrecision(5)}</h4>
                        <p>{symbol}</p>
                    </motion.div>
                )})}
                </motion.div>
            </div>
        </React.Fragment>
        </AnimatePresence>
    )
}

export default CoinTrending



