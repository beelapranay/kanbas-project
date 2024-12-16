import { createSlice } from "@reduxjs/toolkit";
import Quiz from "../..";

interface Option {
  id: string;
  option: string;
}

interface Question {
  id: string;
  _id: string;
  title: string;
  points: number;
  question: string;
  quizId: string;
  type:'MultipleChoice'|'TrueFalse'|'FillBlank';
  options: Option[];
  correctOptionIndex?: number;
} 

const initialState = {
  questions: [] as Question[],
  question: {
    title: "New Question",
    points: 0,
    id: "",
    question: "",
    type: "MultipleChoice",
    quizId: "",
    options: [] as Option[],
    correctOptionIndex: 0,
  },
};

const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    addQuestion: (state, action) => {
      state.questions = [action.payload, ...state.questions];
    },

    deleteQuestion: (state, action) => {
      state.questions = state.questions.filter(
        (question) => question._id !== action.payload
      );
    },
    updateQuestion: (state, action) => {
      state.questions = state.questions.map((question) => {
        if (question._id === action.payload.id) {
          return action.payload;
        } else {
          return question;
        }
      });
    },
    setQuestions: (state, action) => {
      state.questions = action.payload;
    },

    setQuestion: (state, action) => {
      state.question = action.payload || null;
    },

    resetQuestion: (state) => {
      state.question = initialState.question;
    },

    addOption: (state,action) => {
      const temp = {id: new Date().getTime().toString(), option: action.payload};
      console.log("Adding Option", state.question.options);
      if(state.question.options === undefined){
        state.question.options = [];
      }
      state.question.options = [...state.question.options, temp];
    },

    updateOption: (state, action) => {
      state.question.options = state.question.options.map((option) => {
        if (option.id === action.payload.id) {
          return action.payload;
        } else {
          return option;
        }
      });
    },

    deleteOption: (state, action) => {
      state.question.options = state.question.options.filter(
        (option) => option.id !== action.payload
      );
    },

    setCorrectOptionIndex: (state, action) => {
      state.question.correctOptionIndex = action.payload;
    },
  },
});

export const {
  addQuestion,
  deleteQuestion,
  updateQuestion,
  setQuestion,
  setQuestions,
  addOption,
  updateOption,
  deleteOption,
  resetQuestion,
  setCorrectOptionIndex,
} = questionsSlice.actions;
export default questionsSlice.reducer;