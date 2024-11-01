import { FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import ProtectedContent from "../Account/ProtectedContent";
import ProtectedStudent from "../Account/ProtectedStudent";
import { enrollments } from "../Database";
import { useParams } from "react-router-dom";

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
  const { uid } = useParams();

  // Get user enrollment for the course
  const userEnrollment = enrollments.find(
    (enrollment) => enrollment.user === uid && enrollment.course === courseId
  );
  const isEnrolled = Boolean(userEnrollment);

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      deleteCourse(courseId);
    }
  };

  const handleEnrollment = () => {
    if (window.confirm("Are you sure you want to enroll in this course?")) {
      enrollInCourse(courseId);
    }
  };

  const handleUnenrollment = () => {
    if (window.confirm("Are you sure you want to unenroll from this course?")) {
      unenrollFromCourse(courseId);
    }
  };

  return (
    <div className="float-end">
      <ProtectedContent>
        <FaPencil onClick={() => editCourse(courseId)} className="text-primary me-3" />
        <FaTrash className="text-danger me-2 mb-1" onClick={handleDelete} />
      </ProtectedContent>

      <ProtectedStudent>
        <button
          className={`btn float-end ${isEnrolled ? 'btn-danger' : 'btn-success'}`}
          id="wd-enroll-course-click"
          onClick={(event) => {
            event.preventDefault();
            isEnrolled ? handleUnenrollment() : handleEnrollment();
          }}
        >
          {isEnrolled ? 'Unenroll' : 'Enroll'}
        </button>
      </ProtectedStudent>
    </div>
  );
}
