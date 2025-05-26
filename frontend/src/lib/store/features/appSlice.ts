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
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: (create) => ({
    setConrseContent: create.reducer((state, action: PayloadAction<string>) => {
      state.courseContent = action.payload;
    }),
  }),
  selectors: {
    getConrseContent: (state: AppState) => state.courseContent,
  },
});

export const { setConrseContent } = appSlice.actions;

export const { getConrseContent } = appSlice.selectors;
