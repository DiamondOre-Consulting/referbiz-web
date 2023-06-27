import React, { useState } from "react";
import axios from "axios";
import Logo from "../Components/AffDashComponents/Referbiz.png";
import AffFooter from "../Components/AffDashComponents/AffFooter";

const AssoContact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/api/associates/contactus",
        {
          name,
          email,
          message,
        }
      );

      if (response.status === 202) {
        setReply(
          "Message Recieved!! Thank you, we will reach out to you soon."
        );
        console.log("Message Sent Successfully");

        setName("");
        setEmail("");
        setMessage("");
      } else {
        console.log("Message Failed");
      }
    } catch (error) {
      setReply("Oops!! Well that wasn't supposed to happen. Try again.");
      console.error("Error in Sending Message:", error);
      // Handle error
    }
  };

  return (
    <>
      <header className="bg-white">
        <div className="mx-auto max-w-screen-2xl px-4 py-3 sm:px-6 sm:py-3 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex-1 md:flex md:items-center md:gap-12">
              <a className="block text-teal-600" href="/">
                <img className="w-1/2" src={Logo} alt="Logo" />
              </a>
            </div>
          </div>
        </div>
      </header>
      <div class="bg-gray-300 h-screen flex flex-col justify-center gap-5 items-center">
        <h2 className="flex justify-center font-semibold text-5xl text-gray-800">
          Contact <span className="text-indigo-700">Us</span>
        </h2>
        <div className="mx-auto max-w-screen-2xl px-10 py-5 bg-gray-200 rounded-lg">
          <form
            className="mx-auto max-w-lg rounded-lg border"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col gap-4 p-4 md:p-8">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 inline-block text-xl text-indigo-600 sm:text-xl"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded border bg-gray-400 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 inline-block text-xl text-indigo-600 sm:text-xl"
                >
                  Email Id
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded border bg-gray-400 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-2 inline-block text-xl text-indigo-600 sm:text-xl"
                >
                  Message
                </label>
                <textarea
                  type="text"
                  id="message"
                  name="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full rounded border bg-gray-400 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
                />
              </div>

              <button className="block rounded-lg mt-4 bg-gray-800 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-gray-300 transition duration-100 hover:bg-gray-700 focus-visible:ring active:bg-gray-600 md:text-base">
                Submit
              </button>
            </div>
          </form>
          <p className="text-3xl flex justify-center text-indigo-700">
            {reply}
          </p>
        </div>
      </div>
      <AffFooter />
    </>
  );
};

export default AssoContact;
