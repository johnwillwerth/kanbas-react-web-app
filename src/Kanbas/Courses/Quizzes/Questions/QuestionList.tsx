import { useEffect } from 'react';
import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaPlus } from "react-icons/fa6";
import ProtectedContent from '../../../Account/ProtectedContent';
import QuestionControlButtons from './QuestionControlButtons';
import * as coursesClient from "../../client";
import * as questionsClient from "./client";
import {
  editQuestion,
  deleteQuestion,
  setQuestions,
} from "./reducer";

export default function QuestionList() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cid, qid } = useParams();
  const { questions } = useSelector((state: any) => state.questionReducer);

  const fetchQuestions = async () => {
    const questions = await coursesClient.findQuestionsForQuiz(cid || "", qid || "");
    dispatch(setQuestions(questions));
  };

  const removeQuestion = async (questionId: string) => {
    const status = await questionsClient.deleteQuestion(questionId);
    dispatch(deleteQuestion(questionId));
  }

  useEffect(() => {
    fetchQuestions();
  }, [qid]);

  return (
    <div className="question-details-container">
      <div className="header">
        <button 
          className="btn btn-secondary btn-lg"
          type="button"
          id="edit-button"
          onClick={() => navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/Questions/New/Editor`)}
        >
          <FaPlus />
          &nbsp; New Question
        </button>
      </div>
      <hr />

      <div className="quiz-questions">
        <div className="container">
          <h2>Questions</h2>
          <ul className="quiz-questions">
            {questions.length > 0 ? (
              questions.map((question: any, index: number) => (
                <li key={question._id} className="wd-question list-group-item p-3 ps-1 border-gray">
                  <div className="d-flex flex-column">
                    <h6 className="d-flex align-items-start">
                      <span className="me-0" style={{ width: "30px" }}>{index + 1}.</span> {/* Index */}
                      <span dangerouslySetInnerHTML={{ __html: question.questionDescription }} /> {/* Render HTML content */}
                      <div className="question-actions d-flex ms-2"> {/* Add margin-left to create space */}
                        <ProtectedContent>
                          <QuestionControlButtons
                            deleteQuestion={(questionId) => removeQuestion(questionId)}
                            questionId={question._id}
                            editQuestion={() => dispatch(editQuestion(question._id))}
                          />
                        </ProtectedContent>
                      </div>
                    </h6>
                    {question.choices?.length > 0 && (
                      <ul className="choices-list ps-4">
                        {question.choices.map((choice: string, choiceIndex: number) => (
                          <li key={choiceIndex}>
                            {choice}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </li>
              ))
            ) : (
              <ProtectedContent>
                <li className="list-group-item p-3">
                  <Link to={`/Kanbas/Courses/${cid}/Quizzes/${qid}/Questions/New/Editor`} 
                        id="wd-course-question-editor-link"
                        className="list-group-item border border-0" 
                        style={{ padding: '0', marginBottom: '0.5rem' }}>
                    No questions found. Add a new question.
                  </Link>
                </li>
              </ProtectedContent>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

