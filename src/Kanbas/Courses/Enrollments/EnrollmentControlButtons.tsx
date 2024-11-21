import { FaTrash } from "react-icons/fa";
import ProtectedContent from "../../Account/ProtectedContent";

export default function EnrollmentControlButtons(
{ courseId, enrollInCourse, unenrollFromCourse }: { courseId: string; enrollInCourse: (courseId: string) => void;
  unenrollFromCourse: (courseId: string) => void }) {

  const handleUnenrollment = () => {
    if (window.confirm("Are you sure you want to unenroll from this course?")) {
      unenrollFromCourse(courseId);
    }
  };

  return (
    <div className="float-end">
      <ProtectedContent>
        <FaTrash className="text-danger me-2 mb-1" onClick={handleUnenrollment}/>
      </ProtectedContent>
    </div>
);}