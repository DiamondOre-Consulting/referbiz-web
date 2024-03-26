import React, { useState } from 'react';
import AffNav from '../AffDashComponents/AffNav';
import AffFooter from '../AffDashComponents/AffFooter';
import doclabz from '../../assets/doclabzimg.png';
import { Link, useNavigate } from 'react-router-dom';

const Doc_labz_Intro = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [form, setShowForm] = useState(false);
    const [email, setEmail] = useState("");
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    // const [showPassword, setShowPassword] = useState(false);
    const [showPass, setShowPass] = useState(false);
    const navigate = useNavigate();

    // const handleLogin = async (e) => {
    //   e.preventDefault();
    //   setLoading(true);
    //   setError(null);
    //   // Perform login logic here
    //   try {
    //     const response = await axios.post("https://diamondore-jobportal-backend.onrender.com/api/candidates/login",
    //       {
    //         email,
    //         password
    //       });

    //     if (response.status === 200) {
    //       const token = response.data.token;
    //       // Store the token in local storage
    //       localStorage.setItem("token", token);
    //       console.log("Logged in successfully as Candidate");
    //       // Redirect to dashboard page
    //       setTimeout(() => {
    //         navigate("/dashboard");
    //       }, 1000);
    //     }

    //   } catch (error) {
    //     console.error("Error logging in:", error);
    //     if (error.response) {
    //       const status = error.response.status;
    //       if (status === 401) {
    //         setError("Email or Password Does not Match");
    //       } else {
    //         setError("An error occurred while logging in. Please try again later.");
    //       }
    //     } else {
    //       setError("An error occurred while logging in. Please try again later.");
    //     }
    //   }
    //   finally {
    //     setTimeout(() => {
    //       setLoading(false);
    //     }, 1000); // Turn off loading after 2 seconds
    //   }
    // };

    const handleShowPassword = () => {
        return setShowPass(!showPass);
    };

    const handleClose = () => {
        setShowPopup(false);

    };

    return (
        <>
            <AffNav />
            <div className='mt-4'>
                <h1 className='text-center font-bold text-2xl sm:text-2xl lg:text-5xl'>Doc_Labz</h1>
            </div>
            <div className="bg-white py-6 sm:py-8 lg:py-12">
                <div className="mx-auto max-w-screen-xl px-4 md:px-8">
                    <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
                        <div className="md:pt-8 my-auto">
                            <h1 className="mb-4 text-center text-2xl font-bold text-gray-800 sm:text-3xl md:mb-6 md:text-left">
                                What Doc_Labz do ?
                            </h1>
                            <p className="mb-6 text-gray-500 sm:text-sm md:mb-8">
                                At <span className="text-indigo-600 font-bold">Doc_Labz</span>, we specialize in providing top-notch IT services to individuals and businesses alike. Our primary focus is on empowering people to create stunning websites effortlessly.
                                <br />
                                <br />
                                With our expertise and innovative solutions, we make the website creation process smooth and hassle-free. Whether you're a small business owner looking to establish an online presence or an individual pursuing a personal project, our team is dedicated to delivering tailored solutions to meet your unique needs.
                                <br />
                                <br />
                                From designing captivating layouts to integrating essential functionalities, we handle every aspect of website development with precision and creativity. Trust Doc_Labz to bring your vision to life and elevate your online presence. Let us be your partner in building the website of your dreams.
                            </p>
                        </div>
                        <div>
                            <div className="h-64 mx-10 my-10 flex justify-center items-center md:h-auto">
                                <img
                                    src={doclabz}
                                    loading="lazy"
                                    alt="Photo by Martin Sanchez"
                                    className="h-full w-full rounded-lg "
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex justify-center flex-col items-center'>
                <h1 className='text-3xl'>Book Your Slot Now</h1>
                <div className='mt-4 flex justify-center items-center flex-col'>
                    <p className='px-16'>we offer Zoom training sessions focused on lead generation. Our expert instructors will guide you through proven strategies. Learn to identify your target audience and craft compelling messaging. Discover how to utilize various channels effectively. Engage in interactive sessions tailored to your needs. Ask questions, participate in discussions, and receive personalized guidance. Whether you're new to lead generation or refining your strategies, we're here to help. Invest in your skills and position your business for success. Join us for our upcoming sessions and Refer and Earn!</p>
                    <button className='bg-blue-700 p-2 text-white mt-4 mb-4 rounded-md' onClick={() => setShowPopup(true)}> Book Your Slot Now</button>
                    {/* <button className='bg-blue-700 p-2 text-white mt-4 mb-4' onClick={() => setShowForm(true)}> Book Your Slot Now</button> */}
                </div>
                {form ? (
                    <div className="px-4 space-y-4 w-full lg:w-1/3 sm:w-full md:w-1/2  border rounded-lg mt-4 shadow-lg">
                        <form
                            //   onSubmit={handleLogin}
                            className="mb-0 mt-6 space-y-4 rounded-lg p-4  sm:p-6 lg:p-8 "
                        >

                            <h1 className=" text-2xl font-bold sm:text-3xl ">
                                Refer For Doc_Labz
                            </h1>

                            <div>
                                <input
                                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    type="name"
                                    placeholder="Enter Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="sr-only">
                                    Email
                                </label>

                                <div className="relative">
                                    <input
                                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        type="email"
                                        placeholder="Useremail@gmail.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />

                                </div>
                            </div>

                            <div>
                                <label htmlFor="password" className="sr-only">
                                    Phone
                                </label>
                                <div className="relative">
                                    <input
                                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        type='text'
                                        placeholder="Enter Phone"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                    />

                                </div>
                                <div>
                                    <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white mt-2 ">Your message</label>
                                    <textarea id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Discription of your leeds"></textarea>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="block w-full rounded-lg bg-blue-900 px-5 py-3 text-sm font-medium text-white"
                            >
                                Submit
                            </button>

                        </form>
                        {error && (
                            <div className="flex items-center justify-center bg-red-300 p-4 rounded-md">
                                <p className="text-center text-sm text-red-500">{error}</p>
                            </div>
                        )}
                    </div>
                ) : null}
            </div>
            {showPopup ? (
                <div
                    className={`fixed inset-0 flex items-center justify-center ${showPopup ? "visible" : "hidden"
                        }`}
                >
                    <section className="rounded-3xl shadow-xl bg-white w-1/2 sm:w-1/2  lg:w-1/4 md:w-1/2">
                        <div className="p-2 lg:p-2 md:p-12 text-center sm:p-12">
                            <h2 className="mt-6 text-sm lg:text-md md:sm sm:text-sm font-bold">
                               Your slot has been booked we will connect you soon !
                            </h2>
                            <div className="flex justify-center align-center ">

                                <button
                                    className="mt-8 inline-block w-full rounded-full bg-green-600 py-2 text-sm font-bold text-white shadow-xl mb-2"
                                    // onClick={handleClose}
                                    onClick={()=>{
                                        handleClose();
                                        setShowForm(true);
                                    }}
                                // onClick={() => setShowForm(true)}
                                >
                                    Close
                                </button>

                            </div>

                        </div>
                    </section>
                </div>
            ) : (
                ""
            )}
            <AffFooter />
        </>
    );
};

export default Doc_labz_Intro;
