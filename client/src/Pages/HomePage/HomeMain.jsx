import React from "react";
import HomeNav from "../../Components/HomePageComponent/HomeNav";
import HomeAbout from "../../Components/HomePageComponent/HomeAbout";
import HomeServices from "../../Components/HomePageComponent/HomeServices";
import HomeTestimonials from "../../Components/HomePageComponent/HomeTestimonials";
import HomeContactUs from "../../Components/HomePageComponent/HomeContactUs";
import HomeFooter from "../../Components/HomePageComponent/HomeFooter";

const HomeMain = () => {
  return (
    <>
      <div className="px-12">
        {/* Header and Nav Section Start */}
        <HomeNav />
        {/* Header and Nav Section End */}

        {/* What Is RB Start */}
        <HomeAbout />
        {/* What Is RB End */}

        {/* Services Start */}
        <HomeServices />
        {/* Services End */}

        {/* Testimonials Start */}
        <HomeTestimonials />
        {/* Testimonials End */}

        {/* Contact Us Start */}
        <HomeContactUs />
        {/* Contact Us End */}

        {/* Footer Start */}
        <HomeFooter />
        {/* Footer End */}
      </div>
    </>
  );
};

export default HomeMain;
