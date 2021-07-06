import PropTypes from 'prop-types'

const DataType = PropTypes.shape({
    coins: PropTypes.arrayOf(PropTypes.string),
    // coins: PropTypes.shape({
    //     id: PropTypes.string,
    //     name: PropTypes.string,
    //     symbol: PropTypes.string,
    //     image: PropTypes.string,
    //     current_price: PropTypes.number,
    //     price_change_percentage_24h: PropTypes.number,
    //     ath: PropTypes.number,
    //     high_24h: PropTypes.number,
    //     low_24h: PropTypes.number,
    //     market_cap: PropTypes.number,
    // }),
    // onSelect: PropTypes.func,

})


export default DataType