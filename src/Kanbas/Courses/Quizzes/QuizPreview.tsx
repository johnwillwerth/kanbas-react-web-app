import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useState } from 'react';



export default function QuizPreview() {

  const { cid, qid, questionId } = useParams();
  const { quizzes } = useSelector((state: any) => state.quizReducer);
  const { questions } = useSelector((state: any) => state.questionReducer);
  const existingQuiz = quizzes.find((q: any) => q.course === cid && q._id === qid);
  const existingQuestion = questions.find((q: any) => q.quiz === qid && q._id === questionId);


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

  const [questionDescription, setQuestionDescription] = useState("");
  const [questionPoints, setQuestionPoints          ] = useState(2);
  const [questionChoices, setQuestionChoices        ] = useState([""]);

  return (
    <div className="quiz-preview-container">
      <div className="header">
        <h2>{quiz.title}</h2>
      </div>
      <div className="preview-notice">
        This is a preview of the published version of the quiz
      </div>
      <div className="quiz-start-time">
        Started: {new Date().toLocaleString()}
      </div>
      <div className="quiz-question-preview-container">
        <div className="header">
          <h2>Quiz Instructions</h2>
        </div>
        <hr />
      </div>
      {/* 
          Quiz Instructions
          <hr/>
          question.title     question.points
          question.description
          question.choices
          Next button
          Quiz saved at time.now   Submit Quiz
          <br/>
          Keep Editing This Quiz
          Questions
          questions.map, question title*/}
    </div>
  )
  
}