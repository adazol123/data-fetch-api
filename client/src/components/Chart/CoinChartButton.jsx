
const CoinChartButton = ({days, setDays, setDataInterval}) => {

  return (
    <div className="row-days">
    <button className={days === '1'? 'active': null} onClick={() => {
      setDays(prev => '1')
      setDataInterval(prev => 'minutely')
    }}>1D</button>
    <button className={days === '7'? 'active': null} onClick={() => {
      setDays(prev => '7')
      setDataInterval(prev => 'hourly')
    }}>1W</button>
    <button className={days === '30'? 'active': null} onClick={() => {
      setDays(prev => '30')
      setDataInterval(prev => 'daily')
    }}>1M</button>
    <button className={days === '183'? 'active': null} onClick={() => {
      setDays(prev => '183') 
      setDataInterval(prev => 'daily')
    }}>6M</button>
    <button className={days === '366'? 'active': null} onClick={() => {
      setDays(prev => '366') 
      setDataInterval(prev => 'daily')
    }}>1Y</button>
    <button className={days === 'max'? 'active': null} onClick={() => {
      setDays(prev => 'max') 
      setDataInterval(prev => 'monthly')
    }}>All</button>
  </div>
  )
}

export default CoinChartButton
