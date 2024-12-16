import axios from "axios";

const API_BASE = process.env.REACT_APP_REMOTE_SERVER
const COURSES_API = `${API_BASE}/api/courses`;
const QUIZZES_API = `${API_BASE}/api/quizzes`;
const axiosWithCredentials = axios.create({ withCredentials: true });

export const findQuizForCourse = async (courseId: string | undefined) => {
  const response = await axiosWithCredentials.get(`${COURSES_API}/${courseId}/quizzes`);
  return response.data;
};

export const findQuizSubmissionById = async (quizId: string | undefined) => {
  const response = await axiosWithCredentials.get(`${QUIZZES_API}/${quizId}/submission`);
  return response.data;
};

export const createQuiz = async (
  courseId: string | undefined,
  quiz: string
) => {
  const response = await axiosWithCredentials.post(
    `${COURSES_API}/${courseId}/quizzes`,
    quiz
  );
  return response.data;
};

export const updateQuiz = async (quiz: any) => {
  const response = await axiosWithCredentials.put(
    `${QUIZZES_API}/${quiz._id}`,
    quiz
  );
  return response.data;
};

export const submitQuiz = async (quiz: any) => {
  const response = await axiosWithCredentials.post(
    `${QUIZZES_API}/${quiz._id}/submitQuiz`,
    quiz
  );
  return response.data;
};

export const deleteQuiz = async (quizId: string) => {
  const response = await axiosWithCredentials.delete(`${QUIZZES_API}/${quizId}`);
  return response.data;
};

export const findQuizById = async (quizId: string | undefined) => {
  const response = await axiosWithCredentials.get(`${QUIZZES_API}/${quizId}`);
  return response.data;
};