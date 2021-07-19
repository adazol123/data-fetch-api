import { useContext } from 'react'
import DataContext from '../../util/DataContext'


const CoinFilter =() => {
    const { filter, setFilter} = useContext(DataContext)

    return (
        <div className='input'>
        <input 
            type="text" 
            value={filter}
            placeholder='Search coins'
            onChange={(event) => setFilter(prev => event.target.value)}  />
        <button
            onClick={(event) => setFilter(prev => '')} disabled={filter.length === 0? true: false}>
                <p>
                    {filter.length > 0? 'Cancel' : ''}
                </p>
        </button>
        </div>
    )
}

export default CoinFilter