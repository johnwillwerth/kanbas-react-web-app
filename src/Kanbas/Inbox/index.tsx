import CoursesNavigation from "../Courses/Navigation";
import Home from "../Courses/Home";
import { Navigate, Route, Routes } from "react-router";
import { FaAlignJustify } from "react-icons/fa";
export default function Inbox() {
    return (
        <div id="wd-inbox">
            <h2 className="text-danger">
                <FaAlignJustify className="me-4 fs-4 mb-1" />
                Inbox </h2> <hr />
            <div className="d-flex">
                <div className="d-none d-md-block">
                    <CoursesNavigation />
                </div>
                <div className="flex-fill">
                    <Routes>
                        <Route path="Home" element={<Home />} />
                    </Routes>
                </div>
            </div>
        </div>
    );}