import React, { useEffect, useState } from 'react'
import AffNav from '../Components/AffDashComponents/AffNav'
import AffFooter from '../Components/AffDashComponents/AffFooter'
import Wave from "../../src/assets/wave.png";
import DLogo from '../../src/assets/DiamondoreLogo.png'
import Select from 'react-select';
import { Link, useNavigate } from 'react-router-dom';
import { useJwt } from 'react-jwt';
import axios from 'axios';


const MainDashbord = () => {

    const [popUp, setPopUp] = useState(0);
    const navigate = useNavigate();
    const { decodedToken } = useJwt(localStorage.getItem("token"));

    const userName = decodedToken ? decodedToken.name : "No Name Found";

    const userEmail = decodedToken ? decodedToken.name : "No Name Found";

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            // No token found, redirect to login page
            navigate("/login");
        } else {
            const tokenExpiration = decodedToken ? decodedToken.exp * 1000 : 0; // Convert expiration time to milliseconds

            if (tokenExpiration && tokenExpiration < Date.now()) {
                // Token expired, remove from local storage and redirect to login page
                localStorage.removeItem("token");
                navigate("/login");
            }

            const fetchUserData = async () => {
                try {
                    // Make a GET request to retrieve the user data
                    const response = await axios.get('http://localhost:8080/api/candidates/user-data',
                        {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        }); // Replace '/api/user' with the appropriate endpoint

                    // Set the user data in state
                    setPopUp(response.data.count);
                    console.log(response.data)

                } catch (error) {
                    console.error(error);
                }
            };

            fetchUserData();
        }
    }, [decodedToken, navigate]);

    console.log(popUp)

    const [selectedOption, setSelectedOption] = useState(null);
    const vendors = [
        { name: 'Diamond Ore Pvt Ltd', description: 'It is your gateway to promising career opportunities.', image: DLogo, link: '/dashboard' },
        { name: 'Doc_Labz', description: 'Build Your Websites there', image: DLogo, link: '/doc-labz/intro' },
        { name : 'CV~Genie', description: 'Make your job winning Resume', image :DLogo, link : '/cv-genie/into' }
    ];

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
        navigate(option.link); // Redirect based on the selected option's link
    };
    return (
        <>
            <AffNav />
            <div className='bg-gray-700'>
                <div className="w-full md:flex items-center justify-between">
                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-semibold text-gray-100 px-4 sm:px-6 lg:px-10 py-6 sm:py-8 md:py-10">
                        Welcome, {userName}
                        <img
                            className="w-12 sm:w-16 md:w-20 h-12 sm:h-16 md:h-20 inline-block ml-4"
                            src={Wave}
                            alt="waving"
                        />
                    </h2>
                </div>

                <div className='grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-8 px-16'>

                    <div className="flex flex-col overflow-hidden rounded-lg bg-white mb-4">
                        <div className="flex flex-1 flex-col justify-center items-center p-4 sm:p-6">
                            <div className="flex items-center flex-col justify-around mb-4">
                                <div className="flex items-center"><svg className='h-16 w-16 text-gray-800' fill="#000000" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>eye</title> <path d="M0 16q0.064 0.128 0.16 0.352t0.48 0.928 0.832 1.344 1.248 1.536 1.664 1.696 2.144 1.568 2.624 1.344 3.136 0.896 3.712 0.352 3.712-0.352 3.168-0.928 2.592-1.312 2.144-1.6 1.664-1.632 1.248-1.6 0.832-1.312 0.48-0.928l0.16-0.352q-0.032-0.128-0.16-0.352t-0.48-0.896-0.832-1.344-1.248-1.568-1.664-1.664-2.144-1.568-2.624-1.344-3.136-0.896-3.712-0.352-3.712 0.352-3.168 0.896-2.592 1.344-2.144 1.568-1.664 1.664-1.248 1.568-0.832 1.344-0.48 0.928zM10.016 16q0-2.464 1.728-4.224t4.256-1.76 4.256 1.76 1.76 4.224-1.76 4.256-4.256 1.76-4.256-1.76-1.728-4.256zM12 16q0 1.664 1.184 2.848t2.816 1.152 2.816-1.152 1.184-2.848-1.184-2.816-2.816-1.184-2.816 1.184l2.816 2.816h-4z"></path> </g></svg></div>
                                <p>200</p>
                            </div>
                        </div>
                    </div>



                    <div className="flex flex-col overflow-hidden rounded-lg bg-white mb-4">
                        <div className="flex flex-1 flex-col justify-center items-center p-4 sm:p-6">
                            <div className="flex items-center flex-col justify-around mb-4">
                                <div className="flex items-center"> <svg className='h-16 w-16 text-gray-800' fill="#000000" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 471.787 471.787" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g id="_x35_1_20_"> <path d="M360.852,35.142c-15.477-18.056-102.336-61.626-149.625-12.615c-47.29,49.01,2.952,83.636,21.012,91.97 c18.057,8.334,69.647,21.066,88.354-11.607c4.99,12.785,1.623,119.131-27.865,146.17c-14.942-14.246-36.51-23.19-60.488-23.19 c-19.689,0-37.746,6.031-51.85,16.073c-18.619-29.884-53.845-50.062-94.271-50.062c-19.383,0-37.563,4.659-53.308,12.782v10.448 c-0.013-0.003-0.056-0.013-0.056-0.013v256.662c0,0,74.807,3.87,80.791-82.544c-0.002-0.005-0.005-0.01-0.005-0.015 c18.198,26.427,76.18,46.541,111.909,45.355c56.121-1.861,130.693-4.321,193.865-64.881c5.838-5.809,10.52-12.669,13.701-20.259 c0-0.002,0-0.002,0-0.004C462.242,288.615,376.328,53.198,360.852,35.142z"></path> </g> </g> </g></svg></div>
                                <p>200</p>
                            </div>
                        </div>
                    </div>


                    <div className="flex flex-col overflow-hidden rounded-lg bg-white  mb-4">
                        <div className="flex flex-1 flex-col justify-center items-center p-4 sm:p-6">
                            <div className="flex items-center flex-col justify-around mb-4">
                                <div className="flex items-center mx-3"><svg className='h-16 w-16 text-gray-800' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M11.7255 17.1019C11.6265 16.8844 11.4215 16.7257 11.1734 16.6975C10.9633 16.6735 10.7576 16.6285 10.562 16.5636C10.4743 16.5341 10.392 16.5019 10.3158 16.4674L10.4424 16.1223C10.5318 16.1622 10.6239 16.1987 10.7182 16.2317L10.7221 16.2331L10.7261 16.2344C11.0287 16.3344 11.3265 16.3851 11.611 16.3851C11.8967 16.3851 12.1038 16.3468 12.2629 16.2647L12.2724 16.2598L12.2817 16.2544C12.5227 16.1161 12.661 15.8784 12.661 15.6021C12.661 15.2955 12.4956 15.041 12.2071 14.9035C12.062 14.8329 11.8559 14.7655 11.559 14.6917C11.2545 14.6147 10.9987 14.533 10.8003 14.4493C10.6553 14.3837 10.5295 14.279 10.4161 14.1293C10.3185 13.9957 10.2691 13.7948 10.2691 13.5319C10.2691 13.2147 10.3584 12.9529 10.5422 12.7315C10.7058 12.5375 10.9381 12.4057 11.2499 12.3318C11.4812 12.277 11.6616 12.1119 11.7427 11.8987C11.8344 12.1148 12.0295 12.2755 12.2723 12.3142C12.4751 12.3465 12.6613 12.398 12.8287 12.4677L12.7122 12.8059C12.3961 12.679 12.085 12.6149 11.7841 12.6149C10.7848 12.6149 10.7342 13.3043 10.7342 13.4425C10.7342 13.7421 10.896 13.9933 11.1781 14.1318L11.186 14.1357L11.194 14.1393C11.3365 14.2029 11.5387 14.2642 11.8305 14.3322C12.1322 14.4004 12.3838 14.4785 12.5815 14.5651L12.5856 14.5669L12.5897 14.5686C12.7365 14.6297 12.8624 14.7317 12.9746 14.8805L12.9764 14.8828L12.9782 14.8852C13.0763 15.012 13.1261 15.2081 13.1261 15.4681C13.1261 15.7682 13.0392 16.0222 12.8604 16.2447C12.7053 16.4377 12.4888 16.5713 12.1983 16.6531C11.974 16.7163 11.8 16.8878 11.7255 17.1019Z" fill="#000000"></path> <path d="M11.9785 18H11.497C11.3893 18 11.302 17.9105 11.302 17.8V17.3985C11.302 17.2929 11.2219 17.2061 11.1195 17.1944C10.8757 17.1667 10.6399 17.115 10.412 17.0394C10.1906 16.9648 9.99879 16.8764 9.83657 16.7739C9.76202 16.7268 9.7349 16.6312 9.76572 16.5472L10.096 15.6466C10.1405 15.5254 10.284 15.479 10.3945 15.5417C10.5437 15.6262 10.7041 15.6985 10.8755 15.7585C11.131 15.8429 11.3762 15.8851 11.611 15.8851C11.8129 15.8851 11.9572 15.8628 12.0437 15.8181C12.1302 15.7684 12.1735 15.6964 12.1735 15.6021C12.1735 15.4929 12.1158 15.411 12.0004 15.3564C11.8892 15.3018 11.7037 15.2422 11.4442 15.1777C11.1104 15.0933 10.8323 15.0039 10.6098 14.9096C10.3873 14.8103 10.1936 14.6514 10.0288 14.433C9.86396 14.2096 9.78156 13.9092 9.78156 13.5319C9.78156 13.095 9.91136 12.7202 10.1709 12.4074C10.4049 12.13 10.7279 11.9424 11.1401 11.8447C11.2329 11.8227 11.302 11.7401 11.302 11.6425V11.2C11.302 11.0895 11.3893 11 11.497 11H11.9785C12.0862 11 12.1735 11.0895 12.1735 11.2V11.6172C12.1735 11.7194 12.2487 11.8045 12.3471 11.8202C12.7082 11.8777 13.0255 11.9866 13.2989 12.1469C13.3765 12.1924 13.4073 12.2892 13.3775 12.3756L13.0684 13.2725C13.0275 13.3914 12.891 13.4417 12.7812 13.3849C12.433 13.2049 12.1007 13.1149 11.7841 13.1149C11.4091 13.1149 11.2216 13.2241 11.2216 13.4425C11.2216 13.5468 11.2773 13.6262 11.3885 13.6809C11.4998 13.7305 11.6831 13.7851 11.9386 13.8447C12.2682 13.9192 12.5464 14.006 12.773 14.1053C12.9996 14.1996 13.1953 14.356 13.3602 14.5745C13.5291 14.7929 13.6136 15.0908 13.6136 15.4681C13.6136 15.8851 13.4879 16.25 13.2365 16.5628C13.0176 16.8354 12.7145 17.0262 12.3274 17.1353C12.2384 17.1604 12.1735 17.2412 12.1735 17.3358V17.8C12.1735 17.9105 12.0862 18 11.9785 18Z" fill="#000000"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M9.59235 5H13.8141C14.8954 5 14.3016 6.664 13.8638 7.679L13.3656 8.843L13.2983 9C13.7702 8.97651 14.2369 9.11054 14.6282 9.382C16.0921 10.7558 17.2802 12.4098 18.1256 14.251C18.455 14.9318 18.5857 15.6958 18.5019 16.451C18.4013 18.3759 16.8956 19.9098 15.0182 20H8.38823C6.51033 19.9125 5.0024 18.3802 4.89968 16.455C4.81587 15.6998 4.94656 14.9358 5.27603 14.255C6.12242 12.412 7.31216 10.7565 8.77823 9.382C9.1696 9.11054 9.63622 8.97651 10.1081 9L10.0301 8.819L9.54263 7.679C9.1068 6.664 8.5101 5 9.59235 5Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M13.2983 9.75C13.7125 9.75 14.0483 9.41421 14.0483 9C14.0483 8.58579 13.7125 8.25 13.2983 8.25V9.75ZM10.1081 8.25C9.69391 8.25 9.35812 8.58579 9.35812 9C9.35812 9.41421 9.69391 9.75 10.1081 9.75V8.25ZM15.9776 8.64988C16.3365 8.44312 16.4599 7.98455 16.2531 7.62563C16.0463 7.26671 15.5878 7.14336 15.2289 7.35012L15.9776 8.64988ZM13.3656 8.843L13.5103 9.57891L13.5125 9.57848L13.3656 8.843ZM10.0301 8.819L10.1854 8.08521L10.1786 8.08383L10.0301 8.819ZM8.166 7.34357C7.80346 7.14322 7.34715 7.27469 7.1468 7.63722C6.94644 7.99976 7.07791 8.45607 7.44045 8.65643L8.166 7.34357ZM13.2983 8.25H10.1081V9.75H13.2983V8.25ZM15.2289 7.35012C14.6019 7.71128 13.9233 7.96683 13.2187 8.10752L13.5125 9.57848C14.3778 9.40568 15.2101 9.09203 15.9776 8.64988L15.2289 7.35012ZM13.2209 8.10709C12.2175 8.30441 11.1861 8.29699 10.1854 8.08525L9.87486 9.55275C11.0732 9.80631 12.3086 9.81521 13.5103 9.57891L13.2209 8.10709ZM10.1786 8.08383C9.47587 7.94196 8.79745 7.69255 8.166 7.34357L7.44045 8.65643C8.20526 9.0791 9.02818 9.38184 9.88169 9.55417L10.1786 8.08383Z" fill="#000000"></path> </g></svg></div>
                                <p>200</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col overflow-hidden rounded-lg bg-white mb-4">
                        <div className="flex flex-1 flex-col justify-center items-center p-4 sm:p-6">
                            <div className="flex flex-col items-center justify-around mb-4">
                                <div className="flex items-center"> <svg class="h-16 w-16 text-gray-800" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 490.01 490.01" xml:space="preserve" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <rect id="XMLID_60_" x="-14.319" y="147.421" transform="matrix(0.3244 -0.9459 0.9459 0.3244 -125.6895 185.1588)" style={{ fill: '#A7A9AC' }} width="162.194" height="66.298"></rect> <path d="M169.994,106.097l-6.1,3c-7.6,3.7-16.5,4.2-24.4,1.4l-10.2-3.6c-0.6-0.4-1.2-0.7-1.8-0.9l-62.8-21.5 c-4.7-1.6-9.9,0.9-11.5,5.6l-52.7,153.5c-0.8,2.3-0.6,4.8,0.4,6.9s2.9,3.8,5.2,4.6l62.7,21.5c1,0.3,2,0.5,2.9,0.5 c3.8,0,7.3-2.4,8.6-6.1l49.7-144.6l3.4,1.2c12.5,4.4,26.5,3.6,38.5-2.2l6.1-3c7.5-3.7,16.3-4.2,24.2-1.5l115.3,39.7 c-1.2,4.8-3.6,10.5-8,13.6c-4.9,3.4-12.2,3.4-21.8,0.1l-51.4-17.6c-2.4-0.8-5-0.6-7.2,0.6c-2.2,1.2-3.8,3.3-4.5,5.7 c-0.1,0.3-7.2,26.9-29.9,39.1c-14.3,7.7-32.1,8-53,0.9c-4.7-1.6-9.9,0.9-11.5,5.6c-1.6,4.7,0.9,9.9,5.6,11.5 c12,4.1,23.3,6.2,33.8,6.2c12.2,0,23.4-2.7,33.6-8.2c20.3-10.9,30.8-30,35.6-41.4l42.9,14.7c15.3,5.3,28.1,4.5,38-2.4 c15.9-11,16.7-33.3,16.8-34.3c0.1-4-2.4-7.5-6.1-8.8l-122.4-42.2C195.694,99.497,181.794,100.397,169.994,106.097z M66.194,256.497l-45.6-15.6l46.7-136.3l45.6,15.6L66.194,256.497z"></path> <rect id="XMLID_142_" x="334.311" y="148.377" transform="matrix(-0.4395 -0.8982 0.8982 -0.4395 434.9314 634.4379)" style={{ fill: '#3C92CA' }} width="162.188" height="66.294"></rect> <path d="M410.194,266.797l-21.5,19.8c-19.5,17.9-41.5,33-65.3,44.6l-114.1,55.8c-5,2.5-11.1,0.4-13.6-4.7 c-2.5-5-0.4-11.1,4.7-13.6l1.4-0.7l0,0l62.4-30.5c4.5-2.2,6.4-7.6,4.2-12.1c-2.2-4.5-7.6-6.4-12.1-4.2l-62.4,30.5l0,0l-31.4,15.4 c-5,2.5-11.1,0.4-13.6-4.7c-1.2-2.4-1.4-5.2-0.5-7.7c0.9-2.6,2.7-4.6,5.1-5.8l23.7-11.6l0,0l67.8-33.2c4.5-2.2,6.4-7.6,4.2-12.1 s-7.6-6.4-12.1-4.2l-67.9,33.3l0,0l-2.6,1.3l-32.4,15.9c-2.4,1.2-5.2,1.4-7.7,0.5c-2.6-0.9-4.6-2.7-5.8-5.1 c-2.5-5-0.4-11.1,4.7-13.6l11.2-5.5l0,0l22.9-11.2l6.4-3.1l0,0l52.6-25.8c4.5-2.2,6.4-7.6,4.2-12.1s-7.6-6.4-12.1-4.2l-57,27.9 l-24.9,12.2c-5,2.4-11.1,0.4-13.6-4.7c-1.2-2.4-1.4-5.2-0.5-7.7c0.9-2.6,2.7-4.6,5.1-5.8l43.5-21.3c4.5-2.2,6.4-7.6,4.2-12.1 s-7.6-6.4-12.1-4.2l-43.5,21.3c-6.8,3.3-11.9,9.1-14.3,16.2s-2,14.8,1.3,21.6c2.1,4.2,5.1,7.7,8.7,10.3c-6.3,8.3-7.9,19.7-3,29.7 c3.3,6.8,9.1,11.9,16.2,14.3c3,1,6,1.5,9,1.5c-0.1,4.5,0.8,9,2.9,13.1c4.9,10,15,15.8,25.4,15.8c4.2,0,8.4-0.9,12.4-2.9l6.4-3.1 c0.3,3.4,1.2,6.7,2.7,9.9c4.9,10,15,15.8,25.4,15.8c4.2,0,8.4-0.9,12.4-2.9l114.1-55.8c25.4-12.4,48.8-28.4,69.6-47.5l25.5-23.5 l58.4-28.6c4.5-2.2,6.4-7.6,4.2-12.1l-71.4-145.5c-1.1-2.2-2.9-3.8-5.2-4.6c-2.3-0.8-4.8-0.6-6.9,0.4l-59.6,29.1 c-4.5,2.2-6.4,7.6-4.2,12.1L410.194,266.797z M405.394,106.197l63.3,129.5l-43.3,21.2l-63.3-129.5L405.394,106.197z"></path> </g> </g> </g></svg></div>
                                <p>200</p>
                            </div>
                        </div>
                    </div>



                </div>
                <div className='text-center font-bold text-sm lg:text-2xl sm:text-sm md:text-sm'>
                    <div className=" py-6 sm:py-8 lg:py-8">
                        <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
                            <div className="mb-10 md:mb-16">
                                <h2 className="mb-4 text-left text-2xl  text-gray-100 md:mb-6 lg:text-3xl mt-4 text-center">
                                    For which Vendor You Would Like To Refer
                                </h2>
                                <Select
                                    className='border border-1 border-black text-black text-xl'
                                    placeholder="Select Your Vendor"
                                    defaultValue={selectedOption}
                                    onChange={setSelectedOption}
                                    options={vendors}
                                    formatOptionLabel={ven => (
                                        <div className="flex items-center justify-start hover:bg-gray-100 cursor-pointer" onClick={() => handleOptionSelect(ven)}>
                                            <img src={ven.image} alt="v-image" className='w-24' />
                                            <div className='ml-4 ' >
                                                <span className='text-xl float-left'>{ven.name}</span><br></br>
                                                <p className='mb-0 ml-0 text-sm text-gray-700 float-left'>{ven.description}</p>
                                            </div>
                                        </div>

                                    )}
                                    styles={{
                                        menu: provided => ({
                                            ...provided,
                                            backgroundColor: 'white', // Default background color
                                            zIndex: 9999 // Ensure the menu appears above other elements

                                        }),
                                        menuList: provided => ({
                                            ...provided,
                                            backgroundColor: 'white' // Background color of the dropdown list
                                        }),
                                        option: (provided, state) => ({
                                            ...provided,
                                            backgroundColor: state.isSelected ? '' : 'white', // Change background color of selected option
                                            color: 'black' // Text color

                                        }),
                                        control: provided => ({
                                            ...provided,
                                            backgroundColor: 'white' // Background color of the control (dropdown)
                                        }),
                                    }}
                                />


                            </div>


                        </div>
                    </div>
                </div>
            </div>
            <AffFooter />
            {(popUp === 1) ? <PopupCard /> : " "}
        </>
    )
}

export default MainDashbord