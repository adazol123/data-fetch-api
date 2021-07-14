import React, { useContext} from 'react'
import { Redirect } from 'react-router-dom'
import DataContext from '../../util/DataContext'
const Coin = ( { match: { params: { id }}}) => {
    const {selectedItem, showCoin, setShowCoin} = useContext(DataContext)
    console.log(selectedItem)
    if(id) {
    return (
        <div align='center'>
            <h3>I am the coin panel for { id }</h3>
            <p style={{ color: '#333'}}>Page current on building phase</p>
        </div>
       
    )}
    return (
        <Redirect to={{ pathname: '/404'}} />
    )
}

export default Coin
