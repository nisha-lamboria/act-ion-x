import HomeStyles from "./Home.module.css";
import { Link } from "react-router-dom";
import { useVideos } from "../../context/VideosContest";
import { BottomNav } from "../../components/BottomNav/BottomNav";
import { GenreSlider } from "../../components/GenreSlider/GenreSlider";
import axios from "axios";
import { useEffect } from "react";
import { GET_CATEGORIES, GET_GENRES } from "../../utilities/actions-types";

const Home = () => {
  const {
    videoStates: { categories },
    videoDispatch,
  } = useVideos();

  useEffect(() => {
    (async () => {
      try {
        const {
          data: { categories },
        } = await axios.get("/api/categories");
        videoDispatch({ type: GET_CATEGORIES, payload: categories });
      } catch (error) {
        console.log(error);
      }
    })();
    videoDispatch({ type: GET_GENRES, payload: [] });
  }, [videoDispatch]);

  return (
    <div>
      <section className={HomeStyles.topSection}>
        <h1 className={`text-render1`}>
          Fall asleep while listening to amazing stories.
        </h1>
        <Link to="/video-listing">
          <button className={`${HomeStyles.linkBtn}`}>Start</button>
        </Link>
      </section>
      <h2 className={`${HomeStyles.catsHeading} text-render`}>
        Dive into intensities of yourself
      </h2>
      <section className={`${HomeStyles.catsWrapper} flex-center`}>
        {categories?.map((catObj) => {
          return (
            <div key={catObj._id}>
              <Link to="/video-listing">
                <img
                  src={catObj.catImg}
                  className={`${HomeStyles.catImg}`}
                  style={{
                    height: "220px",
                    width: "220px",
                    maxInlineSize: "100%",
                    objectFit: "contain cover",
                  }}
                  alt={catObj.category}
                ></img>
              </Link>
            </div>
          );
        })}
      </section>
      <GenreSlider />
      <BottomNav />
    </div>
  );
};

export { Home };
