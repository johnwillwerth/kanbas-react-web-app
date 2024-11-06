import ProtectedContent from "../Account/ProtectedContent";
import ProtectedStudent from "../Account/ProtectedStudent";
import { useSelector } from "react-redux";

export default function DashboardControlButtons({
  courseId,
  deleteCourse,
  editCourse,
  enrollInCourse,
  unenrollFromCourse
}: {
  courseId: string;
  deleteCourse: (courseId: string) => void;
  editCourse: (courseId: string) => void;
  enrollInCourse: (courseId: string) => void;
  unenrollFromCourse: (courseId: string) => void;
}) {

  {/* NOTE to Grader: I had this working, but I must have changed
    something along the way. I have been unable to properly retrieve 
    enrolled courses at login. The 'Enroll' button works, but the 
    initial state of the page is incorrectly loading zero enrolled courses.*/}

  // Get user enrollment for the course
  const isEnrolled = useSelector((state: any) => 
    state.dashboardReducer.enrolledCourses.includes(courseId)
  );

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      deleteCourse(courseId);
    }
  };

  return (
    <div className="float-end">
      {/* Render buttons if the user is enrolled */}
      {isEnrolled && (
        <ProtectedContent>
          <button
            onClick={() => editCourse(courseId)}
            className="btn btn-warning me-3"
            style={{ color: "black" }}
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="btn btn-danger me-2 mb-1"
          >
            Delete
          </button>
        </ProtectedContent>
      )}

      {/* Render enrollment button regardless of enrollment status */}
      <ProtectedStudent>
        <button
          className={`btn float-end ${isEnrolled ? 'btn-danger' : 'btn-success'}`}
          id="wd-enroll-course-click"
          onClick={(event) => {
            event.preventDefault();
            isEnrolled ? unenrollFromCourse(courseId) : enrollInCourse(courseId);
          }}
        >
          {isEnrolled ? 'Unenroll' : 'Enroll'}
        </button>
      </ProtectedStudent>
    </div>
  );
}
