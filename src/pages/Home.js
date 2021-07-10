
import { useState, useEffect} from 'react'
import axios from 'axios'

const Home = () => {
    const [news, setNews] = useState([])
    useEffect(() => {
        axios.get('/api/v3/news')
        .then(response => response.data)
        .then(data => {
            if (data.status === 'ok') {
                console.log('fetching...')
                setNews(prev => data.articles)
                console.log('fetched!')
            } else console.log('Error on news')
        })
    },[news])
    console.log(news)
    return (
        <div className='home-container'>
            <div className="head">
                <h2  className='crypto-home-title'> Home </h2>
                <p  > Financial News </p>
            </div>

        <div className='home-content'>
            
            {news? news.map(({content, description, publishedAt, source, title, urlToImage},index) => (
                <div className="data-home" key={index}>
                    
                    <div className="date">
                        <h5>{source.name}</h5>

                        <p>{publishedAt.slice(0,10)}</p>
                    </div>
                    {urlToImage && <img src={urlToImage} alt={source.name} />}
                    
                    <h3>{title.toLocaleString('en-US')}</h3>
                    <p dangerouslySetInnerHTML={{__html: `${description}`}}></p>
                    

                </div>
            )): <div className="load">Loading...</div>   }
            
        </div>
        </div>
    )
}

export default Home
