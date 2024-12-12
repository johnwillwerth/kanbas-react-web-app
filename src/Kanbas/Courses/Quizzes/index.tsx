import QuizList from "./QuizList";
import QuizControls from "./QuizControls";

export default function Quizzes() {

  return (
    <div id="wd-quizzes">
      <div className="container">
        <QuizControls />
        <QuizList />
      </div>      
    </div>
  );
}