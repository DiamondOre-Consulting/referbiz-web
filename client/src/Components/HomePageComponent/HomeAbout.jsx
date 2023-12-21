import React from "react";
import AboutPic from "../../assets/AffiliateServicePic.jpg";

const HomeAbout = () => {
  return (
    <div>
      <div className="bg-white py-6 sm:py-8 lg:py-12">
        <div className="mx-auto max-w-screen-xl px-4 md:px-8">
          <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
            <div>
              <div className="h-64 mx-10 my-10 flex justify-center items-center overflow-hidden rounded-lg bg-gray-200 shadow-2xl md:h-auto">
                <img
                  src={AboutPic}
                  loading="lazy"
                  alt="Photo by Martin Sanchez"
                  className="h-full w-full rounded-lg "
                />
              </div>
            </div>

            <div className="md:pt-8 my-auto">
              <p className="text-center font-bold text-indigo-500 md:text-left">
                Who we are
              </p>

              <h1 className="mb-4 text-center text-2xl font-bold text-gray-800 sm:text-3xl md:mb-6 md:text-left">
                About Us
              </h1>

              <p className="mb-6 text-gray-500 sm:text-lg md:mb-8">
                At <span className="text-indigo-600 font-bold">ReferBiz</span>, we are the architects of career transformation. Our
                journey began with a vision to reshape professional development.
                Today, we stand at the forefront of innovation, offering a
                comprehensive suite of services that empower individuals and
                organizations alike.
                <br />
                <br />
                Our groundbreaking Affiliate and Associate Models redefine
                professional networking, allowing individuals to connect,
                collaborate, and thrive. Our Resume Building Services craft
                compelling narratives that open doors to new opportunities.
                <br />
                <br />
                But we don't stop there. Our Internship Consulting service
                bridges the gap between seekers and providers, nurturing the
                next generation of talent.
                <br />
                <br />
                At the heart of our mission lies a commitment to empowering
                career journeys, fostering growth, and cultivating a vibrant
                community. Join us in shaping a brighter future, one connection
                at a time. Discover limitless possibilities with <span className="text-indigo-600 font-bold">ReferBiz</span>.
              </p>

              {/* <h2 className="mb-2 text-center text-xl font-semibold text-gray-800 sm:text-2xl md:mb-4 md:text-left">
                About us
              </h2>

              <p className="mb-6 text-gray-500 sm:text-lg md:mb-8">
                This is a section of some simple filler text, also known as
                placeholder text. It shares some characteristics of a real
                written text but is random or otherwise generated. It may be
                used to display a sample of fonts or generate text for testing.
                Filler text is dummy text which has no meaning however looks
                very similar to real text.
              </p> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeAbout;
