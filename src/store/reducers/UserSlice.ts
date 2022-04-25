import { createSlice, PayloadAction, isAnyOf } from '@reduxjs/toolkit';

import { IUser } from '../../models/IUser';
import { fetchUsers } from './ActionCreators';

interface UserState {
  users: IUser[];
  isLoading: boolean;
  error?: string;
}

const initialState: UserState = {
  users: [],
  isLoading: false,
  error: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setError: (state, { payload }: PayloadAction<string>) => {
      state.error = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = '';
        state.users = payload;
      })
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addMatcher(
        isAnyOf(fetchUsers.rejected), (state, { payload }) => {
          state.isLoading = false;
          state.error = payload;
        }
      );
  }
});

export const {
  actions: {
    setError
  },
  reducer: userReducer
} = userSlice
