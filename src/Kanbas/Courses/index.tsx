import CoursesNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import PeopleTable from "./People/Table";
import Enrollments from "./Enrollments";
import { Navigate, Route, Routes, useParams, useLocation } from "react-router";
import { FaAlignJustify } from "react-icons/fa";

export default function Courses({ courses }: { courses: any[]; }) {
    const { aid, cid } = useParams();
    const course = courses.find((course) => course._id === cid);
    
    return (
        <div id="wd-courses">
            <h2 className="text-danger">
                <FaAlignJustify className="me-4 fs-4 mb-1" />
                {course && course.name} </h2> <hr />
            <div className="d-flex">
                <div className="d-none d-md-block">
                    <CoursesNavigation />
                </div>
                <div className="flex-fill">
                <Routes>
                    <Route path="/" element={<Navigate to="Home" />} />
                    <Route path="Home" element={<Home />} />
                    <Route path="Modules" element={<Modules />} />
                    <Route path="Assignments" element={<Assignments />} />
                    <Route path="Assignments/:aid/Editor" element={<AssignmentEditor />} />
                    <Route path="Assignments/New/Editor" element={<AssignmentEditor />} />
                    <Route path="People" element={<PeopleTable />} />
                    <Route path="Enrollments" element={<Enrollments />} />
                </Routes>
                </div>
            </div>
        </div>
    );}