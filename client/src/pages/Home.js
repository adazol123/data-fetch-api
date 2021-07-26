import News from "../components/News/News";
import NewsModal from "../components/News/NewsModal";
const Home = () => {
  return (

      <div className="home-container">
        <div className="head">
          <h2 className="home-title">
            Headlines <span>Finance</span>{" "}
          </h2>
        </div>
        <News />
        <NewsModal/>
      </div>

  );
};

export default Home;
