import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as db from "./Database";
import DashboardControlButtons from "./Dashboard/DashboardControlButtons";
import ProtectedContent from "./Account/ProtectedContent";
import ProtectedStudent from "./Account/ProtectedStudent";
import { enrollInCourse, unenrollFromCourse, toggleCourseDisplay, resetCourseView } from "./Dashboard/reducer";

export default function Dashboard({
  courses,
  course,
  setCourse,
  addNewCourse,
  deleteCourse,
  updateCourse,
}: {
  courses: any[];
  course: any;
  setCourse: (course: any) => void;
  addNewCourse: () => void;
  deleteCourse: (course: any) => void;
  updateCourse: () => void;
}) {
  const dispatch = useDispatch();

  // Get user, enrolled courses, and display settings from Redux state
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { enrolledCourses, showCourses, showAllCourses } = useSelector((state: any) => state.dashboardReducer);
  const { enrollments } = db;

  // Filter courses based on the toggle state
  const filteredCourses = showAllCourses
    ? courses
    : courses.filter((course) =>
        enrollments.some(
          (enrollment) =>
            enrollment.user === currentUser._id && enrollment.course === course._id
        )
      );

  return (
    <div className="p-4" id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />

      {/* Protected for faculty only */}
      <ProtectedContent>
        <h5>
          New Course
          <button className="btn btn-primary float-end" id="wd-add-new-course-click" onClick={addNewCourse}>
            Add
          </button>
          <button className="btn btn-warning float-end me-2" onClick={updateCourse} id="wd-update-course-click">
            Update
          </button>
        </h5>
        <br />
        <input
          value={course.name}
          className="form-control mb-2"
          onChange={(e) => setCourse({ ...course, name: e.target.value })}
        />
        <textarea
          value={course.description}
          className="form-control"
          onChange={(e) => setCourse({ ...course, description: e.target.value })}
        />
        <hr />
      </ProtectedContent>

      <ProtectedStudent>
        {/* Blue enrollment button located at top right of screen */}
        <button
          onClick={() => dispatch(toggleCourseDisplay())}
          className="btn float-end btn-primary"
          id="wd-show-enrollments"
        >
          {showCourses
            ? showAllCourses
              ? "Show Enrolled Courses"
              : "Show All Published Courses"
            : "Show All Published Courses"}
        </button>
      </ProtectedStudent>

      {/* Display filtered courses when showCourses is true */}
      {showCourses && (
        <div>
          <h2 id="wd-dashboard-published">Published Courses ({filteredCourses.length})</h2>
          <hr />
          <div className="row" id="wd-dashboard-courses">
            <div className="row row-cols-1 row-cols-md-5 g-4">
              {filteredCourses.map((course) => (
                <div key={course._id} className="wd-dashboard-course col" style={{ width: "300px" }}>
                  <div className="card rounded-3 overflow-hidden">
                    <Link
                      to={`/Kanbas/Courses/${course._id}/Home`}
                      className="wd-dashboard-course-link text-decoration-none text-dark"
                    >
                      <img src="/images/reactjs.jpg" width="100%" height={160} alt="Course" />
                      <div className="card-body">
                        <h5 className="wd-dashboard-course-title card-title">{course.name}</h5>
                        <p
                          className="wd-dashboard-course-title card-text overflow-y-hidden"
                          style={{ maxHeight: 100 }}
                        >
                          {course.description}
                        </p>
                      </div>
                    </Link>
                    <div className="d-flex justify-content-between align-items-center p-2">
                      <Link to={`/Kanbas/Courses/${course._id}/Home`} className="btn btn-primary">
                        Go
                      </Link>
                      <DashboardControlButtons
                        courseId={course._id}
                        deleteCourse={deleteCourse}
                        editCourse={setCourse}
                        enrollInCourse={(id) => dispatch(enrollInCourse(id))}
                        unenrollFromCourse={(id) => dispatch(unenrollFromCourse(id))}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )} 
    </div>
  );
}
