import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as db from "./Database";
import { addEnrollment, deleteEnrollment } from "./Courses/People/reducer";
export default function Dashboard(
  { courses, course, setCourse, addNewCourse,
    deleteCourse, updateCourse, enrolling, setEnrolling, updateEnrollment }: {
      courses: any[]; course: any; setCourse: (course: any) => void;
      addNewCourse: () => void; deleteCourse: (course: any) => void;
      updateCourse: () => void;
      enrolling: boolean; setEnrolling: (enrolling: boolean) => void;
      updateEnrollment: (courseId: string, enrolled: boolean) => void;
    }
) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { enrollments } = useSelector((state: any) => state.enrollmentReducer);
  const dispatch = useDispatch();

  const [showAllCourses, setShowAllCourses] = useState(false);

  const toggleShowAllCourses = () => {
    setShowAllCourses(!showAllCourses);
  };

  console.log(courses);

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title" className="text-danger">Dashboard

        <button onClick={() => setEnrolling(!enrolling)} className="float-end btn btn-primary" >
          {enrolling ? "My Courses" : "All Courses"}
        </button>

      </h1> <hr />

      {currentUser.role === "FACULTY" && (
        <>
          <h5>New Course
            <button className="btn btn-primary float-end"
              id="wd-add-new-course-click"
              onClick={addNewCourse} > Add </button>
            <button className="btn btn-warning float-end me-2"
              onClick={updateCourse} id="wd-update-course-click">
              Update
            </button>
          </h5><hr /><br />
          <input value={course.name} className="form-control mb-2"
            onChange={(e) => setCourse({ ...course, name: e.target.value })} />
          <textarea value={course.description} className="form-control"
            onChange={(e) => setCourse({ ...course, description: e.target.value })} /><br />
        </>
      )}

      <h2 id="wd-dashboard-published">
        Published Courses ({courses.length})
        {currentUser.role === "STUDENT" && (
          <button
            className="btn btn-primary float-end"
            onClick={toggleShowAllCourses}
          >
            {showAllCourses ? "Show Enrolled Courses" : "Show All Courses"}
          </button>
        )}
      </h2> <hr />

      <div id="wd-dashboard-courses" className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {courses.map((course) =>  course && (
            <div className="wd-dashboard-course col" style={{ width: "300px" }}>
              <div className="card rounded-3 overflow-hidden">

                <img src={`images/AI.png`} width="100%" height={160} />
                <div className="card-body">
                  <h5 className="wd-dashboard-course-title card-title">
                    {enrolling && (
                      <button onClick={(event) => {
                        event.preventDefault();
                        updateEnrollment(course._id, !course.enrolled);
                      }}
                        className={`btn ${course.enrolled ? "btn-danger" : "btn-success"} float-end`} >
                        {course.enrolled ? "Unenroll" : "Enroll"}
                      </button>
                    )}
                    {course.name} </h5>
                  <p className="wd-dashboard-course-title card-text overflow-y-hidden" style={{ maxHeight: 100 }}>
                    {course.description} </p>

                  <Link to={`/Kanbas/Courses/${course._id}/Home`}
                    className="wd-dashboard-course-link text-decoration-none text-dark" >
                    <button className="btn btn-primary"> Go </button>
                  </Link>

                  {currentUser.role === "FACULTY" && (
                    <>
                      <button onClick={(event) => {
                        event.preventDefault();
                        deleteCourse(course._id);
                      }} className="btn btn-danger float-end"
                        id="wd-delete-course-click">
                        Delete
                      </button>

                      <button id="wd-edit-course-click"
                        onClick={(event) => {
                          event.preventDefault();
                          setCourse(course);
                        }}
                        className="btn btn-warning me-2 float-end" >
                        Edit
                      </button>
                    </>
                  )}

                  {currentUser.role === "STUDENT" && (
                    <button id="wd-unenroll" className="btn btn-danger me-2 float-end"
                      onClick={() => dispatch(deleteEnrollment({ user: currentUser._id, course: course._id }))}>
                      Unenroll
                    </button>
                  )}

                  {currentUser.role === "STUDENT" && (
                    <button id="wd-enroll" className="btn btn-success me-2 float-end"
                      onClick={() => dispatch(addEnrollment({ user: currentUser._id, course: course._id }))}>
                      Enroll
                    </button>
                  )}

                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}