import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { Link } from "react-router-dom";
import HomeFooter from "../../Components/HomePageComponent/HomeFooter";
import RB_LOGO from "../../assets/RB_100_New.png";

const ContactUs = () => {
  const [showPopup, setShowPopup] = useState(true);

  const handleClose = () => {
    setShowPopup(false);
  };
  const [submitted, setSubmitted] = useState(null);
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_jp1r2xs",
        "template_v48gujn",
        form.current,
        "EOOiwhnj9sstqAjrS"
      )
      .then(
        (result) => {
          console.log(result.text);
          console.log("message sent");
          e.target.reset();
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

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
                to={"/home-main"}
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
                className="text-lg font-semibold text-gray-600 transition duration-100 hover:text-indigo-500 active:text-indigo-700"
              >
                Services
              </Link>
              <Link
                to={"/contactmain"}
                className="text-lg font-semibold text-indigo-500 transition duration-100 hover:text-indigo-500 active:text-indigo-700"
              >
                Contact Us
              </Link>
            </nav>

            <a
              href="#"
              className="hidden rounded-lg bg-gray-200 px-8 py-3 text-center text-sm font-semibold text-gray-500 outline-none ring-indigo-300 transition duration-100 hover:bg-gray-300 focus-visible:ring active:text-gray-700 md:text-base lg:inline-block"
            >
              Signin
            </a>

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
            <Link to={"/home-main"}>
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

      <section className="relative flex flex-wrap lg:h-screen lg:items-center">
        <div className="w-full px-4 pb-12 sm:px-6 lg:w-1/2 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-lg text-center">
            <h1 className="text-2xl font-bold sm:text-3xl">
              Get started today!
            </h1>

            <p className="mt-4 text-gray-500">
              Feel free to get in touch with us for any questions, concerns, or
              feedback. We're here to assist you on your journey to career
              success. Your success is our priority!
            </p>
          </div>

          <form
            ref={form}
            onSubmit={sendEmail}
            className="mx-auto mb-0 mt-8 max-w-md space-y-4"
          >
            <div>
              <label htmlFor="name" className="sr-only">
                Your Full Name
              </label>

              <div className="relative">
                <input
                  type="text"
                  name="user_name"
                  id="name"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter Full Name"
                  required
                />

                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                </span>
              </div>
            </div>

            <div>
              <label htmlFor="email" className="sr-only">
                Your Email
              </label>

              <div className="relative">
                <input
                  type="email"
                  name="user_email"
                  id="email"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="name@yourdomain.com"
                  required
                />

                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                </span>
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="sr-only">
                Subject
              </label>

              <div className="relative">
                <input
                  type="text"
                  name="user_subject"
                  id="subject"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Let us know how we can help you"
                  required
                />

                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                </span>
              </div>
            </div>

            {/* <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>

              <div className="relative">
                <input
                  type="password"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter password"
                />

                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </span>
              </div>
            </div> */}

            <div>
              <label htmlFor="email" className="sr-only">
                Your Email
              </label>

              <div className="message">
                <textarea
                  id="message"
                  name="user_message"
                  rows="6"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Leave a comment..."
                  required
                ></textarea>

                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              {/* <p className="text-sm text-gray-500">
                No account?
                <a className="underline" href="">
                  Sign up
                </a>
              </p> */}

              <button
                type="submit"
                className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>

        <div className="relative h-64 w-full sm:h-96 lg:h-full lg:w-1/2">
          <img
            alt="Welcome"
            src="https://images.unsplash.com/photo-1630450202872-e0829c9d6172?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
            className="absolute inset-0 h-full w-full object-cover rounded-lg"
          />
        </div>

        {/* POP UP */}
        {submitted ? (
          <div
            className={`fixed inset-0 flex items-center justify-center ${
              showPopup ? "visible" : "hidden"
            }`}
          >
            <section className="rounded-3xl shadow-2xl bg-gray-200">
              <div className="p-8 text-center sm:p-12">
                <p className="text-sm font-semibold uppercase tracking-widest text-pink-500">
                  Submitted Successfully!!!
                </p>

                <h2 className="mt-6 text-3xl font-bold">
                  Thanks for contacting us, we'll get back to you soon!
                </h2>

                <button
                  className="mt-8 inline-block w-full rounded-full bg-pink-600 py-4 text-sm font-bold text-white shadow-xl"
                  onClick={handleClose}
                >
                  OK
                </button>
              </div>
            </section>
          </div>
        ) : (
          ""
        )}
        {submitted === false ? <h1>Something went wrong</h1> : ""}
        {/* POP UP END */}
      </section>

      <HomeFooter />
    </div>
  );
};

export default ContactUs;
