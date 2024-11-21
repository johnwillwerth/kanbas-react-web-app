import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface EnrollmentState {
  enrollments: string[]; // Assuming enrollments is an array of course IDs (strings)
}

const initialState: EnrollmentState = {
  enrollments: [], // Explicitly typed as an array of strings
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    setEnrollments: (state, action: { payload: string[] }) => {
      state.enrollments = action.payload || [];
    },
    updateEnrollments: (state, { payload: enrollment }) => {
      state.enrollments = state.enrollments.map((e: any) =>
        e._id === enrollment._id ? enrollment : e) as any;
    },
    addEnrollment: (state, action: { payload: string }) => {
      if (!state.enrollments.includes(action.payload)) {
        state.enrollments.push(action.payload); // Add the course ID to enrollments
      }
    },
    removeEnrollment: (state, action: { payload: string }) => {
      state.enrollments = state.enrollments.filter(id => id !== action.payload);
    },
  },
});

export const { setEnrollments, updateEnrollments, addEnrollment, removeEnrollment } =
  enrollmentsSlice.actions;

export default enrollmentsSlice.reducer;