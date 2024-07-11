


import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialStateType, Wordtype } from "../../vite-env";

const initialState: initialStateType = {

    loading: false,
    result: [],
    words: [],
    error: ""
}


export const rootReducer = createSlice({
    name: "rootReducer",
    initialState,
    reducers: {
        getWordsRequest: (state) => {
            state.loading = true
        },
        // to set the words values
        getWordsSuccess: (state, action: PayloadAction<Wordtype[]>) => {
            state.loading = false;
            state.words = action.payload

        },

        getWordsFail: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;

        },

        saveResult: (state, action: PayloadAction<string[]>) => {
            state.loading = false;
            state.result = action.payload;

        },

        clearState: (state) => {
            state.loading = false;
            state.words = [];
            state.result = [];
            state.error = "";
        },
    }

})

export const   {clearState,getWordsFail,getWordsRequest,getWordsSuccess,saveResult} = rootReducer.actions