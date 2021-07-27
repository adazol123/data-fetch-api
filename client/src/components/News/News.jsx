import React, { useEffect, useContext } from "react";
import axios from "axios";
import TimeAgoFormat from "./TimeAgoFormat";
import DataContext from '../../util/DataContext'

const News = () => {

  const {news, setNews, setSelectedItem, setToggle} = useContext(DataContext)
  useEffect(() => {
    console.log("fetching...");
    axios
      .get("/api/news")
      .then((response) => response.data.result)
      .then((data) => {
        setNews((prev) => data);
        console.log('News Fetched: ', data);
      })
      .catch(err => console.log(err))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log('from localStorage', JSON.parse(localStorage.getItem('coins')))
  return (
    <React.Fragment>
      <div className="home-content">
        {news ? (
          news.map(
            ({ content, description, publishedAt, source, title, urlToImage, image, url },index) => 
            
              <div className="data-home" key={index} 
                onClick={() =>
                  {
                    setSelectedItem(prev => [title, url, source])
                    setToggle(prev => !prev)
                  }
                }
              >
                <div className="date">
                  <h5>{source.name}</h5>
                  <TimeAgoFormat date={publishedAt} />
                </div>
                <div className="image-wrapper">

                {urlToImage? 
                  <img src={urlToImage} alt={source.name} />
                  :<img src={image} alt={source.name} /> }
                </div>

                <h3>{title.toLocaleString("en-US")}</h3>
                {description && (
                  <p dangerouslySetInnerHTML={{ __html: `${description}` }}></p>
                )}
              </div>
          )
        ) : (
          <div className="home-content">Loading...</div>
        )}
      </div>
    </React.Fragment>
  );
};

export default News;
