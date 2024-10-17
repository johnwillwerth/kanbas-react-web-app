import { BsGripVertical, BsPlus } from "react-icons/bs";
import { IoEllipsisVertical } from "react-icons/io5";
import { PiNotePencilDuotone } from "react-icons/pi";
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import { useState } from 'react';
import AssignmentControls from "./AssignmentControls";
import AssignmentControlButtons from "./AssignmentControlButtons";
import * as db from "../../Database";
import { Link, useParams } from "react-router-dom";

export default function Assignments() {
  const [isOpen, setIsOpen] = useState(true); // State to manage the collapse/expand status

  const toggleList = () => {
    setIsOpen(!isOpen); // Toggle the isOpen state
  };

  const { cid } = useParams();
  const { assignments } = db;

  // Filter assignments based on the course ID from the URL params
  const courseAssignments = assignments.filter((assignment) => assignment.course === cid);

  return (
    <div id="wd-assignments">
      <div className="container">
        <AssignmentControls />
        <br /><br /><br /><br />
        <ul id="wd-assignment-list" className="list-group">
          <li className="wd-assignment list-group-item p-0 mb-5 fs-5 border-gray">
            <div className="wd-title p-3 ps-2 bg-secondary d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center" onClick={toggleList} style={{ cursor: 'pointer' }}>
                <BsGripVertical className="me-2 fs-3" />
                {isOpen ? <FaAngleUp className="me-2" /> : <FaAngleDown className="me-2" />}
                <span style={{ fontWeight: 'bold' }}>ASSIGNMENTS</span>
              </div>
              <div className="d-flex align-items-center">
                <span className="oval-text me-2">40% of Total</span>
                <BsPlus className="fs-4" />
                <IoEllipsisVertical className="fs-4" />
              </div>
            </div>

            {/* Only render this part when isOpen is true */}
            {isOpen && (
              <ul className="wd-assignment list-group rounded-0">
                {courseAssignments.length > 0 ? (
                  courseAssignments.map((assignment) => (
                    <li key={assignment._id} className="wd-lesson list-group-item p-3 ps-1 border-gray">
                      <div className="d-flex align-items-center">
                        <BsGripVertical className="me-2 fs-3" />
                        <button className="btn btn-md btn-outline-none me-3 text-start" style={{ backgroundColor: 'transparent' }}>
                          <PiNotePencilDuotone className="me-2 fs-5" />
                        </button>
                        <span>
                          <Link to={`/Kanbas/Courses/${assignment.course}/Assignments/Editor`} id="wd-course-assignment-editor-link"
                            className="list-group-item border border-0" style={{ padding: '0', marginBottom: '0.5rem' }}>
                            <span style={{ fontWeight: 'bold', fontSize: '24px' }}>{assignment._id}</span>
                          </Link>
                          <div style={{ marginTop: '0.5rem' }}>
                            <span style={{ fontWeight: 'bold', color: 'red' }}>Multiple Modules</span> |
                            <span style={{ fontWeight: 'bold' }}> Not available until </span>
                            {assignment.availDate} at 12:00am |
                            <br />
                            <span style={{ fontWeight: 'bold' }}>Due</span> {assignment.dueDate} at 11:59pm | {assignment.points} pts
                          </div>
                        </span>
                      </div>
                      <AssignmentControlButtons />
                    </li>
                  ))
                ) : (
                  <li className="list-group-item p-3">
                    <span>No assignments found for this course.</span>
                  </li>
                )}
              </ul>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
}