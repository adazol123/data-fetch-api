

import News from '../components/News/News'


const Home = () => {

    return (
        <div className='home-container'>
            <div className="head">
                <h2  className='crypto-home-title'>Headlines <span>Finance</span> </h2>
            </div>
            <News />

        </div>
    )
}

export default Home
