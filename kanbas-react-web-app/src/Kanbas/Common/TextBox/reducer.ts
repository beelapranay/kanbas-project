import { createSlice } from "@reduxjs/toolkit";
import { text } from "stream/consumers";

interface TextBox {
  text: string;
}

const initialState = {
  textBox: {
    text: "",
  },
};

const textBoxSlice = createSlice({
  name: "textBox",
  initialState,
  reducers: {
    setText: (state, action) => {
      state.textBox.text = action.payload;
    },
  },
});

export const { setText } = textBoxSlice.actions;
export default textBoxSlice.reducer;
