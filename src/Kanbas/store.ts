import { configureStore } from "@reduxjs/toolkit";
import moduleReducer from "./Courses/Modules/reducer";
import accountReducer from "./Account/reducer";
import assignmentReducer from "./Courses/Assignments/reducer";
import dashboardReducer from "./Dashboard/reducer";
import enrollmentReducer from "./Courses/Enrollments/reducer";
const store = configureStore({
    reducer: {
        moduleReducer,
        accountReducer,
        assignmentReducer,
        dashboardReducer,
        enrollmentReducer,
    },
});
export default store;