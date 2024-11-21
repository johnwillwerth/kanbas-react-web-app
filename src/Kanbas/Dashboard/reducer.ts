import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DashboardState {
  courses: any[]; // Replace `any` with a specific course type if you have one
  enrolledCourses: string[]; // Array of course IDs
  showCourses: boolean;
  showAllCourses: boolean;
}

const initialState: DashboardState = {
  courses: [],
  enrolledCourses: [],
  showCourses: false,
  showAllCourses: false,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    // Enroll in a course
    enrollInCourse: (state, action: PayloadAction<string>) => {
      if (!state.enrolledCourses.includes(action.payload)) {
        state.enrolledCourses.push(action.payload);
      }
    },

    // Unenroll from a course
    unenrollFromCourse: (state, action: PayloadAction<string>) => {
      state.enrolledCourses = state.enrolledCourses.filter(
        (id) => id !== action.payload
      );
    },

    // Toggle to display courses or not
    toggleCourseDisplay: (state) => {
      state.showCourses = !state.showCourses;
      if (!state.showCourses) state.showAllCourses = false; // Reset when hiding
    },

    // Toggle between all and enrolled courses
    toggleShowAllCourses: (state) => {
      state.showAllCourses = !state.showAllCourses;
    },

    // Reset course view to start fresh (optional)
    resetCourseView: (state) => {
      state.showCourses = false;
      state.showAllCourses = false;
    },

    // Load all courses initially (assuming they come from the backend)
    setCourses: (state, action: PayloadAction<any[]>) => {
      state.courses = action.payload;
    },
  },
});

export const {
  enrollInCourse,
  unenrollFromCourse,
  toggleCourseDisplay,
  toggleShowAllCourses,
  resetCourseView,
  setCourses,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
