import React, { useContext, useEffect, useRef, useState } from 'react'
import DataContext from '../../util/DataContext'
import { useMotionValue, m, LazyMotion} from 'framer-motion'
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
                console.log('Fetch:', selectedItem.id)
                setDataLoading(true)
            })


    }, [selectedItem])
    

    const loadFeatures = () => import('../../util/features-animate.js').then(res => res.default)

    
    const y = useMotionValue(0)
    const [expand, setExpand] = useState('down')
    const currency_format = {maximumFractionDigits: 2, minimumFractionDigits: 2 }

    // description.current.innerHTML = coinData.description.en
    const variants = {
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.4, ease: 'linear'},
            
        },
        exit: { 
            opacity: 0, 
            y: 500,
            transition: { ease: 'linear', duration: 0.4}
         },
      }
      
    return (
        <LazyMotion features={loadFeatures}  >
        {showCoin && <m.div

        data-modal='show' className='crypto-modal'>
        <div className="modal-backdrop"
            onClick={() => {
                setShowCoin(prev => !prev)
                setExpand(prev => 'down')
            }}
        />
        {selectedItem &&
        <m.div 
        initial='exit'
        animate='visible'
        exit='exit'
        variants={variants}
            drag='y'
            dragConstraints={{ top: 0, bottom: 0}}
            dragElastic={1}
            dragMomentum={true}

            style={{ y, transition: '0.5s ease-in-out', bottom: expand }}
            onDrag={
                () => {
                    if( expand === '0%' && y.get() > 140 ) {
                        setExpand(prev => '-40%')}
                    if(expand === '-40%' && y.get() > 220) {
                        setShowCoin(prev => false)
                        // setExpand(prev => '-40%')
                    }
                    if( expand === '-40%' && y.get() < -50) 
                        setExpand(prev => '0%')
                    // else setExpand(prev => 'down')
                    // console.log(expand, showCoin, y.get())
                }
              }
        className='coin-container-modal'>
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
            <button className="test"> Expand </button>

        </m.div>}
        </m.div>}
        </LazyMotion>
    )
}

// CoinModal.propTypes = DataType


export default CoinModal
