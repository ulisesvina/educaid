import { PrismaClient, Question } from "@prisma/client";

const prisma = new PrismaClient();

const Quiz = {
  fetchQuestions: async (quiz: number) => {
    const quizes = new Map();
    quizes.set(1, "4f56f617-d5e3-448f-883e-92cbea5c5ed1"); // Diagnosis
    quizes.set(2, "4be3c33b-c361-4044-af09-eddb902766fe"); // Interests

    const questions: Question[] = await prisma.question.findMany({
      where: {
        quizId: quizes.get(quiz),
      },
    });
    
    return questions;
  },
};

export default Quiz;
