import {useContext, useEffect} from 'react'
import DataContext from '../../util/DataContext'
import CoinRow from './CoinRow'
import { LazyMotion, m } from 'framer-motion'
import useSWR from 'swr'
const fetcher = (...args) => fetch(...args).then(response => response.json())


const CoinTable = () => {
    const {coins, setCoins, filter, setSelectedItem, setStatus} = useContext(DataContext)

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

    const {data, error} = useSWR('/api/v3/markets', fetcher ,{
        revalidateOnFocus: false,
        refreshInterval: 50000
    })
    
    useEffect(() => {
        setStatus(prev => 'Fetching Data from API ...')
        setCoins( prev => data && data)
        console.log('Fetching ...')
        // axios.get('/api/v3/markets')
        //     .then(response => response.data)
        //     .then(data => {
        //         setStatus(prev => 'Fetching ...')
        //         setCoins(prev => data)
        //         setStatus(prev => 'Successfully fetched')})
        //     .catch(err => alert('Error on Fetch: ', err))
            
        //     return console.log('unmouted')

        }, [data])
        
    
    if (!data) return <div >Loading...</div> 
    if (error) return <div >Error on initial fetch</div> 
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
