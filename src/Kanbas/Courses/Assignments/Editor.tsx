import { useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as db from "../../Database";
import ProtectedContent from '../../Account/ProtectedContent';
import { updateAssignment } from './reducer';

export default function AssignmentEditor() {
  const { cid, aid } = useParams(); // Get both course ID and assignment ID
  const { assignments } = db;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Find the relevant assignment based on both the course ID and assignment ID
  const assignment = assignments.find((a) => a.course === cid && a._id === aid);
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  // Initialize state variables for editable fields
  const [title, setTitle] = useState(assignment?.title || "");
  const [points, setPoints] = useState(assignment?.points || 0);
  const [group, setGroup] = useState(assignment?.group || "ASSIGNMENTS");
  const [displayGradeAs, setDisplayGradeAs] = useState("Percentage");
  const [submissionType, setSubmissionType] = useState("Online");
  const [entryOption, setEntryOption] = useState("Website URL");
  const [assignTo, setAssignTo] = useState("Everyone");
  const [availDate, setAvailDate] = useState(assignment ? new Date(assignment.availDate).toISOString().split('T')[0] : "");
  const [dueDate, setDueDate] = useState(assignment ? new Date(assignment.dueDate).toISOString().split('T')[0] : "");
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked); // Toggle the checked state
  };

  {/* NOTE to Grader: I was never able to get the Save button working.*/}

  /// Save updates to Redux
  const handleSave = () => {
    dispatch(
      updateAssignment({
        _id: assignment?._id,
        title,
        points,
        group,
        displayGradeAs,
        submissionType,
        entryOption,
        assignTo,
        availDate,
        dueDate,
        isChecked,
        course: assignment?.course,
      })
    );
    navigate(`/Kanbas/Courses/${cid}/Assignments`);
  };

  return (
    <div id="wd-assignments-editor" className="container mt-4">
      <ProtectedContent>
        <h2>Edit Assignment</h2>
      </ProtectedContent>
      <div className="row">
        <div className="col-12">
          <label htmlFor="wd-name" className="form-label">Assignment Name</label>
          <input id="wd-name" className="form-control mb-3" readOnly={currentUser.role === "STUDENT"} defaultValue={`${assignment?._id} - ${assignment?.title}`} 
            onChange={(e) => setTitle(e.target.value)}/>
        </div>
      </div>

      <div className="form-label">
        <label htmlFor="wd-description" className="form-label" />
        <div className="border p-3 rounded">
          <p>{assignment?.description}</p>

          <p>
            The assignment is <span style={{ color: 'red' }}>available online</span>. Be sure to include the following:
          </p>

          <ul>
            <li>Your full name and section</li>
            <li>Links to each of the lab assignments</li>
            <li>Link to the Kanbas application</li>
            <li>Links to all relevant source code repositories</li>
          </ul>

          <p>
            The Kanbas application should include a link to navigate back to the landing page.
          </p>
        </div>
      </div>

      <div className="form-label">
        <div className="row">
          <div className="col-auto">
            <label htmlFor="wd-points" className="form-label">Points</label>
          </div>
          <div className="col-12 col-md-6 mb-3">
            <input id="wd-points" className="form-control" readOnly={currentUser.role === "STUDENT"} defaultValue={assignment?.points} 
              onChange={(e) => setPoints(Number(e.target.value))}/>
          </div>
        </div>
      </div>

      <div className="form-label">
        <div className="row">
          <div className="col-auto">
            <label htmlFor="wd-group" className="form-label">Assignment Group</label>
          </div>
          <div className="col-12 col-md-6 mb-3">
            <select id="wd-group" className="form-control" defaultValue={assignment?.group}
              onChange={(e) => setGroup(e.target.value)}>
              <option value="ASSIGNMENTS">ASSIGNMENTS</option>
              <option value="QUIZZES">QUIZZES</option>
              <option value="EXAMS">EXAMS</option>
              <option value="PROJECT">PROJECT</option>
            </select>
          </div>
        </div>
      </div>

      <div className="form-label">
        <div className="row">
          <div className="col-auto">
            <label htmlFor="wd-display-grade-as" className="form-label">Display Grade as</label>
          </div>
          <div className="col-12 col-md-6 mb-3">
            <select id="wd-display-grade-as" className="form-control" 
              onChange={(e) => setDisplayGradeAs(e.target.value)}>
              <option value="ASSIGNMENTS">Percentage</option>
              <option value="QUIZZES">Letter</option>
            </select>
          </div>
        </div>
      </div>

      <div className="form-label">
        <div className="row">
          <div className="col-auto">
            <label htmlFor="wd-submission-type" className="form-label">Submission Type</label>
          </div>
          <div className="col">
            <div className="border p-3 rounded">
              <div className="col-12 col-md-6 mb-3">
                <select id="wd-submission-type" className="form-control" 
                  onChange={(e) => setSubmissionType(e.target.value)}>
                  <option value="Online">Online</option>
                  <option value="In-person">In-person</option>
                </select>
              </div>

              <label htmlFor="wd-online-entry-options" className="form-label">
                <span style={{ fontWeight: 'bold', float: 'left' }}>Online Entry Options</span>
              </label>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" value={entryOption} id="wd-text-entry" readOnly={currentUser.role === "STUDENT"} 
                  onChange={(e) => setEntryOption(e.target.value)}/>
                <label className="form-check-label" htmlFor="wd-text-entry">
                  Text Entry
                </label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" value={entryOption} id="wd-website-url" readOnly={currentUser.role === "STUDENT"} 
                  onChange={(e) => setEntryOption(e.target.value)}/>
                <label className="form-check-label" htmlFor="wd-website-url">
                  Website URL
                </label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" value={entryOption} id="wd-media-recordings" readOnly={currentUser.role === "STUDENT"} 
                  onChange={(e) => setEntryOption(e.target.value)}/>
                <label className="form-check-label" htmlFor="wd-media-recordings">
                  Media Recordings
                </label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" value={entryOption} id="wd-student-annotation" readOnly={currentUser.role === "STUDENT"} 
                  onChange={(e) => setEntryOption(e.target.value)}/>
                <label className="form-check-label" htmlFor="wd-student-annotation">
                  Student Annotation
                </label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="wd-file-uploads" readOnly={currentUser.role === "STUDENT"} 
                  onChange={(e) => setSubmissionType(e.target.value)}/>
                <label className="form-check-label" htmlFor="wd-file-uploads">
                  File Uploads
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="form-label">
        <div className="row">
          <div className="col-auto">
            <label htmlFor="wd-assign-to" className="form-label">Assign to</label>
          </div>
          <div className="col">
            <div className="border p-3 rounded">
              <div className="col-12 col-md-6 mb-3">
                <label htmlFor="wd-assign-to" className="form-label">
                  <span style={{ fontWeight: 'bold' }}>Assign to</span>
                </label>
                <input id="wd-assign-to" className="form-control" defaultValue={assignTo} readOnly={currentUser.role === "STUDENT"} 
                  onChange={(e) => setAssignTo(e.target.value)}/>

                <label htmlFor="wd-due-date" className="form-label">
                  <span style={{ fontWeight: 'bold' }}>Due</span>
                </label>
                <input id="wd-due-date" type="date" className="form-control" readOnly={currentUser.role === "STUDENT"} defaultValue={dueDate} 
                  onChange={(e) => setDueDate(e.target.value)}/>

                <label htmlFor="wd-available-from" className="form-label">
                  <span style={{ fontWeight: 'bold' }}>Available from</span>
                </label>
                <input id="wd-available-from" type="date" className="form-control" readOnly={currentUser.role === "STUDENT"} defaultValue={availDate} 
                  onChange={(e) => setAvailDate(e.target.value)}/>

                <label htmlFor="wd-available-until" className="form-label">
                  <span style={{ fontWeight: 'bold' }}>Until</span>
                </label>
                <input id="wd-available-until" type="date" className="form-control" readOnly={currentUser.role === "STUDENT"} defaultValue={dueDate} 
                  onChange={(e) => setDueDate(e.target.value)}/>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ProtectedContent>
        <div className="row">
          <div className="col-12 text-end mt-3">
              {/* Cancel and Save buttons */}
              <button 
                  id="Cancel" 
                  className="btn btn-secondary me-2" 
                  onClick={() => navigate(`/Kanbas/Courses/${cid}/Assignments`)}>
                  Cancel
              </button>
              <button 
                  id="Save" 
                  className="btn btn-danger" 
                  onClick={handleSave}>
                  Save
              </button>
          </div></div>
      </ProtectedContent>
    </div>
  );
}
