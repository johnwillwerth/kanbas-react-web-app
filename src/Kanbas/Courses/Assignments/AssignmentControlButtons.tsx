import { IoEllipsisVertical } from "react-icons/io5";
import { FaTrash } from "react-icons/fa";
import ProtectedContent from "../../Account/ProtectedContent";

export default function AssignmentControlButtons({ 
  assignmentId, 
  deleteAssignment,
}: { 
  assignmentId: string; 
  deleteAssignment: (assignmentId: string) => void;
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
