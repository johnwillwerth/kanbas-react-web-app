import { FaPlus } from "react-icons/fa6";
import { RxMagnifyingGlass } from "react-icons/rx";

export default function AssignmentControls() {
  return (
    <div id="wd-assignment-controls" className="d-flex justify-content-between align-items-center">
      {/* Search Box */}
      <div className="input-group me-3" style={{ flexGrow: 1, maxWidth: '300px' }}>
        <input
          id="wd-search-assignment"
          placeholder="Search..."
          className="form-control"
          style={{ paddingLeft: '40px' }} // Space for the icon
        />
        <span className="input-group-text" style={{ 
          backgroundColor: 'transparent', 
          border: 'none', 
          position: 'absolute', 
          left: '10px', 
          top: '50%', 
          transform: 'translateY(-50%)', 
          pointerEvents: 'none', 
          marginLeft: '5px' // Add space to the left of the icon
        }}>
          <RxMagnifyingGlass />
        </span>
      </div>

      {/* Buttons */}
      <div className="d-flex">
        <button id="wd-add-assignment-btn" className="btn btn-lg btn-danger me-1">
          <FaPlus className="position-relative me-2" style={{ bottom: "2px" }} />
          Assignment
        </button>
        <button id="wd-add-group-btn" className="btn btn-lg btn-secondary me-1">
          <FaPlus className="position-relative me-2" style={{ bottom: "2px" }} />
          Group
        </button>
      </div>
    </div>
  );
}
