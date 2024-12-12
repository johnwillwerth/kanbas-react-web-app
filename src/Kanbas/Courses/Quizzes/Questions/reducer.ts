import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  questions: [],
};

const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    addQuestion: (state, { payload: question }) => {
      const newQuestion: any = {
        title: question.title,
        quiz: question.quiz,
        type: question.type,
        questionDescription: question.questionDescription,
        points: question.points,
        choices: question.choices,
        answer: question.answer,
        difficulty: question.difficulty,
      };
      state.questions = [...state.questions, newQuestion] as any;
    },

    deleteQuestion: (state, { payload: questionId }) => {
      state.questions = state.questions.filter((q: any) =>
        q._id !== questionId);
    },

    updateQuestion: (state, { payload: question }) => {
      state.questions = state.questions.map((q: any) =>
        q._id === question._id ? question : q) as any;
    },

    editQuestion: (state, { payload: questionId }) => {
      state.questions = state.questions.map((q: any) =>
        q._id === questionId ? { ...q, editing: true } : q) as any;
    },

    setQuestions: (state, { payload: questions }) => {
      state.questions = questions;
    },
  },
});
export const { addQuestion, deleteQuestion, updateQuestion, editQuestion, setQuestions } =
  questionsSlice.actions;
export default questionsSlice.reducer;