import { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaPencil } from "react-icons/fa6";
import * as coursesClient from "../client";
import { 
  setQuizzes,  
} from "./reducer";

export default function QuizDetails() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cid, qid } = useParams();
  const { quizzes } = useSelector((state: any) => state.quizReducer);
  // Find the relevant quiz based on both the course ID and quiz ID
  const existingQuiz = quizzes.find((q: any) => q.course === cid && q._id === qid);

  const [quiz, setQuiz] = useState({
    title:            existingQuiz?.title             || "",
    course:           existingQuiz?.course            || cid,
    type:             existingQuiz?.type              || "Graded Quiz",
    points:           existingQuiz?.points            || 0,
    group:            existingQuiz?.group             || "Quizzes",
    shuffle:          existingQuiz?.shuffle           || true,
    timeLimit:        existingQuiz?.timeLimit         || 20,
    multipleAttempts: existingQuiz?.multipleAttempts  || false,
    allowedAttempts:  existingQuiz?.allowedAttempts   || 1,
    showAnswers:      existingQuiz?.showAnswers       || "After Due Date",
    accessCode:       existingQuiz?.accessCode        || "",
    oneQuestion:      existingQuiz?.oneQuestion       || true,
    webcam:           existingQuiz?.webcam            || false,
    lockQuestions:    existingQuiz?.lockQuestions     || false,
    dueDate:          existingQuiz?.dueDate           || new Date().toISOString().split('T')[0],
    availDate:        existingQuiz?.availDate         || new Date().toISOString().split('T')[0],
    untilDate:        existingQuiz?.untilDate         || new Date().toISOString().split('T')[0],
  });

  const fetchQuizzes = async () => {
    if (cid) {
      const quizzes = await coursesClient.findQuizzesForCourse(cid);
      dispatch(setQuizzes(quizzes));
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, [cid, dispatch]);

  return (
    <div className="quiz-details-container">
      <div className="header">
        <button 
          className="btn btn-light me-2"
          type="button"
          id="preview-button"
          onClick={() => navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/Preview`)}
        >
          Preview
        </button>
        <button 
          className="btn btn-light"
          type="button"
          id="edit-button"
          onClick={() => navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/Editor`)}
        >
          <FaPencil />
          &nbsp; Edit
        </button>
      </div>
      <hr />

      <div className="quiz-details">
        <h2>{quiz.title}</h2>
        <ul className="quiz-details">
          <li><span className="label">Quiz Type:</span> {quiz.type}</li>
          <li><span className="label">Points:</span> {quiz.points}</li>
          <li><span className="label">Assignment Group:</span> {quiz.group}</li>
          <li><span className="label">Shuffle Answers:</span> {quiz.shuffle ? "Yes" : "No"}</li>
          <li><span className="label">Time Limit:</span> {quiz.timeLimit}</li>
          <li><span className="label">Multiple Attempts:</span> {quiz.multipleAttempts ? "Yes" : "No"}</li>
          <li><span className="label">View Responses:</span> {/* Put something here */}</li>
          <li><span className="label">Show Correct Answers:</span> {quiz.showAnswers}</li>
          <li><span className="label">One Question at a Time:</span> {quiz.oneQuestion ? "Yes" : "No"}</li>
          <li><span className="label">Require Respondus LockDown Browser:</span> {/* Put something here */}</li>
          <li><span className="label">Required to View Quiz Results:</span> {/* Put something here */}</li>
          <li><span className="label">Webcam Required:</span> {quiz.webcam ? "Yes" : "No"}</li>
          <li><span className="label">Lock Questions After Answering:</span> {quiz.lockQuestions ? "Yes" : "No"}</li>
        </ul>
      </div>

      <div className="availability">
        <table className="table">
          <thead>
            <tr>
              <th>Due</th>
              <th>For</th>
              <th>Available From</th>
              <th>Until</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{quiz.dueDate}</td>
              <td>{quiz.group}</td>
              <td>{quiz.availDate}</td>
              <td>{quiz.untilDate}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}