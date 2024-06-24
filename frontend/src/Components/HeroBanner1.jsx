import React from 'react'
import bgImg from "../assets/home/banner-2.jpg";
const HeroBanner1 = () => {
  return (
    <div
    className="min-h-screen bg-cover "
    style={{ backgroundImage: `url(${bgImg})` }}
  >
    <div className="min-h-screen flex justify-start pl-11 items-center text-white bg-black bg-opacity-60">
      <div>
        <div className="space-y-4">
          <p className="md:text-4xl text-2xl">Best online  </p>
          <h1 className="md:text-7xl text-4xl font-bold">
          Course from Home.
          </h1>
          <div className="md:w-1/2">
            <p className="">
              t is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum is that it has a more-or-less normal
              distribution of letters, as opposed to using 'Content here,
              content here', making it look like readable English.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-5">
            <button className="px-7 py-3 rounded-lg bg-secondary font-bold uppercase">
              Join Today
            </button>
            <button className="px-7 py-3 rounded-lg border hover:bg-secondary outline-none font-bold uppercase">
              View Course
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default HeroBanner1
