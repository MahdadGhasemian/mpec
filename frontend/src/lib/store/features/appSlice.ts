import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AppState {
  id: string;
}

const initialState: AppState = {
  id: "",
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: (create) => ({
    setAppId: create.reducer((state, action: PayloadAction<AppState>) => {
      Object.assign(state, action.payload);
    }),
  }),
  selectors: {
    getAppId: (state: AppState) => state.id,
  },
});

export const { setAppId } = appSlice.actions;

export const { getAppId } = appSlice.selectors;
