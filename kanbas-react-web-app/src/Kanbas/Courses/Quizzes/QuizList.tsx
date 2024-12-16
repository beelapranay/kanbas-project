
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { FaBan, FaCaretDown, FaCheckCircle, FaEllipsisV, FaPlus, FaRocket } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import { KanbasState } from "../../store";
import * as client from "./client";
import { clearQuiz, deleteQuiz, setQuiz, setQuizzes, updateQuiz } from "./reducer";

type MenuVisibleState = {
  [key: string]: boolean;
};

export default function QuizList() {
  const { cid, quizId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  console.log(cid);
  useEffect(() => {
    client.findQuizForCourse(cid).then((quizzes) => {
      dispatch(setQuizzes(quizzes));
    });
  }, [cid]);
  const navigateToAddQuiz = () => {
    dispatch(clearQuiz());
    navigate(`/Kanbas/Courses/${cid}/Quizzes/QuizDetail/QuizEditor/details`);
  };

  const handleDeleteQuiz = async (quizId: string) => {
    const res = await client.deleteQuiz(quizId);
    dispatch(deleteQuiz(quizId));
  };

  const quizList = useSelector(
    (state: KanbasState) => state.quizReducer.quizzes
  );

  const toggleMenu = (quiz: any) => {
    setMenuVisible((prev) => ({
      ...prev,
      [quiz._id]: !prev[quiz._id]
    }));
  };

  const [menuVisible, setMenuVisible] = useState<MenuVisibleState>({});
  /// const [published, setPublished] = useState(false); // State to track the published status

  const handleEditQuiz = (quiz: any) => {
    console.log("Navigating to Quiz Details screen");
    dispatch(setQuiz(quiz));
    navigate(`/Kanbas/Courses/${cid}/Quizzes/${quiz._id}/QuizEditor/details`);
  };

  const handleDelete = () => {
    const result = window.confirm("Are you sure you want to delete this Quiz?");
    if (result) {
      return true;
    } else {
      return false;
    }
  };
  const handleTogglePublish = (qz: any) => {
    // Toggle the published status
    dispatch(
      updateQuiz({
        ...qz,
        published: !qz.published,
      })
    );
  };

  const handleAvailabiltiy = (quiz: any) => {
    const today = new Date();
    const formattedToday = formatDate(today);

    const availableFromDate = new Date(quiz.availableFromDate);
    const availableUntilDate = new Date(quiz.availableUntilDate);

    if (quiz.availableUntilDate && formattedToday > formatDate(availableUntilDate)) {
      return 'Closed';
    } else if (quiz.availableFromDate && quiz.availableUntilDate && formattedToday >= formatDate(availableFromDate) && formattedToday <= formatDate(availableUntilDate)) {
      return 'Available';
    } else if (quiz.availableFromDate && formattedToday < formatDate(availableFromDate)) {
      return `Not available until ${formatDate(availableFromDate)}`;
    } else {
      return 'Not available';
    }
  };

  const formatDate = (date: Date) => {
    if (!(date instanceof Date)) {
      date = new Date(date);
    }
    return date.toISOString().split('T')[0]; // Returns date in YYYY-MM-DD format
  };

  return (
    <div className="col me-2">
      <div className="row wd-margin-top">
        <div className="float-end wd-margin-right">
          <div className="wd-button float-end">
            <a
              className="btn btn-secondary btn-sm ms-2"
              role="button"
              style={{ backgroundColor: "lightgray" }}
            >
              <FaEllipsisV />
            </a>
          </div>

          {currentUser.role === "FACULTY" && (
            <div className="wd-button float-end">
              <Button variant="danger btn-sm" onClick={navigateToAddQuiz}>
                <FaPlus className="me-1" />
                Quiz
              </Button>{" "}
            </div>
          )}

          <div className="float-start w-25">
            <input
              className="form-control"
              id="input1"
              placeholder="Search for Quiz"
            />
          </div>
        </div>
      </div>
      <hr></hr>

      <div className="wd-assignments-list">
        <ul
          className="list-group wd-margin-left"
          style={{ borderRadius: "0%" }}
        >
          <li className="list-group-item list-group-item-secondary">
            <div>
              <FaCaretDown className="me-2" />
              <b>Assignment Quizzes</b>
            </div>
          </li>
          {(quizList.length === 0 || quizList === null) ?
            (<div style={{ borderStyle: "solid", textAlign: "center", marginTop: "10px", marginLeft: "200px", marginRight: "200px" }}>
              No quizzes available. Click on Add Quiz Button to create a quiz.
            </div>) : (
              <ul className="list-group" style={{ borderRadius: "0%" }}>
                {quizList.map((quiz) => (
                  <li className="list-group-item">
                    <div className="row">
                      <div
                        className="col-auto"
                        style={{ margin: "auto", display: "flex" }}
                      >
                        <FaRocket style={{ color: "green" }} />
                      </div>
                      <div className="col wd-fg-color-gray ps-0 ms-2">
                        {/* {currentUser.role === "FACULTY" ? <Link
                          onClick={(e) => dispatch(setQuiz(quiz))}
                          style={{ color: "green", textDecoration: "none" }}
                          className="fw-bold ps-0"
                          to={`${quiz._id}`}
                        >
                          {quiz.title}
                        </Link> : <b>{quiz.title}</b>} */}

                        <Link
                          onClick={(e) => dispatch(setQuiz(quiz))}
                          style={{ color: "green", textDecoration: "none" }}
                          className="fw-bold ps-0"
                          to={currentUser.role === "FACULTY" ? `${quiz._id}` : `${quiz._id}/QuizIntroPage`}
                        >
                          {quiz.title}
                        </Link>
                        <br />
                        {handleAvailabiltiy(quiz)} |<b> Due</b> {formatDate(quiz.dueDate)} |{" "}
                        {quiz.points} pts | {quiz.questions.length} Questions
                        {/* Sep 21 at 1pm | 29 pts | 11 questions */}
                      </div>
                      <div
                        className="col-auto"
                        style={{ margin: "auto", display: "flex" }}
                      >
                        {quiz.published ? (
                          <FaCheckCircle
                            className="ms-4"
                            style={{
                              color: "green",
                              cursor: "pointer",
                              verticalAlign: "middle",
                              marginTop: "5px",
                            }}
                            onClick={() => currentUser.role === "FACULTY" && handleTogglePublish(quiz)}
                          />
                        ) : (
                          <FaBan
                            className="ms-4"
                            style={{
                              color: "red",
                              cursor: "pointer",
                              verticalAlign: "middle",
                              marginTop: "5px",
                            }}
                            onClick={() => currentUser.role === "FACULTY" && handleTogglePublish(quiz)}
                          />
                        )}

                        {currentUser.role === "FACULTY" &&
                          <div
                            className="dropdown"
                            style={{ position: "relative", display: "inline-block" }}
                          >
                            <a>
                              <FaEllipsisV
                                className="ms-4"
                                role="button"
                                style={{ verticalAlign: "middle" }}
                                onClick={() => toggleMenu(quiz)}
                              />
                              {menuVisible[quiz._id] && (
                                <div
                                  className="menu"
                                  style={{
                                    position: "absolute",
                                    top: "100%",
                                    left: "-50%",
                                    border: "1px solid #ccc",
                                    borderRadius: "4px",
                                    backgroundColor: "white",
                                    padding: "8px",
                                    opacity: 0.9,
                                    zIndex: 1000,
                                  }}
                                >
                                  <option onClick={() => handleEditQuiz(quiz)}>Edit</option>
                                  <option
                                    onClick={() => {
                                      if (handleDelete()) {
                                        handleDeleteQuiz(quiz._id);
                                      }
                                    }}
                                  >
                                    Delete
                                  </option>
                                  <option onClick={() => handleTogglePublish(quiz)}>
                                    {quiz.published ? "Unpublish" : "Publish"}{" "}
                                  </option>
                                </div>
                              )}
                            </a>
                          </div>}

                        <div className="dropdown"></div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>)}
        </ul>
      </div>
    </div>
  );
}
