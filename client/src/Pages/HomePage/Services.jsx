import React, { useState } from "react";
import { Link } from "react-router-dom";
import HomeFooter from "../../Components/HomePageComponent/HomeFooter";
import RB_LOGO from "../../assets/RB_100_New.png";
import AffiliatePic from "../../assets/AffiliateServicePic.jpg";
import AssociatePic from "../../assets/AssociateServicePic.jpg";
import ResumeService from "../../assets/ResumeReject.png";

const Services = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    console.log(menuOpen);
  };
  return (
    <div>
      {/* Navbar Start */}
      <div className="bg-white pb-1 sm:pb-1 lg:pb-1">
        <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
          <header className="mb-8 flex items-center justify-between py-4 md:mb-12 md:py-8 xl:mb-16">
            <a
              href="/"
              className="text-black-800 inline-flex items-center gap-2.5 text-2xl font-bold md:text-3xl"
              aria-label="logo"
            >
              {/* <svg
                width="95"
                height="94"
                viewBox="0 0 95 94"
                className="h-auto w-6 text-indigo-500"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M96 0V47L48 94H0V47L48 0H96Z" />
              </svg>
              Flowrift */}
              <img className="w-1/2" src={RB_LOGO} alt="" />
            </a>

            <nav className="hidden gap-12 lg:flex">
              <Link
                to={"/"}
                className="text-lg font-semibold text-gray-600 transition duration-100 hover:text-indigo-500"
              >
                Home
              </Link>
              <Link
                to={"/aboutus"}
                className="text-lg font-semibold text-gray-600 transition duration-100 hover:text-indigo-500"
              >
                About Us
              </Link>
              <Link
                to={"/services"}
                className="text-lg font-semibold text-indigo-500 transition duration-100 hover:text-indigo-500 active:text-indigo-700"
              >
                Services
              </Link>
              <Link
                to={"/contactmain"}
                className="text-lg font-semibold text-gray-600 transition duration-100 hover:text-indigo-500 active:text-indigo-700"
              >
                Contact Us
              </Link>
            </nav>

            <Link
              to={'/home-main'}
              className="hidden rounded-lg bg-gray-200 px-8 py-3 text-center text-sm font-semibold text-gray-500 outline-none ring-indigo-300 transition duration-100 hover:bg-gray-300 focus-visible:ring active:text-gray-700 md:text-base lg:inline-block"
            >
              Signin
            </Link>

            <button
              type="button"
              onClick={toggleMenu}
              className="inline-flex items-center gap-2 rounded-lg bg-gray-200 px-2.5 py-2 text-sm font-semibold text-gray-500 ring-indigo-300 hover:bg-gray-300 focus-visible:ring active:text-gray-700 md:text-base lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clip-rule="evenodd"
                />
              </svg>
              Menu
            </button>
          </header>
          <ul
            className={`gap-10 ${
              menuOpen ? "block" : "hidden"
            } w-full flex flex-col items-center justify-center mb-14`}
          >
            <Link to={"/"}>
              <li
                className={`${
                  menuOpen ? "block" : "hidden"
                } transition ease-in-out delay-150 px-32 py-3 text-gray-600 text-lg font-semibold hover:bg-indigo-500 hover:text-white hover:-translate-y-1 hover:scale-110 duration-250`}
              >
                Home
              </li>
            </Link>
            <Link to={"/aboutus"}>
              <li
                className={`${
                  menuOpen ? "block" : "hidden"
                } px-32 py-3 text-gray-600 text-lg font-semibold hover:bg-indigo-500 hover:text-white transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-250`}
              >
                About Us
              </li>
            </Link>
            <Link to={"/services"}>
              <li
                className={`${
                  menuOpen ? "block" : "hidden"
                } px-32 py-3 text-gray-600 text-lg font-semibold hover:bg-indigo-500 hover:text-white transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-250`}
              >
                Services
              </li>
            </Link>
            <Link to={"/contactmain"}>
              <li
                className={`${
                  menuOpen ? "block" : "hidden"
                } px-32 py-3 text-gray-600 text-lg font-semibold hover:bg-indigo-500 hover:text-white transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-250`}
              >
                Contact Us
              </li>
            </Link>
            <Link to={"/home-main"}>
              <li
                className={`${
                  menuOpen ? "block" : "hidden"
                } px-32 py-3 text-lg font-semibold bg-indigo-500 text-white hover:bg-indigo-700 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-250`}
              >
                Signin
              </li>
            </Link>
          </ul>
        </div>
      </div>
      {/* Navbar End */}

      <section id="affiliateModel">
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:py-12 sm:px-6 lg:py-16 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
            <div className="relative h-64 overflow-hidden rounded-lg sm:h-80 lg:order-last lg:h-full">
              <img
                alt="Photo by Fauxels"
                src={AffiliatePic}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>

            <div className="lg:py-24">
              <h2 className="text-3xl font-bold sm:text-4xl">
                Refer & Earn Club: Unleash Your Earnings Potential with the
                Affiliate Model
              </h2>

              <p className="mt-4 text-gray-600">
                Welcome to our Affiliate Model, where you have the opportunity
                to turn your network into a source of continuous income and
                professional advancement. At{" "}
                <span className="text-indigo-700 font-bold">ReferBiz</span>,
                we've revolutionized the way you connect and earn.
                <br />
                <br />
                <span className="font-bold text-gray-800">
                  Referral Focus:
                </span>{" "}
                Our Affiliate Model centers on referrals, making it effortless
                for you to introduce qualified candidates to exciting job
                opportunities. Whether you're an industry expert, a student, or
                simply well-connected, your network can now become a valuable
                asset.
                <br />
                <br />
                <span className="font-bold text-gray-800">
                  Incentive Thrill:
                </span>{" "}
                Experience the thrill of earning incentives that go beyond
                traditional networking. With our dopamine-inducing rewards
                system, you'll be motivated to grow your referral network and
                watch your earnings soar.
                <br />
                <br />
                <span className="font-bold text-gray-800">
                  Winning Spirit:
                </span>{" "}
                Cultivate a winning mindset within our vibrant community of
                Affiliate Model participants. Learn from successful referrers,
                share insights, and celebrate achievements together. Leaderboard
                Rewards: Climb quantifiable leaderboards, earn recognition, and
                unlock lucrative rewards as you excel in your referral efforts.
                It's a competitive journey toward success that keeps you
                motivated.
                <br />
                <br />
                <span className="font-bold text-gray-800">
                  Gamification:
                </span>{" "}
                Engage in a gamified experience that turns networking into an
                enjoyable adventure. Each referral becomes a strategic move, and
                each incentive earned feels like a victory.
                <br />
                <br />
                <span className="font-bold text-gray-800">
                  Performance Dashboards:
                </span>{" "}
                Monitor your progress with ease using our intuitive performance
                management dashboards. Track your referrals, earnings, and
                network growth, all in one place.
                <br />
                <br />
                Join the Refer and Earn Club today, and transform your
                connections into a powerful source of income and professional
                development. It's time to unlock your true earning potential
                with <span className="text-indigo-700 font-bold">ReferBiz</span>
                .
              </p>

              <Link
                to={'/auth'}
                className="mt-8 inline-block rounded bg-indigo-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-yellow-400"
              >
                Get Started Today
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="associateModel" className="mt-5">
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:py-12 sm:px-6 lg:py-16 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
            <div className="relative h-64 overflow-hidden rounded-lg sm:h-80 lg:h-full">
              <img
                alt="Photo by Thirdman"
                src={AssociatePic}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>

            <div className="lg:py-24">
              <h2 className="text-3xl font-bold sm:text-4xl">
                Pro Partnership: Forge Professional Alliances with Associate
                Model
              </h2>

              <p className="mt-4 text-gray-600">
                Welcome to our Associate Model, a platform designed to connect
                professionals, foster mentorship, and elevate careers. At
                <span className="text-indigo-700 font-bold">ReferBiz</span>, we redefine the meaning of networking and
                collaboration.
                <br />
                <br />
                <span className="font-bold text-gray-800"></span>Mentorship Network: The heart of our Associate Model is a
                thriving mentorship network. Seasoned professionals become
                mentors, guiding and shaping the careers of emerging talents.
                For associates, it's an opportunity to gain valuable insights
                and mentorship from industry experts.
                <br />
                <br />
                <span className="font-bold text-gray-800">ProConnect:</span> Our platform facilitates professional networking at
                its finest. Associates collaborate on projects, share insights,
                and build lasting relationships. It's a hub for forging
                connections and expanding your professional circle.
                <br />
                <br />
                <span className="font-bold text-gray-800">FreelanceFusion:</span> We encourage freelancing within our community.
                Associates can work on projects independently while staying
                connected to our organization, combining the flexibility of
                freelancing with the resources of a company.
                <br />
                <br />
                <span className="font-bold text-gray-800">SkillShare Hub:</span> Become part of a community where associates
                share their expertise and learn from one another. It's a dynamic
                environment for continuous professional growth.
                <br />
                <br />
                <span className="font-bold text-gray-800">ExpertHub:</span> Leverage the collective knowledge and skills of
                seasoned experts within our organization. Associates gain access
                to valuable resources and guidance, enhancing their own
                abilities.
                <br />
                <br />
                <span className="font-bold text-gray-800">MentorMate:</span> Associates connect with mentors who provide guidance
                and support throughout their career journeys. It's a partnership
                that ensures success as you navigate your professional path.
                <br />
                <br />
                At <span className="text-indigo-700 font-bold">ReferBiz</span>, we believe that the power of professional networks
                and mentorship can transform careers. Join us in shaping a
                brighter future, one connection at a time. Discover limitless
                opportunities with MentorLink, the heart of our Associate Model.
              </p>

              <Link
                to={'/assoAuth'}
                className="mt-8 inline-block rounded bg-indigo-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-yellow-400"
              >
                Get Started Today
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="resumeBuidling" className="overflow-hidden lg:mx-32 sm:mx-10 mt-10 rounded-lg shadow-2xl md:grid md:grid-cols-3">
        <img
          alt="Trainer"
          src={ResumeService}
          className="h-32 w-full rounded-xl object-cover md:h-full"
        />

        <div className="p-4 bg-gray-200 text-center sm:p-6 md:col-span-2 lg:p-8">
          <p className="text-lg font-semibold uppercase tracking-widest">
            WE ALSO OFFER
          </p>

          <h2 className="mt-6 font-black">
            <span className="text-4xl uppercase font-black sm:text-5xl lg:text-6xl">
            Exclusive Resume Building Service
            </span>

            <span className="mt-2 block text-sm font-semibold">
              Just fill your contact information with your existing resume and our Resume Building Experts will reach out to you in a very short time. 
            </span>
          </h2>

          <Link
            className="mt-8 inline-block w-full bg-gray-800 hover:bg-black py-4 text-sm font-bold uppercase tracking-widest text-white"
            to={"/resume-building"}
          >
            Fill Out The Form Now
          </Link>

          <p className="mt-8 text-xs font-medium uppercase text-gray-400">
            * This is a Paid Service *
          </p>
        </div>
      </section>

      <HomeFooter />
    </div>
  );
};

export default Services;
