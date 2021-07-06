import {useContext} from 'react'
import DataContext from '../../util/DataContext'
import CoinRow from './CoinRow'
import { motion, AnimatePresence } from 'framer-motion'

const CoinTable = () => {
    const {coins, filter, setSelectedItem} = useContext(DataContext)
    const page = () => {
        if(filter) return (50) 
        else return (10)
    }

    const container = {
        hidden: { opacity: 0, scale: 0},
        visible: { 
            opacity: 1, 
            scale: 1,
            transition: {
                delayChildren: 0.4,
                staggerChildren: 0.5
            }
        },
        
    }
    const item = {
        hidden: { y: 20, opacity: 0},
        visible: { y: 0, opacity: 1},
        exit: { y: 20, opacity: 0},

    }
    return (
        <AnimatePresence>
        <motion.div
         className="crypto-button-container"
         variants={container}
         initial='hidden'
         animate='visible'
         >
            {coins? coins
                .filter(coins => coins.name.toLowerCase().includes(filter.toLowerCase()) || coins.symbol.toLowerCase().includes(filter.toLowerCase()) ||
                coins.id.toLowerCase().includes(filter.toLowerCase()) )
                .slice(0,page())
                .map((coin, index) => (
                <motion.div key={index} variants={item}>
                <CoinRow 
                    coins={coin}
                    onSelect={(coin) => {
                        setSelectedItem(coin)
                }} /> 
                </motion.div>
                                
            )) : <h2>Loading...</h2>}

            {/* This section is currently on debugging mode when no search is found on the filter  */}
            <div className="sub-footer">
                <p>Coins shown above are only sorted based on top 10 market cap </p>
                <span>You can search for other coins in the search field above </span>
            </div>
        </motion.div>
        </AnimatePresence>
    )
}

export default CoinTable
