import axios from "axios";

const API_BASE = process.env.REACT_APP_REMOTE_SERVER

const QUIZZES_API = `${API_BASE}/api/quizzes`;

export const getAllQuestions = async (quizId: string | undefined) => {
  const response = await axios.get(`${QUIZZES_API}/${quizId}/questions`);
  return response.data;
};

export const createQuestion = async (
  quizId: string | undefined,
  question: any
) => {
  const response = await axios.post(
    `${QUIZZES_API}/${quizId}/questions`,
    question
  );
  return response.data;
};

export const updateQuestion = async (question: any) => {
  console.log("Updating Question", question);
  const response = await axios.put(`${QUIZZES_API}/questions/${question._id}`, question);
  return response.data;
};

export const deleteQuestion = async (quizId: any, questionId: string) => {
  const response = await axios.delete(`${QUIZZES_API}/${quizId}/questions/${questionId}`);
  return response.data;
};

export const findQuestionById = async (questionId: string) => {
  const response = await axios.get(`${QUIZZES_API}/questions/${questionId}`);
  return response.data;
};

export const updateAllQuestions = async (quizId: string | undefined, questions: any[]) => {
  console.log("Updating All Questions", questions);
  const response = await axios.put(`${QUIZZES_API}/${quizId}/updateAllQuestions`, questions);
  return response.data;
}
