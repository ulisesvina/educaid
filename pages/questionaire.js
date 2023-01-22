import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useInfo } from "../context/InfoProvider";
import Spinner from "../components/Spinner";

const Questionaire = () => {
  const router = useRouter(),
    { id } = router.query,
    { diagnosis, interest, setDiagnosis, setInterest } = useInfo(),
    [questions, setQuestions] = useState([]),
    [currentQuestion, setCurrentQuestion] = useState(0),
    [answers, setAnswers] = useState([]),
    [isLoading, setIsLoading] = useState(false);

  const handleFinish = () => {
      setIsLoading(true);
      if (id == "diagnose") {
        fetch("/api/evaluate", {
          method: "POST",
          body: JSON.stringify({
            answers,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            setDiagnosis(data.condition);
            window.location.href = "/";
          });
      } else {
        let interests = "";

        if (answers[0] == 1) interests += "computer science ";
        if (answers[1] == 1)
          interests +=
            interests == "" ? "social science " : "and social science ";
        if (answers[2] == 1)
          interests +=
            interests == "" ? "healthcare/medical " : "and healthcare/medical ";
        if (answers[3] == 1) interests += interests == "" ? "art " : "and art ";

        if (interests == "") interests = "nothing in particular";

        setInterest(interests);
        window.location.href = "/";
      }
    },
    handleSubmitButtons = (e) => {
      e.preventDefault();
      let { name } = e.target;
      name = name == "yes" ? 1 : 0;
      setAnswers([...answers, name]);
      if (currentQuestion + 1 === questions.length) {
        return handleFinish();
      }
      setCurrentQuestion((i) => i + 1);
    },
    handleSubmitSlider = (e) => {
      e.preventDefault();
      const value = e.target.slider.value;
      setAnswers([...answers, parseInt(value)]);
      if (currentQuestion + 1 === questions.length) {
        return handleFinish();
      }
      setCurrentQuestion((i) => i + 1);
    };

  useEffect(() => {
    if (!id) return;
    try {
      const fetchQuestions = async () => {
        switch (id) {
          case "diagnose":
            setQuestions([
              {
                question:
                  "Do you consider you have had any problems developing affective and social ties or interacting with other people?",
                type: 1,
              },
              {
                question:
                  "How difficult is it for you to identify the emotions of the people around you?",
                type: 2,
              },
              {
                question:
                  "How difficult is it for you to maintain eye contact with other people?",
                type: 2,
              },
              {
                question: "How much do you like receiving physical contact?",
                type: 2,
              },
              {
                question:
                  "Is it common for you to have any sort of fixation because things are kept in a certain order?",
                type: 1,
              },
              {
                question:
                  "How afraid are you of change or that things will not stay the same?",
                type: 2,
              },
              {
                question:
                  "How common is it for you to keep your interests rigid and without much change?",
                type: 2,
              },
              {
                question: "How sensitive are you to noises that are too loud?",
                type: 2,
              },
              {
                question: "How sensitive are you to certain smells?",
                type: 2,
              },
              {
                question: "How sensitive are you to certain textures?",
                type: 2,
              },
              {
                question:
                  "Do you often have difficulty concentrating on daily activities such as study or conversations?",
                type: 1,
              },
              {
                question:
                  "How difficult is it for you to pay attention to details for long periods of time or are you easily distracted?",
                type: 2,
              },
              {
                question: "Do you often like keeping your things in order?",
                type: 1,
              },
              {
                question: "How often do you forget things?",
                type: 2,
              },
              {
                question:
                  "How long can you keep yourself still without being uncomfortable or needy to move?",
                type: 2,
              },
              {
                question: "How common is it for you to interrupt other people?",
                type: 2,
              },
              {
                question:
                  "How patient are you when waiting your turn in long lines?",
                type: 2,
              },
              {
                question:
                  "How difficult is it for you to read long texts without getting stuck or having to repeat them for understanding?",
                type: 2,
              },
              {
                question: "How often do you make spelling mistakes?",
                type: 2,
              },
              {
                question: "How difficult is it for you to express your ideas?",
                type: 2,
              },
              {
                question:
                  "How frequently do you require a calculator to perform simple math (sums, substractions)?",
                type: 2,
              },
              {
                question: "Can you see or feel things that others don't?",
                type: 1,
              },
              {
                question:
                  "How hard is it for you to stay focused on conversations constantly?",
                type: 2,
              },
              {
                question:
                  "How often have you felt like you're living in another reality?",
                type: 2,
              },
              {
                question:
                  "How difficult is it for you to express yourself compared to others?",
                type: 2,
              },
              {
                question:
                  "How often do you think people is trying to hurt you on purpose?",
                type: 2,
              },
            ]);
            break;
          case "interests":
            setQuestions([
              {
                question: "Do you like to work with computers?",
                type: 1,
              },
              {
                question: "Do you like to talk to people?",
                type: 1,
              },
              {
                question: "Do you like research about medicine?",
                type: 1,
              },
              {
                question: "Do you like to draw?",
                type: 1,
              },
            ]);
            break;
        }
      };

      fetchQuestions();
    } catch (error) {
      window.location.href = "/error";
    }
  }, [id]);

  if (typeof id !== "string" || (id !== "diagnose" && id !== "interests")) {
    return <div>Invalid ID</div>;
  }

  switch (true) {
    case id === "diagnose" && diagnosis.isSet:
      window.location.href = "/dashboard";
      break;
    case id === "interests" && interest.isSet:
      window.location.href = "/dashboard";
      break;
    default:
  }

  // check if questions are loaded
  if (questions.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <Spinner />
      </div>
    );
  }
  return (
    <div className="mt-24 w-9/12 mx-auto">
      {isLoading ? (
        <div className="flex items-center justify-center h-full">
          <Spinner />
        </div>
      ) : (
        <div>
          <span className="text-2xl">
            {id === "interests" && "Do you like"}
          </span>
          <br />
          <h1 className="text-5xl font-black">
            {questions[currentQuestion].question}
          </h1>
          <section className="mt-5">
            <span className="text-2xl">
              Question {currentQuestion + 1} out of {questions.length}
            </span>
            {questions[currentQuestion].type === 1 ? (
              <div className="mt-5">
                <button
                  name="yes"
                  type="submit"
                  onClick={handleSubmitButtons}
                  className="w-full px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
                >
                  Yes
                </button>
                <button
                  name="no"
                  type="submit"
                  onClick={handleSubmitButtons}
                  className="w-full px-4 py-2 mt-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
                >
                  No
                </button>
              </div>
            ) : (
              <div className="mt-5">
                <form onSubmit={handleSubmitSlider}>
                  <label
                    htmlFor="slider"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Answer (0-10)
                  </label>
                  <input
                    id="slider"
                    type="range"
                    name="slider"
                    defaultValue="5"
                    min="0"
                    max="10"
                    step="1"
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                  ></input>
                  <button
                    type="submit"
                    className="w-full px-4 py-2 mt-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
                  >
                    Next
                  </button>
                </form>
              </div>
            )}
          </section>
        </div>
      )}
    </div>
  );
};

export default Questionaire;
