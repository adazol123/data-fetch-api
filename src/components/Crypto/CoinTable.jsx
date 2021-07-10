import {useContext} from 'react'
import DataContext from '../../util/DataContext'
import CoinRow from './CoinRow'
import { LazyMotion, m } from 'framer-motion'

const CoinTable = () => {
    const {coins, filter, setSelectedItem} = useContext(DataContext)

    const page = () => {
        if(filter) return (50) 
        else return (10)
    }
    const loadFeatures = () => import('../../util/features.js').then(res => res.default)
    const container = {
        hidden: { opacity: 0, scale: 0},
        visible: { 
            opacity: 1, 
            scale: 1,
            transition: {
                delayChildren: 0.2,
                staggerChildren: 0.2,
                
            }
        },
        
    }
    const item = {
        hidden: { y: 10, opacity: 0},
        visible: { y: 0, opacity: 1},
        exit: { y: 10, opacity: 0},

    }
    return (
        <LazyMotion features={loadFeatures}>
        <m.div
         className="crypto-button-container"
         variants={container}
         initial='hidden'
         animate={coins? 'visible' : 'hidden'}
         exit='hidden'
         >
            {coins? coins
                .filter(coins => coins.name.toLowerCase().includes(filter.toLowerCase()) || coins.symbol.toLowerCase().includes(filter.toLowerCase()) ||
                coins.id.toLowerCase().includes(filter.toLowerCase()) )
                .slice(0,page())
                .map((coin, index) => (
                <m.div key={index} variants={item}>
                <CoinRow 
                    coins={coin}
                    onSelect={(coin) => {
                        setSelectedItem(coin)
                }} /> 
                </m.div>
                                
            )) : <h2>Loading...</h2>}

            {/* This section is currently on debugging mode when no search is found on the filter  */}
            <div className="sub-footer">
                <p>Coins shown above are only sorted based on top 10 market cap </p>
                <span>You can search for other coins in the search field above </span>
            </div>
        </m.div>
        </LazyMotion>
    )
}

export default CoinTable
