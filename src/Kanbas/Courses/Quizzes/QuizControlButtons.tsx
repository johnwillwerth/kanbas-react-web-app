import { IoEllipsisVertical } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import { IoMdCloseCircleOutline } from "react-icons/io";
import GreenCheckmark from "./GreenCheckmark";
import ProtectedContent from "../../Account/ProtectedContent";

export default function QuizControlButtons({
  quizId,
  deleteQuiz,
  editQuiz,
  published,
  togglePublishStatus,
}: {
  quizId: string;
  deleteQuiz:     (quizId: string) => void;
  editQuiz:       (quizId: string) => void;
  published: boolean;
  togglePublishStatus: (quizId: string, status: boolean) => void;
}) {

  const navigate = useNavigate();
  const { cid } = useParams();

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this quiz?")) {
      deleteQuiz(quizId);
    }
  };

  const handleEdit = () => {
    editQuiz(quizId);
    navigate(`/Kanbas/Courses/${cid}/Quizzes/${quizId}/Details`);
  };

  const handleTogglePublish = () => {
    togglePublishStatus(quizId, !published);
  };

  return (
    <div className="float-end" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      {/* Quiz Status Icon */}
      <div className="quiz-status">
        {published ? <GreenCheckmark /> : <IoMdCloseCircleOutline />}
      </div>

      {/* Ellipsis Dropdown Button */}
      <ProtectedContent>
        <button
          className="btn btn-light dropdown-toggle"
          type="button"
          id="dropdownMenuButton"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <IoEllipsisVertical className="fs-4" />
        </button>

        <ul
          className="dropdown-menu dropdown-menu-end"
          aria-labelledby="dropdownMenuButton"
        >
          <li>
            <button
              className="dropdown-item" 
              onClick={handleEdit}
            >
              Edit Quiz
            </button>
            <button
              className="dropdown-item" 
              onClick={handleDelete}
            >
              Delete Quiz
            </button>
            <button
              className="dropdown-item" 
              onClick={handleTogglePublish}
            >
              {!published ? "Publish Quiz" : "Unpublish Quiz"}
            </button>
          </li>
        </ul>
      </ProtectedContent>
    </div>
  );
}