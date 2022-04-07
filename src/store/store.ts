import { combineReducers, configureStore } from "@reduxjs/toolkit";

import userReducer from './reducers/UserSlice'
import countReducer from './reducers/CountSlice'
import { postAPI } from "../services/PostService";


const rootReducer = combineReducers({
    userReducer,
    countReducer,
    [postAPI.reducerPath]: postAPI.reducer,
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => 
            getDefaultMiddleware().concat(postAPI.middleware),
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']