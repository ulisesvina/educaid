import { NextApiRequest, NextApiResponse } from "next";
import Quiz from "../../../controllers/quiz";

const hander = async (req: NextApiRequest, res: NextApiResponse) => {
  const result = await Quiz.fetchQuestions(2);
  res.status(200).json(result);
};

export default hander;
