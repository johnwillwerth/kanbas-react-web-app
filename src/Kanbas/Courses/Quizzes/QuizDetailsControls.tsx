import { useState } from 'react';
import QuizDetails from './QuizDetails';
import QuizQuestions from './Questions/QuizQuestions';

export default function QuizDetailsControls() {

  const [activeTab, setActiveTab] = useState("Details");

  return (
    <div id="wd-quiz-details">
      {/* Navigation Tabs */}
      <div id="wd-navigating-with-tabs">
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "Details" ? "active text-black" : "text-danger"}`}
              onClick={() => setActiveTab("Details")}
            >
              Details
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "Questions" ? "active text-black" : "text-danger"}`}
              onClick={() => setActiveTab("Questions")}
            >
              Questions
            </button>
          </li>
        </ul>
      </div>

      {/* Conditional Rendering Based on Active Tab */}
      <div id="wd-tab-content" className="mt-4">
        {activeTab === "Details" && <QuizDetails />}
        {activeTab === "Questions" && <QuizQuestions />}
      </div>
    </div>
  );
}