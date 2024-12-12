import { configureStore } from "@reduxjs/toolkit";
import moduleReducer from "./Courses/Modules/reducer";
import accountReducer from "./Account/reducer";
import assignmentReducer from "./Courses/Assignments/reducer";
import quizReducer from "./Courses/Quizzes/reducer";
import questionReducer from "./Courses/Quizzes/Questions/reducer";

const store = configureStore({
    reducer: {
        moduleReducer,
        accountReducer,
        assignmentReducer,
        quizReducer,
        questionReducer,
    },
});
export default store;