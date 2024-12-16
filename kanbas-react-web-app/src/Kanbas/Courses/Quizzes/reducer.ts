import { createSlice } from "@reduxjs/toolkit";
interface Quiz {
  title: string;
  description: string;
  availability: string;
  points: string;
  dueDate: string;
  _id: string;
  quizType: string;
  assignmentGroup: string;
  instructions: string;
  shuffleAnswers: boolean;
  timeLimit: String;
  multipleAttempts: boolean;
  numberOfAttempts: string;
  correctAnswers: boolean;
  oneQuestion: boolean;
  webcam: boolean;
  lockQuestion: boolean;
  accessCode: String;
  numberOfQuestions: string;
  availableFromDate: string;
  availableUntilDate: string;
  course: String;
  published: Boolean;
}
const initialState = {
  quizzes: [] as Quiz[],
  quiz: {
    // title: "Unnamed Quiz",
    // availability: "",
    // description: "",
    // numberOfQuestions: "",
    // _id: "-1",
    // points: "100",
    // quizType: "Graded Quiz",
    // assignmentGroup: "Quizzes",
    // instructions: "",
    // shuffleAnswers: true,
    // timeLimit: "20",
    // multipleAttempts: false,
    // correctAnswers: true,
    // oneQuestion: true,
    // webcam: false,
    // lockQuestion: false,

    // accessCode: "",
    // dueDate: new Date(),
    // availableFromDate: new Date(),
    // availableUntilDate: new Date(),
    // course: "-1",
    // published: false,
  },
};
const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    addQuiz: (state, action) => {
      state.quizzes = [...state.quizzes, action.payload];
      state.quiz = initialState.quiz;
    },

    updateQuiz: (state, action) => {
      state.quizzes = state.quizzes.map((quiz) => {
        if (quiz?._id === action.payload._id) {
          console.log(quiz._id);
          console.log(action.payload);
          return { ...quiz, ...action.payload };
        } else {
          return quiz;
        }
      });
    },

    updateSingleQuiz:(state,action)=>{
      state.quiz = action.payload
    },

    deleteQuiz: (state, action) => {
      state.quizzes = state.quizzes.filter(
        (quiz) => quiz._id !== action.payload
      );
    },

    clearQuiz: (state) => {
      state.quiz = initialState.quiz;
    },

    setQuiz: (state, action) => {
      state.quiz = action.payload;
    },
    
    setQuizzes: (state, action) => {
      state.quizzes = action.payload;
    },
  },
});
export const {
  addQuiz,
  updateQuiz,
  deleteQuiz,
  clearQuiz,
  setQuiz,
  setQuizzes,
  updateSingleQuiz
} = quizzesSlice.actions;
export default quizzesSlice.reducer;
