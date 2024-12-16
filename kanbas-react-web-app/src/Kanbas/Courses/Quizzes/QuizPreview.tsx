import { CgDanger } from "react-icons/cg";
import { GoTriangleRight } from "react-icons/go";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { getAllQuestions } from "../Quizzes/QuizEditor/Questions/client";
import { findQuizForCourse } from "../Quizzes/client";
import { SlQuestion } from "react-icons/sl";
import { Link } from "react-router-dom";
import { FaPencil } from "react-icons/fa6";
import { Button } from "react-bootstrap";
import { KanbasState } from "../../store";
import { useSelector } from "react-redux";
import { setQuiz } from "./reducer";
import * as quizClient from "./client";
 
function QuizPreview() {
  const { quizId, cid } = useParams();
  const [question, setQuestion] = useState<any | null>(null);
  const [questionList, setQuestionList] = useState<any | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
 
  const [selectedOptions, setSelectedOptions] = useState<{
    [key: string]: number | string; // Mixed types for different question types
  }>({});
 
  const formatDate = (dateString: string | number | Date) => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };
  const formatTime = (dateString: string | number | Date) => {
    return new Date(dateString).toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    });
  };
 
  const navigate = useNavigate();
 
  const quiz = useSelector((state: KanbasState) => state.quizReducer.quiz);
  // const questionList = useSelector((state: KanbasState) => state.questionsReducer.questions);
  useEffect(() => { }, [selectedAnswer]);
 
  useEffect(() => {
    getAllQuestions(quizId)
      .then((questionList) => {
        if (questionList.length > 0) {
          setQuestionList(questionList);
          setQuestion(questionList[0]);
        }
      })
      .catch((error) => {
        console.error("Error fetching quiz questions:", error);
      });
  }, [quizId]);
 
  useEffect(() => {
    findQuizForCourse(cid)
      .then((quizList) => {
        setQuiz(quizList.find((quiz: any) => quiz?._id === quizId));
      })
      .catch((error) => {
        console.error("Error fetching quiz questions:", error);
      });
  }, [quizId])
 
  const handleNextQuestion = () => {
    const currentIndex = questionList?.findIndex(
      (q: any) => q?._id === question?._id
    );
    if (currentIndex !== -1 && currentIndex < questionList.length - 1) {
      setQuestion(questionList[currentIndex + 1]);
    }
  };
 
  const handleSubmitQuiz = async () => {
    try {
      const payload = {
        studentId: currentUser._id,
        _id: quizId,
        attempts: [
          {
            answers: Object.entries(selectedOptions).map(([questionId, answer]) => ({
              questionId,
              answer,
            })),
          },
        ],
      };
 
      await quizClient.submitQuiz(payload);
      navigate(`/Kanbas/Courses/${cid}/Quizzes/${quizId}/QuizSubmission`);
    } catch (error) {
      console.error("Error submitting quiz:", error);
      alert("An error occurred while submitting the quiz.");
    }
  };
 
  const handleQuestionClick = (questionId: string) => {
    const selectedQuestion = questionList.find((q: any) => q._id === questionId);
    if (selectedQuestion) {
      setQuestion(selectedQuestion);
    }
  };
 
  const handleOptionChange = (questionId: string, option: number | string) => {
    setSelectedOptions((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      [questionId]: option,
    }));
  };
 
  return (
    <div className="container-fluid" style={{ marginTop: "20px", marginLeft: "25px", marginRight: "20px", width: "1000px" }}>
      <h1>{quiz?.title}</h1>
 
      {currentUser.role === "FACULTY" && <h6 style={{ paddingRight: "100px" }} className="preview-msg">
        <CgDanger /> This is a preview of the published version of the quiz
      </h6>}
 
      <div>
        <h6>Started: {formatDate(quiz?.availableFromDate)} at {formatTime(quiz?.availableFromDate)}</h6>
      </div>
 
      <h2>Quiz Instructions</h2>
 
      <hr className="line" />
 
      <div style={{ paddingRight: "40px", paddingLeft: "40px", paddingTop: "10px" }}>
        {questionList?.length === 0 || questionList === null ? (
          <div className="card text-muted" style={{ marginBottom: "20px" }}>
            <div className="text-center">
              <br />
              No questions available.
              <br />
              Click on "Keep Editing This Quiz" button to add questions to quiz.
              <br /><br />
            </div>
          </div>
        ) : (
          <div>
            <div key={question?._id} className="card" style={{ marginBottom: "20px" }}>
              <div className="card-header" style={{ fontWeight: "bold", display: "flex", justifyContent: "space-between" }}>
                <span>
                  {question?.title}
                </span>
                <span>
                  {question?.points} pts
                </span>
              </div>
              <div className="card-body">
                <p className="card-text">
                  <div dangerouslySetInnerHTML={{ __html: question?.questionText }} />
                </p>
                <hr />
                <div className="form-check">
                  {(question?.type === "MultipleChoice") &&
                    question?.options.map((option: { _id: string, option: string }, index: number) => (
                      <div key={option._id}>
                        <input
                          type="radio"
                          id={`option-${question._id}-${index}`}
                          name="answer"
                          checked={index === selectedOptions[question._id]}
                          onChange={() => handleOptionChange(question._id, index)}
                        />
                        <label htmlFor={`option-${question._id}-${index}`} style={{ marginLeft: "20px" }}>
                          {option.option}
                        </label>
                        <br />
                        <hr></hr>
                      </div>
                    ))}
                  {(question?.type === "TrueFalse") && (
                    <>
                      <div>
                        <input
                          type="radio"
                          id={`true-${question._id}`}
                          name={`answer-${question._id}`}
                          checked={selectedOptions[question._id] === "True"}
                          onChange={() => handleOptionChange(question._id, "True")}
                        />
                        <label htmlFor={`true-${question._id}`} style={{ marginLeft: "20px" }}>
                          True
                        </label>
                      </div>
                      <hr></hr>
                      <div>
                        <input
                          type="radio"
                          id={`false-${question._id}`}
                          name={`answer-${question._id}`}
                          checked={selectedOptions[question._id] === "False"}
                          onChange={() => handleOptionChange(question._id, "False")}
                        />
                        <label htmlFor={`false-${question._id}`} style={{ marginLeft: "20px" }}>
                          False
                        </label>
                      </div>
                      <hr></hr>
                    </>
                  )}
                  {question?.type === "FillBlank" && (
                    <div>
                      <input
                        type="text"
                        id={`blank-${question._id}`}
                        name="answer"
                        value={selectedOptions[question._id] || ""}
                        onChange={(e) =>
                          handleOptionChange(question._id, e.target.value)
                        }
                      />
                      <label htmlFor={`blank-${question._id}`} style={{ marginLeft: "20px" }}></label>
                      <br />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div
        style={{ textAlign: "right", paddingBottom: "10px", paddingRight: "40px" }}
      >
        <div style={{ paddingTop: "5px", paddingBottom: "10px" }}>
          <Button variant="primary" className="nextButton" onClick={handleNextQuestion}>
            Next <GoTriangleRight />
          </Button>
        </div>
      </div>
 
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "1000px",
          paddingBottom: "30px"
        }}
      >
        <div
          style={{
            padding: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            border: "1px solid #ddd",
            borderRadius: "5px",
            width: "1000px",
          }}
        >
          <span>Quiz saved at {formatTime(new Date())}</span>
          <Button variant="danger" className="submitButton" onClick={handleSubmitQuiz}>
            Submit Quiz
          </Button>
        </div>
 
      </div>
 
      {currentUser.role === "FACULTY" && <div className="card mt-1 ms-1" style={{ width: "1000px" }}>
        <Link
          to={`/Kanbas/Courses/${cid}/Quizzes/${quiz?._id}`}
          role="button"
          className="btn btn-light"
          style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <FaPencil style={{ marginRight: "5px" }} />
          <span>Keep Editing This Quiz</span>
        </Link>
      </div>}
      <br />
 
      <div>
        <h4 className="mt-1 ms-1">Questions</h4>
        {questionList?.map((q: any, index: number) => (
          <div
            key={q?._id}
            onClick={() => handleQuestionClick(q._id)}
            className={`mt-1 ms-4 list-group-item`}
            style={{ fontWeight: q?._id === question?._id ? "bold" : "normal", color: "red" }}
          >
            <SlQuestion className="me-1" />
            <Button variant="link" style={{ color: "red", padding: "inherit" }}>Question {index + 1}</Button>
          </div>
        ))}
      </div>
    </div>
  );
}
 
export default QuizPreview;