import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useInfo } from "../context/InfoProvider";

const Questionaire = () => {
  const router = useRouter(),
    { id } = router.query,
    { diagnosis, interest } = useInfo(),
    [questions, setQuestions] = useState<any>([]),
    [currentQuestion, setCurrentQuestion] = useState(0),
    [answers, setAnswers] = useState<any>([]);

  useEffect(() => {
    if (!id) return;
    try {
      const fetchQuestions = async () => {
        const res = await fetch("/api/resources/quiz-" + id, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json().catch((err) => {
          window.location.href = "/error";
        });
        console.log(data);
        setQuestions(data);
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
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h1 className="text-5xl font-black">
        {questions[currentQuestion].question}
      </h1>
      <section className="mt-5">
        <span className="text-2xl">
          Question {currentQuestion + 1} out of {questions.length}
        </span>
        {questions[currentQuestion].type === 1 ? (
          <div className="mt-5">
            <button className="w-full px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50">
                Yes
            </button>
            <button className="w-full px-4 py-2 mt-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50">
                No
            </button>
          </div>
        ) : (
          <div className="mt-5">
          <label
            htmlFor="default-range"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Answer (0-10)
          </label>
          <input
            id="default-range"
            type="range"
            defaultValue="5"
              min="0"
              max="10"
              step="1"
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          ></input>
        </div>
        )}
      </section>
    </div>
  );
};

export default Questionaire;
