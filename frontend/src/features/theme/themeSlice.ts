import { ThemeStateType } from "@/types/theme.types";
import { createSlice } from "@reduxjs/toolkit";

// load saved theme from strorage if any
const savedTheme = localStorage.getItem('theme') as | 'light' | 'dark' | null;

const initialState: ThemeStateType = {
    mode: savedTheme || 'light'
}


const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        toggleTheme(state) {
            state.mode = (state.mode === 'light') ? 'dark' : 'light'
            localStorage.setItem('theme', state.mode);
        }
    }
});


export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;