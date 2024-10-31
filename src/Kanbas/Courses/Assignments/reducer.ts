import { createSlice } from "@reduxjs/toolkit";
import { assignments } from "../../Database";

const initialState = {
  assignments, // store all assignments here
  currentAssignment: null, // store the assignment being edited
};

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
      addAssignment: (state, { payload: assignment }) => {
          const newAssignment = {
              _id: new Date().getTime().toString(),
              title: assignment.title,
              course: assignment.course,
          };
          state.assignments = [...state.assignments, newAssignment] as any;
      },
      deleteAssignment: (state, { payload: assignmentId }) => {
          state.assignments = state.assignments.filter(
              (a) => a._id !== assignmentId
          );
      },
      updateAssignment: (state, { payload: updatedAssignment }) => {
          state.assignments = state.assignments.map((a) =>
              a._id === updatedAssignment._id ? updatedAssignment : a
          ) as any;
      },
      editAssignment: (state, { payload: assignmentId }) => {
          state.currentAssignment = state.assignments.find(
              (a) => a._id === assignmentId
          ) || null as any;
      },
      clearCurrentAssignment: (state) => {
          state.currentAssignment = null;
      }
  },
});
export const {
  addAssignment,
  deleteAssignment,
  updateAssignment,
  editAssignment,
  clearCurrentAssignment,
} = assignmentsSlice.actions;
export default assignmentsSlice.reducer;