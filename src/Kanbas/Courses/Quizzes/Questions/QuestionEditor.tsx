import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ReactQuill from "react-quill";
import { modules, formats } from "../quillConfig";
import * as coursesClient from "../../client";
import ProtectedContent from "../../../Account/ProtectedContent";
import { 
  addQuestion, 
  updateQuestion,
 } from './reducer';

export default function QuestionEditor() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { cid, qid, questionId } = useParams();
  const { questions } = useSelector((state: any) => state.questionReducer);
  const existingQuestion = questions.find((q: any) => q.quiz === qid && q._id === questionId);

  const [questionTitle, setQuestionTitle            ] = useState("");
  const [questionType, setQuestionType              ] = useState("Multiple Choice");
  const [questionDescription, setQuestionDescription] = useState("");
  const [questionPoints, setQuestionPoints          ] = useState(2);
  const [questionChoices, setQuestionChoices        ] = useState([""]);
  const [questionAnswer, setQuestionAnswer          ] = useState("");
  const [questionDifficulty, setQuestionDifficulty  ] = useState("Medium");

  const createNewQuestion = async () => {

    const newQuestion = await coursesClient.createQuestion(cid || "", qid || "", {
      title: questionTitle,
      quiz: qid,
      type: questionType,
      questionDescription: questionDescription,
      points: questionPoints,
      choices: questionChoices,
      answer: questionAnswer,
      difficulty: questionDifficulty,
    });

    setQuestionTitle(newQuestion.title);
    setQuestionType(newQuestion.type);
    setQuestionDescription(newQuestion.questionDescription);
    setQuestionPoints(newQuestion.points);
    setQuestionChoices(newQuestion.choices);
    setQuestionAnswer(newQuestion.answer);
    setQuestionDifficulty(newQuestion.difficulty);

    if (questionId) {
      // Update existing question
      dispatch(updateQuestion(existingQuestion));
    } else {
      // Add new question
      dispatch(addQuestion(newQuestion));
    }
    navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/Details`)
  };

  const handleDescriptionChange = (value: string) => {
    setQuestionDescription(value);
  };

  // Fetch quiz questions from server if they exist
  useEffect(() => {
    if (existingQuestion) {
      setQuestionTitle(existingQuestion.title || "");
      setQuestionType(existingQuestion.type || "Multiple Choice");
      setQuestionDescription(existingQuestion.questionDescription || "");
      setQuestionPoints(existingQuestion.points || 2);
      setQuestionChoices(existingQuestion.choices || [""]);
      setQuestionAnswer(existingQuestion.answer || "");
      setQuestionDifficulty(existingQuestion.difficulty || "Medium");
    }
  }, [existingQuestion]);

  return (
    <div id="wd-question-details-editor" className="container">

      {/* Question Title */}
      <div className="row">
        <div className="col-12">
          <input
            id="wd-title"
            className="form-control mb-3"
            readOnly={currentUser.role === "STUDENT"}
            value={questionTitle}
            placeholder="Unnamed Question"
            onChange={(e) => setQuestionTitle(e.target.value)}
            style={{ maxWidth: "500px" }}
          />
        </div>
      </div>

      <hr />

      {/* Question Difficulty, Type and Points */}
      <div className="row mb-3 align-items-baseline">
        <div className="col-md-3">
          <select
            id="questionDifficulty"
            className="form-select"
            value={questionDifficulty}
            onChange={(e) => setQuestionDifficulty(e.target.value)}
            style={{ maxWidth: "240px" }}
          >
            <option value="Easy"  >Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard"  >Hard</option>
          </select>
        </div>
        <div className="col-md-3">
          <select
            id="questionType"
            className="form-select"
            value={questionType}
            onChange={(e) => setQuestionType(e.target.value)}
            style={{ maxWidth: "240px" }}
          >
            <option value="Multiple Choice"  >Multiple Choice</option>
            <option value="True/False"       >True/False</option>
            <option value="Fill in the Blank">Fill in the Blank</option>
          </select>
        </div>
        <div className="col-md-3" style={{ display: 'flex', alignItems: 'center' }}>
          <label htmlFor="points" className="form-label" style={{ marginRight: '10px' }}>
            <strong>Points: </strong>
          </label>
          <input
            type="number"
            id="questionPoints"
            className="form-control"
            value={questionPoints}
            placeholder="2"
            onChange={(e) => setQuestionPoints(Number(e.target.value))}
            style={{ minWidth: "50px", maxWidth: "240px"  }}
          />
        </div>
      </div>

      <hr />

      {/* Question Description */}
      <div className="row">
        <div className="col-12">
          <label htmlFor="wd-question-text" className="form-label">
            <strong>Question:</strong>
          </label>
          <ReactQuill
            value={questionDescription}
            onChange={handleDescriptionChange}
            modules={modules}
            formats={formats}
            theme="snow"
            className="wd-quiz-details-editor"
            style={{ height: "300px" }}
          />
        </div>
      </div>

      <br /><br /><hr />   

      {/* Input: choices/answer (include pencil/trash icons on each)*/}
      {/* Button: + Add Another Answer */}
      <div className="row">
        <label htmlFor="wd-question-choices" className="form-label">
          <strong>Answer: </strong>{questionAnswer}
        </label>
        
        {/* Multiple Choice & Fill in the Blank Questions */}
        {(questionType === "Multiple Choice" || questionType === "Fill in the Blank") && (
          <div className="row mt-4">
            <label htmlFor="wd-question-choices" className="form-label">
              <strong>Choices:</strong>
            </label>
            <div className="col-12">
              {questionChoices.map((choice, index) => (
                <div key={index} className="input-group mb-2" style={{ maxWidth: "400px" }}>
                  <span className="input-group-text">
                    {questionAnswer === choice ? "✔️ Correct Answer" : "❓ Possible Answer"}
                  </span>
                  <input
                    type="text"
                    className={`form-control ${questionAnswer === choice ? "border-success" : ""}`}
                    value={choice}
                    placeholder={`Choice ${index + 1}`}
                    onChange={(e) => {
                      const newChoices = [...questionChoices];
                      newChoices[index] = e.target.value;
                      setQuestionChoices(newChoices);
                    }}
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setQuestionAnswer(choice)}
                    title="Mark as Correct Answer"
                  >
                    ✅
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={() => {
                      setQuestionChoices(questionChoices.filter((_, i) => i !== index));
                      if (choice === questionAnswer) setQuestionAnswer("");
                    }}
                    title="Delete Choice"
                  >
                    🗑️
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="btn btn-link text-danger"
                onClick={() => setQuestionChoices([...questionChoices, ""])}
              >
                + Add Another Answer
              </button>
            </div>
          </div>
        )}

        {/* True/False Question */}
        {questionType === "True/False" && (
          <div className="row mt-4">
            <label htmlFor="wd-question-choices" className="form-label">
              <strong>True/False Choices:</strong>
            </label>
            <div className="col-12">
              {["True", "False"].map((choice) => (
                <div key={choice} className="input-group mb-2" style={{ maxWidth: "400px" }}>
                  <span className="input-group-text">
                    {questionAnswer === choice ? "✔️ Correct Answer" : "❓ Possible Answer"}
                  </span>
                  <input
                    type="text"
                    className={`form-control ${questionAnswer === choice ? "border-success" : ""}`}
                    value={choice}
                    disabled // Prevent user from editing True/False values
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setQuestionAnswer(choice)}
                    title="Mark as Correct Answer"
                  >
                    ✅
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        
      </div>

      <ProtectedContent>
        {/* Cancel and Update Question Buttons */}
        <div className="row justify-content-end mt-4 g-2" style={{ maxWidth: "500px", margin: "0 auto" }}>
          <div className="col-auto">
            <button
              type="button"
              className="btn btn-outline-secondary me-2"
              onClick={() => navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/Details`)}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-danger me-2"
              onClick={createNewQuestion} // Save only
            >
              Save/Update Question
            </button>
          </div>
        </div>
      </ProtectedContent> 
    </div>
  )
  
}