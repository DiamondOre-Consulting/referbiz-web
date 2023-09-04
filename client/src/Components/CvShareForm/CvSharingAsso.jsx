import React, { useState } from "react";
import axios from "axios";
import { useJwt } from "react-jwt";
import Dropzone from "react-dropzone";

const CvSharingAsso = () => {
  const [showPopup, setShowPopup] = useState(true);
  const [submitted, setSubmitted] = useState(null);

  const handleClose = () => {
    setShowPopup(false);
    setSubmitted(null);
    console.log(submitted)
  };

  const [formValues, setFormValues] = useState({
    refName: "",
    refPhone: "",
    refUniqueEmailId: "",
    document: null,
  });
  //   const [message, setMessage] = useState('');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFormValues({ ...formValues, document: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login"); // Redirect to login page if not authenticated
      return;
    }

    const formData = new FormData();
    formData.append("refName", formValues.refName);
    formData.append("refPhone", formValues.refPhone);
    formData.append("refUniqueEmailId", formValues.refUniqueEmailId);
    formData.append("document", formValues.document);

    try {
      const response = await axios.post(
        "http://192.168.29.235:8080/api/associates/associate-contact-form",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);
      setFormValues({
        refName: "",
        refPhone: "",
        refUniqueEmailId: "",
        document: null,
      });
      setSubmitted(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {/* <div class="bg-gray-500"> */}
        <div className="mx-auto max-w-screen-2xl bg-gray-200 rounded-lg">
          <form className="mx-auto max-w-lg rounded-lg border" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4 p-4 md:p-8">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 inline-block text-xl text-indigo-600 sm:text-xl"
                >
                  Candidate Name
                </label>
                <input
                  type="text"
                  id="refName"
                  name="refName"
                  value={formValues.refName}
                  onChange={handleInputChange}
                  className="w-full rounded border bg-gray-400 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 inline-block text-xl text-indigo-600 sm:text-xl"
                >
                  Candidate Email
                </label>
                <input
                  type="email"
                  id="refUniqueEmailId"
                  name="refUniqueEmailId"
                  value={formValues.refUniqueEmailId}
                  onChange={handleInputChange}
                  className="w-full rounded border bg-gray-400 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="mb-2 inline-block text-xl text-indigo-600 sm:text-xl"
                >
                  Candidate Phone Number
                </label>
                <input
                  type="text"
                  id="refPhone"
                  name="refPhone"
                  value={formValues.refPhone}
                  onChange={handleInputChange}
                  className="w-full rounded border bg-gray-400 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
                />
              </div>

              <div>
                <label
                  htmlFor="document"
                  className="mb-2 inline-block text-xl text-indigo-600 sm:text-xl"
                >
                  Candidate Resume
                </label>
                <input
                  type="file"
                  id="document"
                  name="document"
                  onChange={handleFileChange}
                  className="w-full rounded border bg-gray-400 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
                />
              </div>

              <button className="block rounded-lg mt-4 bg-gray-800 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-gray-300 transition duration-100 hover:bg-gray-700 focus-visible:ring active:bg-gray-600 md:text-base">
                Submit
              </button>
            </div>

          </form>
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
                    Thanks for sharing resume, we'll get back to you soon!
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
        </div>
    </>
  );
};

export default CvSharingAsso;
