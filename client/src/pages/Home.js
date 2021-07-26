import News from "../components/News/News";
import NewsModal from "../components/News/NewsModal";
import { AnimatePresence } from "framer-motion";
const Home = () => {
  return (
    <AnimatePresence>
      <div className="home-container">
        <div className="head">
          <h2 className="home-title">
            Headlines <span>Finance</span>{" "}
          </h2>
        </div>
        <News />
        <NewsModal/>
      </div>
    </AnimatePresence>
  );
};

export default Home;
