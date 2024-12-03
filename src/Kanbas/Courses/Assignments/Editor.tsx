import { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as coursesClient from "../client";
import * as assignmentsClient from "./client";
import ProtectedContent from '../../Account/ProtectedContent';
import { setAssignments, addAssignment } from "./reducer";

export default function AssignmentEditor() {

  const { cid, aid } = useParams();
  const { assignments } = useSelector((state: any) => state.assignmentReducer);
  // Find the relevant assignment based on both the course ID and assignment ID
  const existingAssignment = assignments.find((a: any) => a.course === cid && a._id === aid); 

  const saveAssignment = async () => {
    try {
        const savedAssignment = aid
            ? await assignmentsClient.updateAssignment(assignment)
            : await coursesClient.createAssignment(cid || "", assignment);
        
        dispatch(aid ? setAssignments(savedAssignment) : addAssignment(savedAssignment));
        navigate(`/Kanbas/Courses/${cid}/Assignments`);
    } catch (error) {
        console.error("Failed to save the assignment:", error);
    }
  };

  const [assignment, setAssignment] = useState({
    title: existingAssignment?.title || "",
    description: existingAssignment?.description || "",
    points: existingAssignment?.points || 0,
    group: existingAssignment?.group || "ASSIGNMENTS",
    gradeType: existingAssignment?.displayGradeAs || "Percentage",
    submissionType: existingAssignment?.submissionType || "Online",
    entryOption: existingAssignment?.entryOption || [],
    assignTo: existingAssignment?.assignTo || "Everyone",
    availableDate: existingAssignment?.availDate || new Date().toISOString().split('T')[0],
    dueDate: existingAssignment?.dueDate || new Date().toISOString().split('T')[0],
    isChecked: existingAssignment?.isChecked || false,
  });

  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const handleChange = (field: any, value: any) => {
    setAssignment((prev) => ({ ...prev, [field]: value }));
  };


  // Fetch course assignment from server if it exists
  useEffect(() => {
    const fetchAssignment = async () => {
      if (aid) {
        const assignment = await coursesClient.findAssignmentsForCourse(aid as string);
        dispatch(setAssignments(assignment));
      }
    }
    fetchAssignment();
  }, [aid]);
  
  return (
    <div id="wd-assignments-editor" className="container mt-4">
      <ProtectedContent>
        <h2>Edit Assignment</h2>
      </ProtectedContent>
      <div className="row">
        <div className="col-12">
          <label htmlFor="wd-name" className="form-label">Assignment Name</label>
          <input id="wd-name" className="form-control mb-3" readOnly={currentUser.role === "STUDENT"} value={assignment.title} 
            onChange={(e) => handleChange("title", e.target.value)}/>
        </div>
      </div>

      <div className="form-label">
        <label htmlFor="wd-description" className="form-label" />
        <div className="border p-3 rounded">
          <p>{assignment.description}</p>

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
            <input id="wd-points" className="form-control" readOnly={currentUser.role === "STUDENT"} value={assignment.points} 
              onChange={(e) => handleChange("points", Number(e.target.value))}/>
          </div>
        </div>
      </div>

      <div className="form-label">
        <div className="row">
          <div className="col-auto">
            <label htmlFor="wd-group" className="form-label">Assignment Group</label>
          </div>
          <div className="col-12 col-md-6 mb-3">
            <select id="wd-group" className="form-control" value={assignment.group}
              onChange={(e) => handleChange("group", e.target.value)}>
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
              onChange={(e) => handleChange("gradeType", e.target.value)}>
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
                  onChange={(e) => handleChange("submissionType", e.target.value)}>
                  <option value="Online">Online</option>
                  <option value="In-person">In-person</option>
                </select>
              </div>

              <label htmlFor="wd-online-entry-options" className="form-label">
                <span style={{ fontWeight: 'bold', float: 'left' }}>Online Entry Options</span>
              </label>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" value={assignment.entryOption} id="wd-text-entry" readOnly={currentUser.role === "STUDENT"} 
                  onChange={(e) => handleChange("entryOption", e.target.value)}/>
                <label className="form-check-label" htmlFor="wd-text-entry">
                  Text Entry
                </label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" value={assignment.entryOption} id="wd-website-url" readOnly={currentUser.role === "STUDENT"} 
                  onChange={(e) => handleChange("entryOption", e.target.value)}/>
                <label className="form-check-label" htmlFor="wd-website-url">
                  Website URL
                </label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" value={assignment.entryOption} id="wd-media-recordings" readOnly={currentUser.role === "STUDENT"} 
                  onChange={(e) => handleChange("entryOption", e.target.value)}/>
                <label className="form-check-label" htmlFor="wd-media-recordings">
                  Media Recordings
                </label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" value={assignment.entryOption} id="wd-student-annotation" readOnly={currentUser.role === "STUDENT"} 
                  onChange={(e) => handleChange("entryOption", e.target.value)}/>
                <label className="form-check-label" htmlFor="wd-student-annotation">
                  Student Annotation
                </label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="wd-file-uploads" readOnly={currentUser.role === "STUDENT"} 
                  onChange={(e) => handleChange("submissionType", e.target.value)}/>
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
                <input id="wd-assign-to" className="form-control" value={assignment.assignTo} readOnly={currentUser.role === "STUDENT"} 
                  onChange={(e) => handleChange("assignTo", e.target.value)}/>

                <label htmlFor="wd-due-date" className="form-label">
                  <span style={{ fontWeight: 'bold' }}>Due</span>
                </label>
                <input id="wd-due-date" type="date" className="form-control" readOnly={currentUser.role === "STUDENT"} value={assignment.dueDate ? assignment.dueDate.split("T")[0] : ""} 
                  onChange={(e) => handleChange("dueDate", e.target.value)}/>

                <label htmlFor="wd-available-from" className="form-label">
                  <span style={{ fontWeight: 'bold' }}>Available from</span>
                </label>
                <input id="wd-available-from" type="date" className="form-control" readOnly={currentUser.role === "STUDENT"} value={assignment.availableDate ? assignment.availableDate.split("T")[0] : ""} 
                  onChange={(e) => handleChange("availableDate", e.target.value)}/>

                <label htmlFor="wd-available-until" className="form-label">
                  <span style={{ fontWeight: 'bold' }}>Until</span>
                </label>
                <input id="wd-available-until" type="date" className="form-control" readOnly={currentUser.role === "STUDENT"} value={assignment.dueDate ? assignment.dueDate.split("T")[0] : ""} 
                  onChange={(e) => handleChange("dueDate", e.target.value)}/>
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
                onClick={saveAssignment}
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
  