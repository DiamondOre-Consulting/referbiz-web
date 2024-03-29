import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import vendorsignupimage from '../../assets/vsignup.png'

const VendSignup = () => {
    const [showPassword, setShowPassword] = useState(false);

    const [formValues, setFormValues] = useState({
        name: "",
        email: "",
        password: "",
        company: "",
        designation: "",
        phone: '',
        otp: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [showPass, setShowPass] = useState(false);
    const [otpSent, setOtpSent] = useState(false);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const navigate = useNavigate();

    const handleSendOtp = async (e) => {
        e.preventDefault();

        setLoading(true);
        setError(null);

        const formData = new FormData();
        formData.append("name", formValues.name);
        formData.append("email", formValues.email);
        formData.append("password", formValues.password);
        formData.append("profileImage", formValues.profileImage);
        // Perform signup logic here
        try {
            const response = await axios.post(
                "api.referbiz.in/api/candidates/send-otp",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            if (response.status === 201) {
                console.log("OTP Sent ");
                setOtpSent(true);
            } else {
                console.log("Signup failed");
                setError("Error sending OTP. Please try again.");
                // Handle signup error
            }
        } catch (error) {
            console.error("Error signing up:", error);
            if (error.response) {
                const status = error.response.status;

                if (status === 406) {
                    setError("Otp Sending Error")
                }
            }
            // Handle error
        }
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const formData = new FormData();
        formData.append("name", formValues.name);
        formData.append("email", formValues.email);
        formData.append("password", formValues.password);
        formData.append("profileImage", formValues.profileImage);
        formData.append("otp", formValues.otp);
        // Perform signup logic here
        try {
            const response = await axios.post(
                "api.referbiz.in/api/candidates/signup",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            if (response.status === 201) {
                console.log("User Registered Successfully!!!");
                setTimeout(() => {
                    navigate("/login");
                }, 1000);
            } else {
                console.log("Signup failed");
                setError("Some details are wrong!!");
                // Handle signup error
            }
        } catch (error) {
            console.error("Error signing up:", error);
            if (error.response) {
                const status = error.response.status;
                if (status === 409) {
                    setError("Affliate already Exist");
                }
                else if (status === 400) {
                    setError("Invalid OTP try again ");
                }
                else if (status === 500) {
                    setError("Internel server error")
                }
            }


        }
    };

    const handleShowPassword = () => {
        return setShowPass(!showPass);
    };
    return (
        <>

            <div className="flex items-center justify-center min-h-screen bg-gray-50 ">
                <div className="max-w-screen-xl sm:max-w-screen-lg md:max-w-screen-md lg:max-w-screen-xl grid grid-cols-1 md:grid-cols-2 shadow-lg bg-white  w-full sm:w-full lg:min-w-screen m-8">
                    <div className="space-y-4 ">
                        <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl mt-4 uppercase">
                            Signup
                        </h1>

                        {!otpSent ? (
                            <form
                                onSubmit={handleSendOtp}
                                className="mb-0 mt-4 space-y-2 rounded-lg  sm:p-6 lg:px-16 "
                            >
                                <div>
                                    <label htmlFor="name" className="sr-only">
                                        Full Name
                                    </label>

                                    <div className="relative">
                                        <input
                                            className="w-full rounded-lg border-gray-500 p-4 pe-12 text-sm shadow-sm"
                                            type="text"
                                            id="name"
                                            name="name"
                                            placeholder="Name"
                                            value={formValues.name}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="email" className="sr-only">
                                        Email
                                    </label>

                                    <div className="relative">
                                        <input
                                            className="w-full rounded-lg border-gray-500 p-4 pe-12 text-sm shadow-sm"
                                            type="email"
                                            id="email"
                                            name="email"
                                            placeholder="Email"
                                            value={formValues.email}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="password" className="sr-only">
                                        Password
                                    </label>

                                    <div className="relative">
                                        <input
                                            className="w-full rounded-lg border-gray-500 p-4 pe-12 text-sm shadow-sm"
                                            type={showPassword ? 'text' : 'password'}
                                            id="password"
                                            name="password"
                                            placeholder="Password"
                                            value={formValues.password}
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                    <div className="mt-2">
                                        <label for="check" className="">Show Password</label>
                                        <input
                                            className='ml-2 '
                                            id="check"
                                            type="checkbox"
                                            value={showPassword}
                                            onChange={() =>
                                                setShowPassword((prev) => !prev)
                                            }
                                        />

                                    </div>

                                </div>

                                <div>
                                    <label htmlFor="company" className="sr-only">
                                        Company name
                                    </label>

                                    <div className="relative">
                                        <input
                                            className="w-full rounded-lg border-gray-500 p-4 pe-12 text-sm shadow-sm"
                                            type="text"
                                            id="company"
                                            name="company"
                                            placeholder="Company Name"
                                            value={formValues.company}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="designation" className="sr-only">
                                        Designation
                                    </label>

                                    <div className="relative">
                                        <input
                                            className="w-full rounded-lg border-gray-500 p-4 pe-12 text-sm shadow-sm"
                                            type="text"
                                            id="designation"
                                            name="designation"
                                            placeholder="Your Designation"
                                            value={formValues.designation}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="phone" className="sr-only">
                                        Phone
                                    </label>

                                    <div className="relative">
                                        <input
                                            className="w-full rounded-lg border-gray-500 p-4 pe-12 text-sm shadow-sm"
                                            type="number"
                                            id="phone"
                                            name="phone"
                                            placeholder="Your Contact No"
                                            value={formValues.phone}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>

                                <div>
                                </div>


                                <button
                                    type="submit"
                                    className={`block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white ${!formValues.name || !formValues.email || !formValues.password ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    disabled={!formValues.name || !formValues.email || !formValues.password}
                                >
                                    Sign up
                                </button>


                                <p className="text-center text-sm text-gray-500">
                                    Have account already?
                                    <Link to={'/vendor-login'} className="underline cursor-pointer">
                                        Sign in
                                    </Link>
                                </p>
                            </form>
                        ) : (
                            ""
                        )}

                        {otpSent ? (
                            <form
                                onSubmit={handleSignup}
                                className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8 bg-gray-50"
                            >
                                <div>
                                    <h3 className="text-center text-indigo-700 font-semibold">
                                        OTP Has been sent to your email id
                                    </h3>
                                    <label htmlFor="otp" className="sr-only">
                                        OTP
                                    </label>

                                    <div className="relative">
                                        <input
                                            className="w-full rounded-lg border-gray-500 p-4 pe-12 text-sm shadow-sm"
                                            type="text"
                                            id="otp"
                                            name="otp"
                                            placeholder="Enter OTP"
                                            value={formValues.otp}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                                <Link
                                    to={'/vendor-signup'}
                                    className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
                                >
                                    Sign up
                                </Link>
                            </form>
                        ) : (
                            ""
                        )}

                        {error && (
                            <div className="flex items-center justify-center bg-red-300 p-4 rounded-md">
                                <p className="text-center text-sm text-red-500">{error}</p>
                            </div>
                        )}
                    </div>
                    <div className="flex items-center justify-center  rounded-r-lg  bg-gray-100">
                        <div className="hidden md:block">
                            <div className="">
                                 <img src={vendorsignupimage} />
                            </div>
                           
                        </div>
                    </div>
                </div>
        </div >
        </>
    )
}

export default VendSignup