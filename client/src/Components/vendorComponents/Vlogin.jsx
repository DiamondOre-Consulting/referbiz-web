import React from 'react'
import vendorloginimage from '../../assets/vlogin1.png'
import { Link } from 'react-router-dom'

const Vlogin = () => {
    
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 ">
            <div className="max-w-screen-xl sm:max-w-screen-lg md:max-w-screen-md lg:max-w-screen-xl grid grid-cols-1 md:grid-cols-2 shadow-lg bg-white  w-full sm:w-full lg:min-w-screen m-8">
                <div className="flex items-center justify-center  rounded-l-lg   bg-gray-100">
                    <div className="hidden md:block">
                        <div className="">
                            <img src={vendorloginimage} />
                        </div>
                    </div>
                </div>
                <div className="space-y-4 ">
                    <h1 className="text-center mt-10 text-2xl font-bold text-indigo-600 sm:text-3xl">
                        Login as Vendor
                    </h1>
                    <form className="mb-0 mt-4 space-y-4 rounded-lg  sm:p-6 lg:px-16 ">
                        <div>
                            <label htmlFor="email" className="sr-only">
                                Email
                            </label>

                            <div className="relative">
                                <input
                                    className="w-full rounded-lg border-gray-500 p-4 pe-12 text-sm shadow-sm"
                                    type="email"
                                    placeholder="Email"
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
                                    // type={showPassword ? 'text' : 'password'}
                                    // id="password"
                                    name="password"
                                    placeholder="Password"
                                // value={formValues.password}
                                // onChange={handleInputChange}
                                />
                            </div>

                            <div className="mt-2">
                                <label for="check" className="">Show Password</label>
                                <input
                                    className='ml-2 '
                                    // id="check"
                                    type="checkbox"
                                // value={showPassword}
                                // onChange={() =>
                                //     setShowPassword((prev) => !prev)
                                // }
                                />

                            </div>

                        </div>
                        <button
                            type="submit"
                            className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
                        >
                            Sign in
                        </button>

                        <p className="text-center text-sm text-gray-500">
                            No account?
                            <Link to={'/vendor-signup'} className="underline cursor-pointer">
                                Sign up
                            </Link>
                        </p>
                        {/* <Link
                            to={"/affiliate-forgot-password"}
                            className="text-center text-sm text-gray-500 cursor-pointer"
                        >
                            Forgot Password?
                        </Link> */}
                    </form>
                    {/* {error && (
                        <div className="flex items-center justify-center bg-red-300 p-4 rounded-md">
                            <p className="text-center text-sm text-red-500">{error}</p>
                        </div>
                    )} */}
                </div>
            </div>
        </div>
  )
}

export default Vlogin