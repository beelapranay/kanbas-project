import CoursesNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
import { courses } from "../Database";
import { Navigate, Route, Routes, useParams, useLocation } from "react-router";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import { FaAlignJustify } from "react-icons/fa6";
import PeopleTables from "./People";
import AddAssignmentEditor from "./Assignments/AddAssignmentEditor";
import Quiz from "./Quizzes";
import QuizEditor from "./Quizzes/QuizEditor";
import QuestionEditor from "./Quizzes/QuizEditor/Questions/QuestionEditor";
import QuizDetail from "./Quizzes/QuizDetail";
import QuizPreview from "./Quizzes/QuizPreview";
import QuizSubmission from "./Quizzes/QuizSubmission";
import QuizIntroPage from "./Quizzes/QuizIntroPage";

export default function Courses({ courses }: { courses: any[]; }) {
  const { cid } = useParams();
  const course = courses.find((course) => course._id === cid);
  const { pathname } = useLocation();
  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify className="me-4 fs-4 mb-1" />
        {course && course.name} &gt; {pathname.split("/")[4]}</h2> <hr />
      <div className="d-flex">
        <div className="d-none d-md-block">
          <CoursesNavigation />
        </div>
        <div className="flex-fill">
          <Routes>
            <Route path="Home" element={<Home />} />
            <Route path="Modules" element={<Modules />} />
            <Route path="Assignments" element={<Assignments />} />
            <Route path="Assignments/:aid" element={<AssignmentEditor />} />
            <Route path="People" element={<PeopleTables />} />
            <Route path="Quizzes" element={<Quiz />} />
            <Route path="Quizzes/:quizId/QuizEditor/*" element={<QuizEditor/>} />
            <Route path="Quizzes/:quizId/QuizEditor/questions/:questionId" element={<QuestionEditor/>} />
            <Route path="Quizzes/:quizId" element={<QuizDetail/>} />
            <Route path="Quizzes/:quizId/QuizPreview" element={<QuizPreview/>} />
            <Route path="Quizzes/:quizId/QuizSubmission" element={<QuizSubmission/>} />
            <Route path="Quizzes/:quizId/QuizIntroPage" element={<QuizIntroPage/>} />
          </Routes>
        </div></div>
    </div>
  );
}
