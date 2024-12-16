import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "./Courses/Modules/reducer";
import accountReducer from "./Account/reducer";
import assignmentReducer from "./Courses/Assignments/reducer";
import enrollmentReducer from "./Courses/People/reducer";
import quizReducer from "./Courses/Quizzes/reducer";
import textBoxReducer from "./Common/TextBox/reducer";
import questionsReducer from "./Courses/Quizzes/QuizEditor/Questions/reducer";
export interface KanbasState {
  modulesReducer: {
    modules: any[];
    module: any;
  };
  assignmentReducer:{
    assignments: any[];
    assignment: any;
  };
  quizReducer:{
    quizzes: any[];
    quiz: any;
  };
  questionsReducer: {
    questions: any[];
    question: any;
  };
  textBoxReducer: {
    textBox: {
      text: string;
    };
  };

}
const store = configureStore({
  reducer: {
    modulesReducer,
    accountReducer,
    assignmentReducer,
    enrollmentReducer,
    quizReducer,
    questionsReducer,
    textBoxReducer
  },
});
export default store;