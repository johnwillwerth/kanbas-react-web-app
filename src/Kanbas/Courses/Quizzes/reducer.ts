import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  quizzes: [],
};

const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    addQuiz: (state, { payload: quiz }) => {
      const newQuiz: any = {
        title: quiz.title,
        course: quiz.course,
        type: quiz.type,
        description: quiz.description,
        points: quiz.points,
        group: quiz.group,
        shuffle: quiz.shuffle,
        timeLimit: quiz.timeLimit,
        multipleAttempts: quiz.multipleAttempts,
        allowedAttempts: quiz.allowedAttempts,
        showAnswers: quiz.showAnswers,
        accessCode: quiz.accessCode,
        oneQuestion: quiz.oneQuestion,
        webcam: quiz.webcam,
        lockQuestions: quiz.lockQuestions,
        dueDate: quiz.dueDate,
        availDate: quiz.availDate,
        untilDate: quiz.untilDate,
      };
      state.quizzes = [...state.quizzes, newQuiz] as any;
    },

    deleteQuiz: (state, { payload: quizId }) => {
      state.quizzes = state.quizzes.filter((q: any) =>
        q._id !== quizId);
    },

    updateQuiz: (state, { payload: quiz }) => {
      state.quizzes = state.quizzes.map((q: any) =>
        q._id === quiz._id ? quiz : q) as any;
    },

    editQuiz: (state, { payload: quizId }) => {
      state.quizzes = state.quizzes.map((q: any) =>
        q._id === quizId ? { ...q, editing: true } : q) as any;
    },

    setQuizzes: (state, { payload: quizzes }) => {
      state.quizzes = quizzes;
    },
  },
});
export const { addQuiz, deleteQuiz, updateQuiz, editQuiz, setQuizzes } =
  quizzesSlice.actions;
export default quizzesSlice.reducer;