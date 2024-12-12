import ProtectedContent from "../../Account/ProtectedContent";
import QuizControls from "./QuizControls";
import QuizControlButtons from "./QuizControlButtons";
import * as coursesClient from "../client";
import * as quizzesClient from "./client";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import { RxRocket } from "react-icons/rx";

import {
  editQuiz,
  deleteQuiz,
  setQuizzes,
} from "./reducer";

export default function Quizzes() {

  const { quizzes } = useSelector((state: any) => state.quizReducer);
  const { cid } = useParams();
  const dispatch = useDispatch();

  const fetchQuizzes = async () => {
    const quizzes = await coursesClient.findQuizzesForCourse(cid || "");
    dispatch(setQuizzes(quizzes));
  };

  const removeQuiz = async (quizId: string) => {
    const status = await quizzesClient.deleteQuiz(quizId);
    dispatch(deleteQuiz(quizId));
  };

  useEffect(() => {
    fetchQuizzes();
  }, [cid]);

  // Toggle quiz list open/closed
  const [isOpen, setIsOpen] = useState(true);
  const toggleList = () => {
    setIsOpen(!isOpen);
  };

  const togglePublishStatus = (quizId: string, newStatus: boolean) => {
    console.log(`Toggled quiz ${quizId} to ${newStatus ? "Published" : "Unpublished"}`);
  };

  return (
    <div id="wd-quizzes">
      <div className="container">
        <br />
        <QuizControls/>
        <br />
        <hr />
        <ul id="wd-quiz-list" className="list-group">
          <li className="list-group-item p-0 mb-5 fs-5 border-gray">
            <div className="wd-title p-3 ps-2 bg-secondary d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center" onClick={toggleList} style={{ cursor: 'pointer' }}>
                {isOpen ? <FaAngleUp className="me-2" /> : <FaAngleDown className="me-2" />}
                <span style={{ fontWeight: 'bold' }}>Assignment Quizzes</span>
              </div>
            </div>

            {/* Only render this part when isOpen is true */}
            {isOpen && (
              <ul id="wd-quizzes" className="list-group rounded-0">
                {quizzes.length > 0 ? (
                  quizzes.map((quiz: any) => (
                    <li key={quiz._id} className="wd-quiz list-group-item p-3 ps-1 border-gray">
                      <div className="d-flex align-items-center">
                        <button className="btn btn-md btn-outline-none me-3 text-start" style={{ backgroundColor: 'transparent' }}>
                          <RxRocket className="me-2 fs-5" />
                        </button>
                        

                        <span>
                          {/* Link the quiz title to the QuizDetails page */}
                          <Link to={`/Kanbas/Courses/${quiz.course}/Quizzes/${quiz._id}/Details`} id="wd-course-quiz-details-link"
                            className="list-group-item border border-0" style={{ padding: '0', marginBottom: '0.5rem' }}>
                            <span style={{ fontWeight: 'bold', fontSize: '24px' }}>{`${quiz.title}`}</span>
                          </Link>

                          <div style={{ marginTop: '0.5rem' }}>
                            {(() => {
                              const now = new Date();
                              const availDate = quiz.availDate ? new Date(quiz.availDate) : null;
                              const untilDate = quiz.untilDate ? new Date(quiz.untilDate) : null;

                              if (availDate && now < availDate) {
                                return (
                                  <>
                                    <span style={{ fontWeight: 'bold' }}>Not available until</span>{" "}
                                    {availDate.toLocaleDateString()} at 12:00am
                                  </>
                                );
                              }
                              if (availDate && untilDate && now > untilDate) {
                                return <span style={{ fontWeight: 'bold' }}>Closed</span>;
                              }
                              if (availDate && untilDate && now >= availDate && now <= untilDate) {
                                return <span style={{ fontWeight: 'bold' }}>Available</span>;
                              }
                              return <span style={{ fontWeight: 'bold' }}>No availability data</span>;
                            })()} |

                            <span style={{ fontWeight: 'bold' }}> Due</span>{" "}
                            {quiz.dueDate 
                              ? `${new Date(quiz.dueDate).toLocaleDateString()} at 11:59pm`
                              : "No due date"}{" "} | 

                            -/{quiz.points} pts | {/* If role===student, replace dash with score */}

                            {/* Total number of questions */} Questions
                          </div>
                        </span>
                      </div>
                      <ProtectedContent>
                        {/* Protected for faculty only */}
                        <QuizControlButtons 
                          deleteQuiz={(quizId) => removeQuiz(quizId)}
                          quizId={quiz._id}
                          editQuiz={() => dispatch(editQuiz(quiz._id))}
                          published={quiz.published}
                          togglePublishStatus={togglePublishStatus} 
                        />
                      </ProtectedContent>
                    </li>
                ))) : (
                  <ProtectedContent>
                    {/* Protected for faculty only */}
                    <li className="list-group-item p-3">
                      <Link to={`/Kanbas/Courses/${cid}/Quizzes/New/Editor`} id="wd-course-quiz-editor-link"
                        className="list-group-item border border-0" style={{ padding: '0', marginBottom: '0.5rem' }}>
                      </Link>
                    </li>
                  </ProtectedContent>
                )}
            </ul>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
}