import { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ReactQuill from "react-quill";
import { modules, formats } from "./quillConfig";
import * as coursesClient from "../client";
import { addQuiz, updateQuiz } from './reducer';
import ProtectedContent from '../../Account/ProtectedContent';

export default function QuizDetailsEditor() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { cid, qid } = useParams();
  const { quizzes } = useSelector((state: any) => state.quizReducer);
  const existingQuiz = quizzes.find((q: any) => q.course === cid && q._id === qid);

  const [quizTitle, setQuizTitle                      ] = useState("");
  const [quizType, setQuizType                        ] = useState("Graded Quiz");
  const [quizDescription, setQuizDescription          ] = useState("");
  const [quizPoints, setQuizPoints                    ] = useState(0);
  const [quizGroup, setQuizGroup                      ] = useState("Quizzes");
  const [quizShuffle, setQuizShuffle                  ] = useState(true);
  const [quizTimeLimit, setQuizTimeLimit              ] = useState(20);
  const [quizMultipleAttempts, setQuizMultipleAttempts] = useState(false);
  const [quizAllowedAttempts, setQuizAllowedAttempts  ] = useState(1);
  const [quizShowAnswers, setQuizShowAnswers          ] = useState("After Due Date");
  const [quizAccessCode, setQuizAccessCode            ] = useState("");
  const [quizOneQuestion, setQuizOneQuestion          ] = useState(true);
  const [quizWebcam, setQuizWebcam                    ] = useState(false);
  const [quizLockQuestions, setQuizLockQuestions      ] = useState(false);
  const [quizPublished, setQuizPublished              ] = useState(false);
  const [quizDueDate, setQuizDueDate                  ] = useState<Date | null>(null);
  const [quizAvailDate, setQuizAvailDate              ] = useState<Date | null>(null);
  const [quizUntilDate, setQuizUntilDate              ] = useState<Date | null>(null);

  const createQuiz = async (isPublishing: boolean) => {
    const newQuiz = await coursesClient.createQuiz(cid || "", {
      title: quizTitle,
      course: cid,
      type: quizType,
      description: quizDescription,
      points: quizPoints,
      group: quizGroup,
      shuffle: quizShuffle,
      timeLimit: quizTimeLimit,
      multipleAttempts: quizMultipleAttempts,
      allowedAttempts: quizAllowedAttempts,
      showAnswers: quizShowAnswers,
      accessCode: quizAccessCode,
      oneQuestion: quizOneQuestion,
      webcam: quizWebcam,
      lockQuestions: quizLockQuestions,
      published: isPublishing,
      dueDate: quizDueDate,
      availDate: quizAvailDate,
      untilDate: quizUntilDate,
    });

    setQuizTitle(newQuiz.title);
    setQuizType(newQuiz.type);
    setQuizDescription(newQuiz.description);
    setQuizPoints(newQuiz.points);
    setQuizGroup(newQuiz.group);
    setQuizShuffle(newQuiz.shuffle);
    setQuizTimeLimit(newQuiz.timeLimit);
    setQuizMultipleAttempts(newQuiz.multipleAttempts);
    setQuizAllowedAttempts(newQuiz.allowedAttempts);
    setQuizShowAnswers(newQuiz.showAnswers);
    setQuizAccessCode(newQuiz.accessCode);
    setQuizOneQuestion(newQuiz.oneQuestion);
    setQuizWebcam(newQuiz.webcam);
    setQuizLockQuestions(newQuiz.lockQuestions);
    setQuizPublished(newQuiz.published);
    setQuizDueDate(newQuiz.dueDate);
    setQuizAvailDate(newQuiz.availDate);
    setQuizUntilDate(newQuiz.untilDate);

    if (qid) {
      // Update existing quiz
      dispatch(updateQuiz(newQuiz));
    } else {
      // Add new quiz
      dispatch(addQuiz(newQuiz));
    }

    // Navigate based on action
    if (isPublishing) {
      navigate(`/Kanbas/Courses/${cid}/Quizzes`);
    } else {
      navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/Details`);
    }
  };

  const handleDescriptionChange = (value: string) => {
    setQuizDescription(value);
  };

  // Fetch course quiz from server if it exists
  useEffect(() => {
    if (existingQuiz) {
      setQuizTitle(existingQuiz.title || "");
      setQuizType(existingQuiz.type || "Graded Quiz");
      setQuizDescription(existingQuiz.description || "");
      setQuizPoints(existingQuiz.points || 0);
      setQuizGroup(existingQuiz.group || "Quizzes");
      setQuizShuffle(existingQuiz.shuffle || true);
      setQuizTimeLimit(existingQuiz.timeLimit || 20);
      setQuizMultipleAttempts(existingQuiz.multipleAttempts || false);
      setQuizAllowedAttempts(existingQuiz.allowedAttempts || 1);
      setQuizShowAnswers(existingQuiz.showAnswers || "After Due Date");
      setQuizAccessCode(existingQuiz.accessCode || "");
      setQuizOneQuestion(existingQuiz.oneQuestion || true);
      setQuizWebcam(existingQuiz.webcam || false);
      setQuizLockQuestions(existingQuiz.lockQuestions || false);
      setQuizPublished(existingQuiz.published || false);
      setQuizDueDate(existingQuiz.dueDate ? new Date(existingQuiz.dueDate) : null);
      setQuizAvailDate(existingQuiz.availDate ? new Date(existingQuiz.availDate) : null);
      setQuizUntilDate(existingQuiz.untilDate ? new Date(existingQuiz.untilDate) : null);
    }
  }, [existingQuiz]);

  return (
    <div id="wd-quiz-details-editor" className="container">
      {/* Quiz Title */}
      <div className="row">
        <div className="col-12">
          <input
            id="wd-title"
            className="form-control mb-3"
            readOnly={currentUser.role === "STUDENT"}
            value={quizTitle}
            placeholder="Unnamed Quiz"
            onChange={(e) => setQuizTitle(e.target.value)}
            style={{ maxWidth: "500px" }}
          />
        </div>
      </div>

      {/* Description Field */}
      <div className="row">
        <div className="col-12">
          <label htmlFor="wd-description" className="form-label">
            <strong>Quiz Instructions:</strong>
          </label>
          <ReactQuill
            value={quizDescription}
            onChange={handleDescriptionChange}
            modules={modules}
            formats={formats}
            theme="snow"
            className="wd-quiz-details-editor"
            style={{ height: "300px" }}
          />
        </div>
      </div>

      <br/><br/><br/>

      {/* Quiz Type, Points and Assignment Group */}
      <div className="row mb-3 align-items-baseline">
        <div className="col-md-3">
          <label htmlFor="quizType" className="form-label">
            <strong>Quiz Type</strong>
          </label>
          <select
            id="quizType"
            className="form-select"
            value={quizType}
            onChange={(e) => setQuizType(e.target.value)}
            style={{ maxWidth: "240px" }}
          >
            <option value="Graded Quiz"    >Graded Quiz</option>
            <option value="Practice Quiz"  >Practice Quiz</option>
            <option value="Graded Survey"  >Graded Survey</option>
            <option value="Ungraded Survey">Ungraded Survey</option>
          </select>
        </div>
        <div className="col-md-3">
          <label htmlFor="points" className="form-label">
            <strong>Points:</strong>
          </label>
          <input
            type="number"
            className="form-control"
            id="points"
            value={quizPoints}
            placeholder="0"
            onChange={(e) => setQuizPoints(Number(e.target.value))}
            style={{ maxWidth: "240px" }}
          />
        </div>
        <div className="col-md-3">
          <label htmlFor="assignmentGroup" className="form-label">
            <strong>Assignment Group</strong>
          </label>
          <select
            id="assignmentGroup"
            className="form-select"
            value={quizGroup}
            onChange={(e) => setQuizGroup(e.target.value)}
            style={{ maxWidth: "240px" }}
          >
            <option value="Quizzes"    >Quizzes</option>
            <option value="Exams"      >Exams</option>
            <option value="Assignments">Assignments</option>
            <option value="Project"    >Project</option>
          </select>
        </div>
      </div>

      {/* Requirements */}
      <div className="row mb-3 align-items-baseline">
        <div className="col-md-3">
          <label htmlFor="accessCode" className="form-label">
            <strong>Access Code</strong>
          </label>
          <input
            id="wd-code"
            className="form-control"
            value={quizAccessCode}
            onChange={(e) => setQuizAccessCode(e.target.value)}
            placeholder="Enter code"
            style={{ maxWidth: "240px" }}
          />
        </div>
        <div className="col-md-3">
          <label htmlFor="timeLimit" className="form-label">
            <strong>Time Limit (minutes):</strong>
          </label>
          <input
            type="number"
            className="form-control"
            id="timeLimit"
            value={quizTimeLimit}
            onChange={(e) => setQuizTimeLimit(Number(e.target.value))}
            placeholder="20"
            style={{ maxWidth: "240px" }}
          />
        </div>
        <div className="col-md-3">
          <label htmlFor="showAnswers" className="form-label">
            <strong>Show Answers</strong>
          </label>
          <select
            id="showAnswers"
            className="form-select"
            value={quizShowAnswers}
            onChange={(e) => setQuizShowAnswers(e.target.value)}
            style={{ maxWidth: "240px" }}
          >
            <option value="Immediately"   >Immediately</option>
            <option value="After Due Date">After Due Date</option>
            <option value="Never"         >Never</option>
          </select>
        </div>
      </div>

      {/* Availability */}
      <div className="row mb-3 align-items-baseline">
        <div className="col-md-3">
          <label htmlFor="wd-due-date" className="form-label">
            <strong>Due Date</strong>
          </label>
          <input
            type="date"
            id="wd-due-date"
            className="form-control"
            readOnly={currentUser.role === "STUDENT"} 
            value={quizDueDate instanceof Date && !isNaN(quizDueDate.getTime())
              ? quizDueDate.toISOString().split("T")[0]
              : ""}
            onChange={(e) => setQuizDueDate(new Date(e.target.value))}
            style={{ maxWidth: "240px" }}
          />
        </div>
        <div className="col-md-3">
          <label htmlFor="wd-available-from" className="form-label">
            <strong>Available From</strong>
          </label>
          <input
            type="date"
            id="wd-available-from"
            className="form-control"
            readOnly={currentUser.role === "STUDENT"} 
            value={quizAvailDate instanceof Date && !isNaN(quizAvailDate.getTime())
              ? quizAvailDate.toISOString().split("T")[0]
              : ""}
            onChange={(e) => setQuizAvailDate(new Date(e.target.value))}
            style={{ maxWidth: "240px" }}
          />
        </div>
        <div className="col-md-3">
          <label htmlFor="wd-available-until" className="form-label">
            <strong>Available Until</strong>
          </label>
          <input
            type="date"
            id="wd-available-until"
            className="form-control"
            readOnly={currentUser.role === "STUDENT"} 
            value={quizUntilDate instanceof Date && !isNaN(quizUntilDate.getTime())
              ? quizUntilDate.toISOString().split("T")[0]
              : ""}
            onChange={(e) => setQuizUntilDate(new Date(e.target.value))}
            style={{ maxWidth: "240px" }}
          />
        </div>
      </div>

      {/* Options */}
      <div className="mb-3">
        <label className="form-label"><strong>Options</strong></label>
        <div className="form-check">
          <input
            type="checkbox"
            id="shuffle"
            className="form-check-input"
            checked={quizShuffle}
            onChange={(e) => setQuizShuffle(e.target.checked)}
          />
          <label htmlFor="shuffle" className="form-check-label">Shuffle Answers</label>
        </div>
        <div className="form-check">
          <input
            type="checkbox"
            id="multipleAttempts"
            className="form-check-input"
            checked={quizMultipleAttempts}
            onChange={(e) => setQuizMultipleAttempts(e.target.checked)}
          />
          <label htmlFor="multipleAttempts" className="form-check-label">Allow Multiple Attempts</label>
        </div>
        <div className="form-check">
          <input
            type="checkbox"
            id="oneQuestion"
            className="form-check-input"
            checked={quizOneQuestion}
            onChange={(e) => setQuizOneQuestion(e.target.checked)}
          />
          <label htmlFor="oneQuestion" className="form-check-label">One Question at a Time</label>
        </div>
        <div className="form-check">
          <input
            type="checkbox"
            id="webcam"
            className="form-check-input"
            checked={quizWebcam}
            onChange={(e) => setQuizWebcam(e.target.checked)}
          />
          <label htmlFor="webcam" className="form-check-label">Webcam</label>
        </div>
        <div className="form-check">
          <input
            type="checkbox"
            id="lockQuestions"
            className="form-check-input"
            checked={quizLockQuestions}
            onChange={(e) => setQuizLockQuestions(e.target.checked)}
          />
          <label htmlFor="lockQuestions" className="form-check-label">Lock Questions After Answering</label>
        </div>
      </div>

      <ProtectedContent>
        {/* Save & Publish, Save and Cancel Buttons */}
        <div className="row justify-content-end mt-4 g-2" style={{ maxWidth: "500px", margin: "0 auto" }}>
          <div className="col-auto">
            <button
              type="button"
              className="btn btn-outline-secondary me-2"
              onClick={() => navigate(`/Kanbas/Courses/${cid}/Quizzes`)}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-danger me-2"
              onClick={() => createQuiz(false)} // Save only
            >
              Save
            </button>
            <button
              type="button"
              className="btn btn-success"
              onClick={() => createQuiz(true)} // Save and publish
            >
              Save & Publish
            </button>
          </div>
        </div>
      </ProtectedContent>      
      
    </div>
  );
}
