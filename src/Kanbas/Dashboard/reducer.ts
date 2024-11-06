import { createSlice } from "@reduxjs/toolkit";
import { courses, enrollments } from "../Database";

interface DashboardState {
  enrolledCourses: string[];  // Array of course IDs the user is enrolled in
  allCourses: any[];          // Array for all courses (define the type as needed)
  showCourses: boolean;       // Determines if courses should be displayed
  showAllCourses: boolean;    // Determines if all courses or only enrolled courses should be shown
}

const initialState: DashboardState = {
  enrolledCourses: [], 
  allCourses: [], 
  showCourses: true,          // Start hidden by default
  showAllCourses: false,       // Start by showing only enrolled courses
};

const dashboardSlice = createSlice({
    name: "dashboard",
    initialState,
    reducers: {
        // Enroll in a course
        enrollInCourse: (state, { payload }: { payload: string }) => {
            if (!state.enrolledCourses.includes(payload)) {
                state.enrolledCourses.push(payload);
            }
        },
        
        // Unenroll from a course
        unenrollFromCourse: (state, { payload }: { payload: string }) => {
            state.enrolledCourses = state.enrolledCourses.filter(courseId => courseId !== payload);
        },
        
        // Toggle visibility of courses
        toggleCourseDisplay: (state) => {
            // Only change `showCourses` to true on the first click
            if (!state.showCourses) {
                state.showCourses = true;
            } else {
                state.showAllCourses = !state.showAllCourses; // Toggle between all and enrolled courses
            }
        },

        // Reset course view to start fresh (optional)
        resetCourseView: (state) => {
            state.showCourses = false;
            state.showAllCourses = false;
        },
    },
});

export const { 
    enrollInCourse, 
    unenrollFromCourse, 
    toggleCourseDisplay,
    resetCourseView 
} = dashboardSlice.actions;

export default dashboardSlice.reducer;