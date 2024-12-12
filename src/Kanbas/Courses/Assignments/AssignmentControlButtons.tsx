import { IoEllipsisVertical } from "react-icons/io5";
import { FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import ProtectedContent from "../../Account/ProtectedContent";

export default function AssignmentControlButtons({ 
  assignmentId, 
  deleteAssignment,
  editAssignment,
}: { 
  assignmentId: string; 
  deleteAssignment: (assignmentId: string) => void;
  editAssignment:   (assignmentId: string) => void;
}) {
  
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this assignment?")) {
      deleteAssignment(assignmentId);
    }
  };

  return (
    <div className="float-end">

      <ProtectedContent>
        {/* Protected for faculty only */}
        <FaPencil 
          onClick={() => editAssignment(assignmentId)} 
          className="text-primary me-3" 
        />
        <FaTrash 
          className="text-danger me-2 mb-1" 
          onClick={handleDelete}
        />
      </ProtectedContent>

      <IoEllipsisVertical 
        className="fs-4" />
    </div>
  );
}
