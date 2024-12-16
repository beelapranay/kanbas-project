import { useEffect, useState } from "react";
import TextBox from "../../../../../Common/TextBox/index";
import MultipleChoiceQuestion from "./MultipleChoiceQuestion";
import FillInTheBlank from "./FillInTheBlank";
import TrueFalse from "./TrueFalse";
import { Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setQuestion, addOption, updateQuestion } from "../reducer";
import { KanbasState } from "../../../../../store";
import * as client from "../client";
 
function QuestionEditor() {
  const navigate = useNavigate();
  const { cid, quizId } = useParams();
  const dispatch = useDispatch();
 
  const question = useSelector(
    (state: KanbasState) => state.questionsReducer.question
  );
  const textBox = useSelector(
    (state: KanbasState) => state.textBoxReducer.textBox
  );
 
  const [currentQuestionTypeComponent, setCurrentQuestionTypeComponent] =
    useState(<></>);
 
  useEffect(() => {
    // Whenever textBox changes, update the question text
    dispatch(setQuestion({ ...question, questionText: textBox.text }));
  }, [textBox]);
 
  useEffect(() => {
    checkType();
  }, [question.type]);
 
  const updateQues = async () => {
    // Update the question on the server
    await client.updateQuestion(question);
    dispatch(updateQuestion(question));
    navigate(`/Kanbas/Courses/${cid}/Quizzes/${quizId}/QuizEditor/questions`);
  };
 
  const cancelQues = () => {
    dispatch(setQuestion(null));
    navigate(`/Kanbas/Courses/${cid}/Quizzes/${quizId}/QuizEditor/questions`);
  };
 
  const checkType = () => {
    let temp = <></>;
    if (question.type === "MultipleChoice") {
      temp = <MultipleChoiceQuestion />;
    } else if (question.type === "TrueFalse") {
      temp = <TrueFalse />;
    } else {
      temp = <FillInTheBlank />;
    }
    setCurrentQuestionTypeComponent(temp);
  };
 
  const handleTypeChange = (newType: string) => {
    let updatedOptions: { option: string; }[] = [];
    if (newType === "MultipleChoice") {
      updatedOptions = [
        { option: "Option 1" },
        { option: "Option 2" },
        { option: "Option 3" },
        { option: "Option 4" },
      ];
    } else if (newType === "TrueFalse") {
      updatedOptions = [{ option: "True" }, { option: "False" }];
    } else if (newType === "FillBlank") {
      updatedOptions = [{ option: "" }];
    }
 
    dispatch(
      setQuestion({
        ...question,
        type: newType,
        options: updatedOptions,
      })
    );
  };
 
  return (
    <div>
      <div className="col d-flex align-items-center">
        <input
          className="form-control me-2"
          type="text"
          placeholder="Question Name"
          style={{ width: "200px" }}
          value={question.title}
          onChange={(e) => {
            dispatch(setQuestion({ ...question, title: e.target.value }));
          }}
        />
        <select
          className="form-control me-2"
          value={question.type || "MultipleChoice"}
          style={{ width: "200px" }}
          onChange={(e) => {
            handleTypeChange(e.target.value);
          }}
        >
          <option value="MultipleChoice">Multiple Choice</option>
          <option value="TrueFalse">True/False</option>
          <option value="FillBlank">Fill in the Blank</option>
        </select>
        <span
          className="float-end"
          style={{
            fontSize: "20px",
            fontWeight: "bold",
            marginRight: "10px",
            marginLeft: "550px",
          }}
        >
          pts:
        </span>
        <input
          value={question.points}
          onChange={(e) => {
            dispatch(setQuestion({ ...question, points: e.target.value }));
          }}
          className="form-control"
          style={{ width: "100px" }}
          type="number"
        />
      </div>
 
      <hr />
      <p>
        Enter your question text, then define all possible correct answers for
        the blank.
        <br />
        Students will see the question followed by a small text box to type
        their answer.
      </p>
      <h2>Question:</h2>
      <TextBox textData={question?.questionText} />
 
      {currentQuestionTypeComponent}
 
      {/* Show Add Another Answer button if not True/False */}
      {question.type !== "TrueFalse" && (
        <div className="float-end me-2">
          <Button
            type="button"
            onClick={() => dispatch(addOption("Empty Option"))}
            style={{ color: "red", textDecoration: "none" }}
            className="btn btn-link"
          >
            <FaPlus className="me-2" style={{ color: "red" }} />
            Add Another Answer
          </Button>
        </div>
      )}
 
      <br />
      <Button className="btn btn-secondary" onClick={cancelQues}>
        Cancel
      </Button>
      <Button onClick={updateQues} className="btn btn-danger ms-2">
        Update Question
      </Button>
    </div>
  );
}
 
export default QuestionEditor;