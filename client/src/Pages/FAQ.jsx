import React, { useState} from "react";
import Navbar from '../Components/HomePageComponent/Navbar'
import HomeFooter from '../Components/HomePageComponent/HomeFooter';

function FAQ() {
  const [openQuestions, setOpenQuestions] = useState([]);

  const questions = {
    0: {
      question: 'How does the product work?',
      answer: 'The product works by leveraging cutting-edge technology that...',
    },
    1: {
      question: 'What are the features?',
      answer: 'Our product comes with a range of features, including...',
    },
    2: {
      question: 'What about integrations?',
      answer: 'Integrations are a key aspect of our product, enabling...',
    },
    3: {
      question: 'Is support available?',
      answer: 'Yes, we provide comprehensive support through various channels...',
    },
  };

  const toggleQuestion = (index) => {
    if (openQuestions.includes(index)) {
      setOpenQuestions(openQuestions.filter((item) => item !== index));
    } else {
      setOpenQuestions([...openQuestions, index]);
    }
  };

  return (
    <div>
      
      {/* Nav Section Start */}
      {<Navbar/>}
      {/* Nav Section Ends */}



      {/* FAQ Section Start */}
      <div className="bg-white py-6 sm:py-8 lg:py-12">
        <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
          <div className="mb-10 md:mb-16">
            <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">
              Frequently asked questions
            </h2>
            <p className="mx-auto max-w-screen-md text-center text-gray-500 md:text-lg">
              This is a section of some simple filler text, also known as placeholder text. It shares some characteristics of a real written text but is random or otherwise generated.
            </p>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-screen-md border-t">
        {Object.keys(questions).map((index) => (
          <div className="border-b" key={index}>
            <div
              className="flex cursor-pointer justify-between gap-2 py-4 text-black hover:text-indigo-500 active:text-indigo-600"
              onClick={() => toggleQuestion(parseInt(index))}
            >
              <span className="font-semibold transition duration-100 md:text-lg">
                {questions[index].question}
              </span>
              <span
                className={`transform ${
                  openQuestions.includes(parseInt(index)) ? 'rotate-180' : ''
                } text-indigo-500`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </div>

            <p
              className={`mb-4 ${
                openQuestions.includes(parseInt(index)) ? 'block' : 'hidden'
              } text-gray-500`}
            >
              {questions[index].answer}
            </p>
          </div>
        ))}
      </div>
      {/* FAQ Section Ends */}



      {/* Footer Section Start */}
      {<HomeFooter/>}
      {/* Footer Section Ends */}
    </div>
  );
}

export default FAQ;
