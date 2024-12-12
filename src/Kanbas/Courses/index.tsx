import { useEffect, useState } from "react";
import CoursesNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import PeopleTable from "./People/Table";
import Quizzes from "./Quizzes";
import QuizDetails from "./Quizzes/QuizDetails";
import QuizEditor from "./Quizzes/QuizEditor";
import QuizDetailsEditor from "./Quizzes/QuizDetailsEditor";
import QuizPreview from "./Quizzes/QuizPreview";
import QuestionList from "./Quizzes/Questions/QuestionList";
import QuestionEditor from "./Quizzes/Questions/QuestionEditor";
import * as coursesClient from "./client";
import { Navigate, Route, Routes, useParams } from "react-router";
import { FaAlignJustify } from "react-icons/fa";

export default function Courses({ courses }: { courses: any[]; }) {
    const { cid } = useParams();
    const course = courses.find((course) => course._id === cid);
    const [users, setUsers] = useState([]);

    useEffect(() => {
      if (cid) {
        coursesClient
          .findUsersForCourse(cid)
          .then((fetchedUsers) => setUsers(fetchedUsers))
          .catch((err) => console.error("Error fetching users:", err));
      }
    }, [cid]);
    
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
                    <Route path="People" element={<PeopleTable users={users} />} />
                    <Route path="Quizzes" element={<Quizzes />} />
                    <Route path="Quizzes/:qid/Editor" element={<QuizEditor />} />
                    <Route path="Quizzes/New/Editor" element={<QuizDetailsEditor />} />
                    <Route path="Quizzes/:qid/Details" element={<QuizDetails />} />
                    <Route path="Quizzes/:qid/Preview" element={<QuizPreview />} />
                    <Route path="Quizzes/:qid/Questions" element={<QuestionList />} />
                    <Route path="Quizzes/:qid/Questions/:questionId/Details" element={<QuestionList />} />
                    <Route path="Quizzes/:qid/Questions/:questionId/Editor" element={<QuestionEditor />} />
                    <Route path="Quizzes/:qid/Questions/New/Editor" element={<QuestionEditor />} />
                </Routes>
                </div>
            </div>
        </div>
    );}