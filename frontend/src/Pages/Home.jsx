import React from "react";
import HeroContainer from "../Components/HeroContainer";
import Gallery from "../Components/Gallery";
import PopularClasses from "../Components/PopularClasses";
import PopularInstructor from "./Instructor/PopularInstructor";

const Home = () => {
  return (
    <section>
      <HeroContainer />
      <div className="max-w-screen-xl mx-auto">
        <Gallery />
        <PopularClasses/>
        <PopularInstructor/>
      </div>
    </section>
  );
};

export default Home;
