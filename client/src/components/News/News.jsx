import React, { useEffect, useContext } from "react";
import axios from "axios";
import TimeAgoFormat from "./TimeAgoFormat";
import DataContext from '../../util/DataContext'

const News = () => {

  const {news, setNews, selectedItem, coins} = useContext(DataContext)

  useEffect(() => {
    console.log("fetching...");
    axios
      .get("/api/v3/news")
      .then((response) => response.data)
      .then((data) => {
        if (data.status === "ok") {
          setNews((prev) => data.articles);
          console.log('News Fetched: ',news.length);
        } else console.log("Error on news API");
      })
      .catch(err => console.log(err))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedItem]);
  console.log('from local', JSON.parse(localStorage.getItem('coins')))
  return (
    <React.Fragment>
      <div className="home-content">
        {news ? (
          news.map(
            (
              { content, description, publishedAt, source, title, urlToImage },
              index,
            ) => (
              <div className="data-home" key={index}>
                <div className="date">
                  <h5>{source.name}</h5>
                  <TimeAgoFormat date={publishedAt} />
                </div>
                {urlToImage && <img src={urlToImage} alt={source.name} />}

                <h3>{title.toLocaleString("en-US")}</h3>
                {description && (
                  <p dangerouslySetInnerHTML={{ __html: `${description}` }}></p>
                )}
              </div>
            ),
          )
        ) : (
          <div className="home-content">Loading...</div>
        )}
      </div>
    </React.Fragment>
  );
};

export default News;
