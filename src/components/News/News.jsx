import React, { useState, useEffect } from "react";
import axios from "axios";
import TimeAgoFormat from "./TimeAgoFormat";
const News = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    console.log("fetching...");
    axios
      .get("/api/v3/news")
      .then((response) => response.data)
      .then((data) => {
        if (data.status === "ok") {
          setNews((prev) => data.articles);
          console.log(news);
        } else console.log("Error on news API");
      })
      .then(console.log("fetched!"));
  }, []);

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
                  <TimeAgoFormat date={publishedAt.slice(0, 10)} />
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
