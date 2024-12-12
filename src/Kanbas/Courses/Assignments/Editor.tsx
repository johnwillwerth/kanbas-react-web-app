import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from 'react';
import ProtectedContent from '../../Account/ProtectedContent';
import * as coursesClient from "../client";
import { addAssignment, updateAssignment } from "./reducer";

export default function AssignmentEditor() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { cid, aid } = useParams();
  const { assignments } = useSelector((state: any) => state.assignmentReducer);
  const existingAssignment = assignments.find((a: any) => a.course === cid && a._id === aid);
  
  const [assignmentTitle, setAssignmentTitle] = useState("");
  const [assignmentGroup, setAssignmentGroup] = useState("");
  const [assignmentDescription, setAssignmentDescription] = useState("");
  const [assignmentPoints, setAssignmentPoints] = useState(0);
  const [assignmentDisplayGradeAs, setAssignmentDisplayGradeAs] = useState("");
  const [assignmentSubmissionType, setAssignmentSubmissionType] = useState("");
  const [assignmentEntryOptions, setAssignmentEntryOptions] = useState("");
  const [assignmentAssignTo, setAssignmentAssignTo] = useState("");
  const [assignmentAvailDate, setAssignmentAvailDate] = useState<Date | null>(null);
  const [assignmentDueDate, setAssignmentDueDate] = useState<Date | null>(null);
  const [assignmentAvailUntilDate, setAssignmentAvailUntilDate] = useState<Date | null>(null);

  const createAssignment = async () => {
    const newAssignment = await coursesClient.createAssignment(cid || "", {
      title: assignmentTitle,
      course: cid,
      group: assignmentGroup,
      description: assignmentDescription,
      points: assignmentPoints,
      displayGradeAs: assignmentDisplayGradeAs,
      submissionType: assignmentSubmissionType,
      entryOptions: assignmentEntryOptions,
      assignTo: assignmentAssignTo,
      availDate: assignmentAvailDate,
      dueDate: assignmentDueDate,
      availUntilDate: assignmentAvailUntilDate,
    });
    
    setAssignmentTitle(newAssignment.title);
    setAssignmentGroup(newAssignment.group);
    setAssignmentDescription(newAssignment.description);
    setAssignmentPoints(newAssignment.points);
    setAssignmentDisplayGradeAs(newAssignment.displayGradeAs);
    setAssignmentSubmissionType(newAssignment.submissionType);
    setAssignmentEntryOptions(newAssignment.entryOptions);
    setAssignmentAssignTo(newAssignment.assignTo);
    setAssignmentAvailDate(newAssignment.availDate);
    setAssignmentDueDate(newAssignment.dueDate);
    setAssignmentAvailUntilDate(newAssignment.availUntilDate);

    if (aid) {
      // Update existing assignment
      dispatch(updateAssignment(existingAssignment));
    } else {
      // Create a new assignment
      dispatch(addAssignment(newAssignment));
    }
    navigate(`/Kanbas/Courses/${cid}/Assignments`);
  };

  useEffect(() => {
    if (existingAssignment) {
      setAssignmentTitle(existingAssignment.title || "");
      setAssignmentGroup(existingAssignment.group || "");
      setAssignmentDescription(existingAssignment.description || "");
      setAssignmentPoints(existingAssignment.points || 0);
      setAssignmentDisplayGradeAs(existingAssignment.displayGradeAs || "");
      setAssignmentSubmissionType(existingAssignment.submissionType || "");
      setAssignmentEntryOptions(existingAssignment.entryOptions || "");
      setAssignmentAssignTo(existingAssignment.assignTo || "");
      setAssignmentAvailDate(existingAssignment.availDate ? new Date(existingAssignment.availDate) : null);
      setAssignmentDueDate(existingAssignment.dueDate ? new Date(existingAssignment.dueDate) : null);
      setAssignmentAvailUntilDate(existingAssignment.availUntilDate ? new Date(existingAssignment.availUntilDate) : null);
    }
  }, [existingAssignment]);
  
  return (
    <div id="wd-assignments-editor" className="container mt-4">
      <ProtectedContent>
        <h2>Edit Assignment</h2>
      </ProtectedContent>
      
      <div className="row">
        <div className="col-12">
          <label htmlFor="wd-name" className="form-label">Assignment Title</label>
          <input 
            id="wd-title" 
            className="form-control mb-3" 
            readOnly={currentUser.role === "STUDENT"} 
            value={assignmentTitle} 
            placeholder="Assignment Title"
            onChange={(e) => setAssignmentTitle(e.target.value)}
          />
        </div>
      </div>

      <div className="form-label">
        <label htmlFor="wd-description" className="form-label" />
        <div className="border p-3 rounded">
        <textarea
          id="wd-description"
          className="form-control mb-3"
          style={{
            width: "100%",
            height: "200px",
            fontSize: "16px",
            resize: "vertical",
          }}
          readOnly={currentUser.role === "STUDENT"}
          value={assignmentDescription}
          placeholder={`The assignment is available online. Be sure to include:
        - Your full name and section
        - Links to each of the lab assignments
        - Link to the Kanbas application
        - Links to all relevant source code repositories`}
          onChange={(e) => setAssignmentDescription(e.target.value)}
        ></textarea>
        </div>
      </div>

      <div className="form-label">
        <div className="row">
          <div className="col-auto">
            <label htmlFor="wd-points" className="form-label">Points</label>
          </div>
          <div className="col-12 col-md-6 mb-3">
            <input 
              id="wd-points" 
              className="form-control" 
              readOnly={currentUser.role === "STUDENT"} 
              value={assignmentPoints} 
              onChange={(e) => setAssignmentPoints(Number(e.target.value))}
            />
          </div>
        </div>
      </div>

      <div className="form-label">
        <div className="row">
          <div className="col-auto">
            <label htmlFor="wd-group" className="form-label">Assignment Group</label>
          </div>
          <div className="col-12 col-md-6 mb-3">
            <select 
              id="wd-group" 
              className="form-control" 
              value={assignmentGroup}
              onChange={(e) => setAssignmentGroup(e.target.value)}
            >
              <option value="ASSIGNMENTS">ASSIGNMENTS</option>
              <option value="QUIZZES"    >QUIZZES</option>
              <option value="EXAMS"      >EXAMS</option>
              <option value="PROJECT"    >PROJECT</option>
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
            <select 
              id="wd-display-grade-as" 
              className="form-control" 
              value={assignmentDisplayGradeAs}
              onChange={(e) => setAssignmentDisplayGradeAs(e.target.value)}
            >
              <option value="ASSIGNMENTS">Percentage</option>
              <option value="QUIZZES"    >Letter</option>
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
                <select 
                  id="wd-submission-type" 
                  className="form-control" 
                  value={assignmentSubmissionType}
                  onChange={(e) => setAssignmentSubmissionType(e.target.value)}
                >
                  <option value="Online">Online</option>
                  <option value="In-person">In-person</option>
                </select>
              </div>

              <label htmlFor="wd-online-entry-options" className="form-label">
                <span style={{ fontWeight: 'bold', float: 'left' }}>Online Entry Options</span>
              </label>
              <div className="form-check">
                <input 
                  id="wd-text-entry"
                  className="form-check-input" 
                  readOnly={currentUser.role === "STUDENT"} 
                  type="checkbox" 
                  value={assignmentEntryOptions} 
                  onChange={(e) => setAssignmentEntryOptions(e.target.value)}
                />
                <label className="form-check-label" htmlFor="wd-text-entry">
                  Text Entry
                </label>
              </div>

              <div className="form-check">
                <input 
                  id="wd-website-url" 
                  className="form-check-input" 
                  readOnly={currentUser.role === "STUDENT"} 
                  type="checkbox" 
                  value={assignmentEntryOptions} 
                  onChange={(e) => setAssignmentEntryOptions(e.target.value)}
                />
                <label className="form-check-label" htmlFor="wd-website-url">
                  Website URL
                </label>
              </div>

              <div className="form-check">
                <input 
                  id="wd-media-recordings" 
                  className="form-check-input" 
                  type="checkbox" 
                  readOnly={currentUser.role === "STUDENT"} 
                  value={assignmentEntryOptions} 
                  onChange={(e) => setAssignmentEntryOptions(e.target.value)}
                />
                <label className="form-check-label" htmlFor="wd-media-recordings">
                  Media Recordings
                </label>
              </div>

              <div className="form-check">
                <input 
                  id="wd-student-annotation"
                  className="form-check-input" 
                  type="checkbox" 
                  readOnly={currentUser.role === "STUDENT"} 
                  value={assignmentEntryOptions} 
                  onChange={(e) => setAssignmentEntryOptions(e.target.value)}
                />
                <label className="form-check-label" htmlFor="wd-student-annotation">
                  Student Annotation
                </label>
              </div>

              <div className="form-check">
                <input 
                  id="wd-file-uploads"
                  className="form-check-input" 
                  type="checkbox" 
                  readOnly={currentUser.role === "STUDENT"} 
                  value={assignmentEntryOptions} 
                  onChange={(e) => setAssignmentEntryOptions(e.target.value)}
                />
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
                <input 
                  id="wd-assign-to" 
                  className="form-control" 
                  readOnly={currentUser.role === "STUDENT"} 
                  value={assignmentAssignTo} 
                  onChange={(e) => setAssignmentAssignTo(e.target.value)}
                />

                <label htmlFor="wd-due-date" className="form-label">
                  <span style={{ fontWeight: 'bold' }}>Due</span>
                </label>
                <input 
                  id="wd-due-date" 
                  className="form-control" 
                  type="date" 
                  readOnly={currentUser.role === "STUDENT"} 
                  value={assignmentDueDate instanceof Date && !isNaN(assignmentDueDate.getTime())
                    ? assignmentDueDate.toISOString().split("T")[0]
                    : ""}
                  onChange={(e) => setAssignmentDueDate(new Date(e.target.value))}
                />

                <label htmlFor="wd-available-from" className="form-label">
                  <span style={{ fontWeight: 'bold' }}>Available from</span>
                </label>
                <input 
                  id="wd-available-from" 
                  className="form-control" 
                  type="date"
                  readOnly={currentUser.role === "STUDENT"} 
                  value={assignmentAvailDate instanceof Date && !isNaN(assignmentAvailDate.getTime())
                    ? assignmentAvailDate.toISOString().split("T")[0]
                    : ""}
                  onChange={(e) => setAssignmentAvailDate(new Date(e.target.value))}
                />

                <label htmlFor="wd-available-until" className="form-label">
                  <span style={{ fontWeight: 'bold' }}>Until</span>
                </label>
                <input 
                  id="wd-available-until" 
                  className="form-control" 
                  type="date" 
                  readOnly={currentUser.role === "STUDENT"} 
                  value={assignmentAvailUntilDate instanceof Date && !isNaN(assignmentAvailUntilDate.getTime())
                    ? assignmentAvailUntilDate.toISOString().split("T")[0]
                    : ""}
                  onChange={(e) => setAssignmentAvailUntilDate(new Date(e.target.value))}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <ProtectedContent>
        {/* Protected for faculty only */}
        <div className="row">
          <div className="col-12 text-end mt-3">
              {/* Cancel and Save buttons */}
              <button 
                type="button"
                className="btn btn-secondary me-2" 
                onClick={() => navigate(`/Kanbas/Courses/${cid}/Assignments`)}
              >
                Cancel
              </button>
              <button 
                onClick={createAssignment}
                type="button"
                className="btn btn-danger" 
              >
                Save
              </button>
          </div>
        </div>
      </ProtectedContent>

    </div>
  );
}
  