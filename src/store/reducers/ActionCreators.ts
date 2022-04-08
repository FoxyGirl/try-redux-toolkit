import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { IUser } from '../../models/IUser';

export const fetchUsers = createAsyncThunk('user/fetchAll', async (_, thunkAPI) => {
  try {
    const response = await axios.get<IUser[]>('https://jsonplaceholder.typicode.com/users');
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return thunkAPI.rejectWithValue(err.message);
    }

    return thunkAPI.rejectWithValue('Something went wrong :/');
  }
});
