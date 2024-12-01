import { configureStore } from "@reduxjs/toolkit";
import moduleReducer from "./Courses/Modules/reducer";
import accountReducer from "./Account/reducer";
import assignmentReducer from "./Courses/Assignments/reducer";
import dashboardReducer from "./Dashboard/reducer";
const store = configureStore({
    reducer: {
        moduleReducer,
        accountReducer,
        assignmentReducer,
        dashboardReducer,
    },
});
export default store;