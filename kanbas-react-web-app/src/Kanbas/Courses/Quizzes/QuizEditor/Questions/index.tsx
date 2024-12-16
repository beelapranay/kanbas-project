import { Button } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as client from "./client";
import { useEffect } from "react";
import { setQuestions, setQuestion, resetQuestion, deleteQuestion } from "./reducer";
import { useDispatch, useSelector } from "react-redux";
import { KanbasState } from "../../../../store";
import { BsTrash3Fill } from "react-icons/bs";
import { setText } from "../../../../Common/TextBox/reducer";
import mongoose from "mongoose";

function QuizQuestion() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cid, quizId } = useParams();
  const questionList = useSelector(
    (state: KanbasState) => state.questionsReducer.questions
  );
  const question = useSelector(
    (state: KanbasState) => state.questionsReducer.question
  );
  const addQuestion = async () => {
    const newReq = {
      _id: new mongoose.Types.ObjectId().toString(),
      questionText: "New Question",
      options: [
        { option: "Option 1" },
        { option: "Option 2" },
      ],
      correctOptionIndex: 0,
      title: "Default Title",
      points: 0,
      quizId,
      type: "MultipleChoice"
    };
    // const res = await client.createQuestion(quizId, newReq);
    dispatch(setQuestion(newReq));
    dispatch(setText(newReq.questionText));
    // dispatch(setQuestions([...questionList, newReq]));
    navigate(
      `/Kanbas/Courses/${cid}/Quizzes/${quizId}/QuizEditor/questions/${newReq._id}`
    );
  };

  const handleDelete = async (questionId: any) => {
    try {
      await client.deleteQuestion(quizId, questionId);
      const updatedQuestions = questionList.filter(
        (question) => question._id !== questionId
      );
      dispatch(setQuestions(updatedQuestions));
    } catch (error) {
      alert("Error deleting question.");
    }
  };

  useEffect(() => {
    if (quizId && quizId !== "QuizDetail") {
      const fetchQuestions = async () => {
        const questions = await client.getAllQuestions(quizId);
        dispatch(setQuestions(questions));
      };
  
      if (!questionList || questionList.length === 0) {
        fetchQuestions();
      }
    }
  }, [quizId, questionList]);

  const assignQues = (ques: any) => {
    console.log("Assigning Question ", ques);
    dispatch(setQuestion(ques));
    dispatch(setText(ques.question));
    console.log("Question ", question);
  };

  return (
    <div>
      <div
        style={{
          paddingRight: "40px",
          paddingLeft: "40px",
          paddingTop: "10px",
        }}
      >
        {questionList?.length === 0 || questionList === null ? (
          <div className="card text-muted" style={{ marginBottom: "20px" }}>
            <div className="text-center">
              <br />
              No questions available.
              <br />
              <br />
            </div>
          </div>
        ) : (
          <div>
            {questionList.map((question, index) => (
              <div
                key={question?._id}
                className="card"
                style={{ marginBottom: "20px" }}
              >
                <div
                  className="card-header"
                  style={{
                    fontWeight: "bold",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Link
                    to={`${question._id}`}
                    onClick={() => {
                      assignQues(question);
                    }}
                  >
                    <span>{question?.title}</span>
                  </Link>
                  <div>
                    <span>{question?.points} pts</span>
                    <button onClick={() => handleDelete(question._id)} className="btn">
                      <BsTrash3Fill color="red" />
                    </button>
                  </div>
                </div>
                <div className="card-body">
                  <p className="card-text">
                    <div
                      dangerouslySetInnerHTML={{ __html: question?.question }}
                    />
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Button
        onClick={addQuestion}
        className="btn"
        style={{ backgroundColor: "lightgrey", color: "black" }}
      >
        New Question
      </Button>
    </div>
  );
}
export default QuizQuestion;
