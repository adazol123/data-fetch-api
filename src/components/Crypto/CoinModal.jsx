import React, { useContext, useEffect, useRef, useState } from 'react'
import DataContext from '../../util/DataContext'
import { motion, useMotionValue, AnimatePresence   } from 'framer-motion'
import axios from 'axios'
import CoinChart from './CoinChart'
// import DataType from '../../util/DataType'

const CoinModal = () => {
    const {selectedItem, showCoin, setShowCoin} = useContext(DataContext)
    const [coinData, setCoinData] = useState(null)
    const [dataLoading, setDataLoading] = useState(false)
    const description = useRef()


    useEffect(() =>{
        selectedItem &&
        axios.get(`https://api.coingecko.com/api/v3/coins/${ selectedItem.id }?localization=true`)
            .then(response => response.data)
            .then(data => {
                setDataLoading(false)
                setCoinData(data)
                console.log('Fetch:', coinData)
                setDataLoading(true)
            })


    }, [selectedItem])
    


    const y = useMotionValue(0)
    const [expand, setExpand] = useState('down')
    const currency_format = {maximumFractionDigits: 2, minimumFractionDigits: 2 }

    // description.current.innerHTML = coinData.description.en
    const variants = {
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.4, ease: 'easeInOut'},
            
        },
        exit: { 
            opacity: 0, 
            y: 500,
            transition: { ease: 'easeInOut', duration: 0.4}
         },
      }
    return (
        <AnimatePresence >
        {showCoin && <motion.div

        data-modal='show' className='crypto-modal'>
        <div className="modal-backdrop"
            onClick={() => {
                setShowCoin(prev => !prev)
                setExpand(prev => 'down')
            }}
        />
        {selectedItem &&
        <motion.div 
        initial='exit'
        animate='visible'
        exit='exit'
        variants={variants}
            drag='y'
            dragConstraints={{ top: 0, bottom: 0}}
            dragElastic={0.3}
            style={{ y, transition: '0.4s ease'}}
            onDragEnd={
                () => {
                    if(y.get() > 50 && y.get() < 280) {
                        setExpand(prev => 'down')}
                    else if(y.get() > 280) {
                        setShowCoin(prev => false)
                        setExpand(prev => 'down')}
                    else if(y.get() < -50) setExpand(prev => 'up')
                    // else setExpand(prev => 'down')
                }
              }
        className={['coin-container-modal', expand].join(' ')}>
            <div className="modal-content">
                <div className="indicator"/>
                <div className='head'>
                    <img src={selectedItem && selectedItem.image} alt={selectedItem.id} />
                    <div className="price">
                    <h2>{selectedItem && selectedItem.name}</h2>
                    <div>
                        <p> ₱ {selectedItem && selectedItem.current_price.toLocaleString("en-US", currency_format)}</p>
                        <p> {selectedItem && selectedItem.price_change_percentage_24h.toFixed(2)} %</p>
                    </div>
                    </div>


                </div>

            <CoinChart />

            <p ref={description.current} className='description' dangerouslySetInnerHTML={{
                __html: `${dataLoading? coinData && coinData.description.en : 'loading....'}`
            }}> 
             </p>
          
            </div>

        </motion.div>}
        </motion.div>}
        </AnimatePresence>
    )
}

// CoinModal.propTypes = DataType


export default CoinModal
