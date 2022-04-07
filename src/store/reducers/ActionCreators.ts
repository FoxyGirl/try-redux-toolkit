import axios from 'axios';

import { AppDispatch } from "../store";
import { IUser } from "../../models/IUser";
import { userSlice } from './UserSlice';

const {usersFetching, usersFetchingError, usersFetchingSuccess} = userSlice.actions;

// Classic way for getting data scenarios with Thunk
export const fetchUsers = () => async (dispatch: AppDispatch) =>{
    try {
        dispatch(usersFetching());
        const response = await axios.get<IUser[]>('https://jsonplaceholder.typicode.com/users');
        dispatch(usersFetchingSuccess(response.data));
    } catch(error) {
        // const typedError = error as Error;
        // dispatch(usersFetchingError(typedError?.message));

        if (axios.isAxiosError(error)) {
            dispatch(usersFetchingError(error.message));
        }
    }
};
