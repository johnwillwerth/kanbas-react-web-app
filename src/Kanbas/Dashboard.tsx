import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import DashboardControlButtons from "./Dashboard/DashboardControlButtons";
import ProtectedContent from "./Account/ProtectedContent";
import ProtectedStudent from "./Account/ProtectedStudent";
import { toggleCourseDisplay, toggleShowAllCourses, enrollInCourse, unenrollFromCourse } from "./Dashboard/reducer";

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
  const { enrolledCourses, showCourses, showAllCourses } = useSelector((state: any) => state.dashboardReducer);
    
  const filteredCourses = showAllCourses ? courses : courses.filter((course) => enrolledCourses.includes(course._id));

  const handleEditCourse = (courseId: string) => {
    const selectedCourse = courses.find((c) => c._id === courseId);
    if (selectedCourse) {
      setCourse(selectedCourse); // Populate input fields with selected course data
    }
  };

  const handleToggleCourseDisplay = () => {
    if (!showCourses) {
      dispatch(toggleCourseDisplay());
      dispatch(toggleShowAllCourses());
    } else {
      dispatch(toggleShowAllCourses());
    }
  };

  const handleEnrollToggle = (courseId: string) => {
    if (enrolledCourses.includes(courseId)) {
      dispatch(unenrollFromCourse(courseId));
    } else {
      dispatch(enrollInCourse(courseId));
    }
  };

  return (
    <div className="p-4" id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />

      <ProtectedContent>
        {/* Protected for faculty only */}
        <h5>
          New Course
          <button
            className="btn btn-primary float-end"
            id="wd-add-new-course-click"
            onClick={addNewCourse}
          >
            Add
          </button>
          <button
            className="btn btn-warning float-end me-2"
            id="wd-update-course-click"
            onClick={updateCourse}
          >
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
        <hr />
      </ProtectedContent>

      <ProtectedStudent>
        {/* Blue enrollment button located at top right of screen */}
        <button onClick={handleToggleCourseDisplay}
                className="btn float-end btn-primary"
                id="wd-show-enrollments">
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

                    {enrolledCourses.includes(course._id) ? (
                      <Link
                        to={`/Kanbas/Courses/${course._id}/Home`}
                        className="wd-dashboard-course-link text-decoration-none text-dark"
                      >
                        <img src="/images/reactjs.jpg" width="100%" height={160} alt="Course" />
                      </Link>
                    ) : (
                      <div>
                        <img src="/images/reactjs.jpg" width="100%" height={160} alt="Course" />
                      </div>
                    )}

                    <div className="card-body">
                      {enrolledCourses.includes(course._id) ? (
                        <Link
                          to={`/Kanbas/Courses/${course._id}/Home`}
                          className="wd-dashboard-course-link text-decoration-none text-dark"
                        >
                          <h5 className="wd-dashboard-course-title card-title">{course.name}</h5>
                        </Link>
                      ) : (
                        <h5 className="wd-dashboard-course-title card-title">{course.name}</h5>
                      )}
                      <p className="wd-dashboard-course-title card-text overflow-y-hidden" style={{ maxHeight: 100 }}>
                        {course.description}
                      </p>
                    </div>
                    <div className="d-flex justify-content-between align-items-center p-2">
                      {/* Only show "Go" button if enrolled */}
                      {enrolledCourses.includes(course._id) ? (
                        <Link to={`/Kanbas/Courses/${course._id}/Home`} className="btn btn-primary">
                          Go
                        </Link>
                      ) : (
                        <span className="text-muted">Enroll to view</span> // Message for not enrolled users
                      )}
                      <button
                        onClick={() => handleEnrollToggle(course._id)}
                        className={`btn ${enrolledCourses.includes(course._id) ? 'btn-danger' : 'btn-success'}`}
                      >
                        {enrolledCourses.includes(course._id) ? 'Unenroll' : 'Enroll'}
                      </button>
                      <DashboardControlButtons
                        courseId={course._id}
                        deleteCourse={deleteCourse}
                        editCourse={handleEditCourse}
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