import ProtectedContent from "../../Account/ProtectedContent";
import { FaPlus } from "react-icons/fa6";
import { RxMagnifyingGlass } from "react-icons/rx";
import { useNavigate, useParams } from "react-router-dom";


export default function QuizControls() {

  const navigate = useNavigate();
  const { cid } = useParams();

  return (
    <div id="wd-quiz-controls" className="d-flex justify-content-between align-items-center gap-2 flex-wrap pb-4">
      {/* Search Box */}
      <div className="input-group me-3" style={{ flexGrow: 1, maxWidth: '300px' }}>
        <input
          id="wd-search-quiz"
          placeholder="Search for Quiz"
          className="form-control"
          style={{ paddingLeft: '45px' }}
        />
        <span className="input-group-text" style={{ 
          backgroundColor: 'transparent', 
          border: 'none', 
          position: 'absolute', 
          left: '10px', 
          top: '50%', 
          transform: 'translateY(-50%)', 
          pointerEvents: 'none', 
          
        }}>
          <RxMagnifyingGlass />
        </span>
      </div>
      
      <div className="dropdown d-inline me-1 float-end">

        <ProtectedContent>
          {/* Protected for faculty only */}
          <button 
            id="wd-add-quiz-btn" 
            className="btn btn-lg btn-danger me-1 float-end"
            onClick={() => navigate(`/Kanbas/Courses/${cid}/Quizzes/New/Editor`)}
          >
            <FaPlus 
              className="position-relative me-2" 
              style={{ bottom: "1px" }} />
            Quiz
          </button>
        </ProtectedContent>
        
      </div>
    </div>
  );
}