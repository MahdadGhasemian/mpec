import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState as AppStateIT } from "../types";

export interface AppState extends AppStateIT {
  item?: string | null;
}

const initialState: AppState = {
  courseContent: "",
  exampleContent: "",
  testQuestion: "",
  coursePattern: null,
  explanatoryChain: null,
  testSolution: null,
  loading: {
    coursePattern: false,
    example: false,
    test: false,
  },
  errors: {
    coursePattern: null,
    example: null,
    test: null,
  },
  item: null,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: (create) => ({
    setCourseContent: create.reducer((state, action: PayloadAction<string>) => {
      state.courseContent = action.payload;
    }),

    setExampleContent: create.reducer(
      (state, action: PayloadAction<string>) => {
        state.exampleContent = action.payload;
      }
    ),

    setTestQuestion: create.reducer((state, action: PayloadAction<string>) => {
      state.testQuestion = action.payload;
    }),

    setCoursePattern: create.reducer(
      (state, action: PayloadAction<AppState["coursePattern"]>) => {
        state.coursePattern = action.payload;
      }
    ),

    setExplanatoryChain: create.reducer(
      (state, action: PayloadAction<AppState["explanatoryChain"]>) => {
        state.explanatoryChain = action.payload;
      }
    ),

    setTestSolution: create.reducer(
      (state, action: PayloadAction<AppState["testSolution"]>) => {
        state.testSolution = action.payload;
      }
    ),

    setLoading: create.reducer(
      (
        state,
        action: PayloadAction<{
          section: keyof AppState["loading"];
          loading: boolean;
        }>
      ) => {
        state.loading[action.payload.section] = action.payload.loading;
      }
    ),

    setError: create.reducer(
      (
        state,
        action: PayloadAction<{
          section: keyof AppState["errors"];
          error: string | null;
        }>
      ) => {
        state.errors[action.payload.section] = action.payload.error;
      }
    ),

    resetState: create.reducer(() => initialState),
  }),
  selectors: {
    getCourseContent: (state) => state.courseContent,
    getExampleContent: (state) => state.exampleContent,
    getTestQuestion: (state) => state.testQuestion,
    getLoading: (state) => state.loading,
    getErrors: (state) => state.errors,
  },
});

export const {
  setCourseContent,
  setExampleContent,
  setTestQuestion,
  setCoursePattern,
  setExplanatoryChain,
  setTestSolution,
  setLoading,
  setError,
  resetState,
} = appSlice.actions;

export const {
  getCourseContent,
  getExampleContent,
  getTestQuestion,
  getLoading,
  getErrors,
} = appSlice.selectors;
