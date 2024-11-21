import ProtectedContent from "../Account/ProtectedContent";
import { useSelector } from "react-redux";

export default function DashboardControlButtons({
  courseId,
  deleteCourse,
  editCourse,
}: {
  courseId: string;
  deleteCourse: (courseId: string) => void;
  editCourse: (courseId: string) => void;
}) {

  // Get user enrollment for the course
  const isEnrolled = useSelector((state: any) => 
    state.dashboardReducer.enrolledCourses.includes(courseId)
  );

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      deleteCourse(courseId);
    }
  };

  const { currentUser } = useSelector((state: any) => state.accountReducer);

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
    </div>
  );
}
