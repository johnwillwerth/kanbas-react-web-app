import { FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";
import ProtectedContent from "../../../Account/ProtectedContent";

export default function QuestionControlButtons({ 
  questionId, 
  deleteQuestion,
  editQuestion,
}: { 
  questionId: string; 
  deleteQuestion: (questionId: string) => void;
  editQuestion:   (questionId: string) => void;
}) {

  const navigate = useNavigate();
  const { cid, qid } = useParams();
  
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this question?")) {
      deleteQuestion(questionId);
    }
  };

  const handleEdit = () => {
    editQuestion(questionId);
    navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/Questions/${questionId}/Editor`);
  };

  return (
    <div className="float-end">

      <ProtectedContent>
        {/* Protected for faculty only */}
        <FaPencil 
          onClick={handleEdit} 
          className="text-primary me-3" 
        />
        <FaTrash 
          className="text-danger me-2 mb-1" 
          onClick={handleDelete}
        />
      </ProtectedContent>

    </div>
  );
}
