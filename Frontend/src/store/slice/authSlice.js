import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import toastr from 'toastr';
import { baseUrl } from '../../services/constant';


export const registerUser = createAsyncThunk(
  'user/signup',
  async (payload) => {
    try {
      const res = await axios({
        url: `${baseUrl}/user/signup`,
        method: 'post',
        data: payload,
      });
      const { data } = res;
      return data
    } catch (error) {
      const { data } = error.response;
      return data
    }
  }
);

export const loginUser = createAsyncThunk(
  'user/login',
  async (payload) => {
    try {
      const res = await axios({
        url: `${baseUrl}/user/login`,
        method: 'post',
        data: payload
      });
      const { data } = res;
      localStorage.setItem('token', data.data.token)
      return data
    } catch (error) {
      const { data } = error.response;
      return data
    }
  }
)

export const forgetPassword = createAsyncThunk(
  'user/forgetpassword',
  async (payload) => {
    try {
      const res = await axios({
        url: `${baseUrl}/user/find_user`,
        method: 'post',
        data: payload
      });
      const { data } = res;
      return data;
    } catch (error) {
      const { data } = error.response;
      return data
    }
  }
)

export const resetPassword = createAsyncThunk(
  'user/resetpassword',
  async (payload) => {
    try {
      const res = await axios({
        url: `${baseUrl}/user/reset_password`,
        method: 'post',
        data: payload
      });
      const { data } = res;
      return data;
    } catch (error) {
      const { data } = error.response;
      return data
    }
  }
)

export const setCurrentUser = createAsyncThunk(
  'user/currentuser',
  async (token) => {
    try {
      return token;
    } catch (error) {
      throw error;
    }
  }
)

export const logoutUser = createAsyncThunk(
  'user/logoutuser',
  async () => {
    try {
      localStorage.removeItem('token');
      toastr.success('GoodBye! come again soon.')
      window.location.href = '/login';
    } catch (error) {
      throw error;
    }
  }
)

const initialState = {
  user: {},
  isLoading: false,
  error: '',
  isSuccessful: false,
  isAuthenticated: false,
  isChangePassword: false,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: {
    [registerUser.pending] : (state, action) => {
      state.isLoading = true
    },
    [registerUser.fulfilled] : (state, action) => {
      if (action.payload.data) {
        state.isLoading = false;
        state.user = action.payload.data;
        state.isSuccessful = true;
        state.isAuthenticated = true;
      } else {
        state.isLoading = false;
        state.error = action.payload.message;
        state.isSuccessful = false;
        state.isAuthenticated = true;
      }
    },
    [registerUser.rejected] : (state, action) => {
      state.error = action.payload.message;
      state.isSuccessful = false;
    },
    // ----------------------------
    [loginUser.pending] : (state, action) => {
      state.isLoading = true;
    },
    [loginUser.pending] : (state, action) => {
      state.isLoading = true;
    },
    [loginUser.fulfilled] : (state, action) => {
      const { statusCode, message } = action.payload;
      if (statusCode === 200) {
        state.isLoading = false;
        state.isSuccessful = true;
        state.user = action.payload;
        state.isAuthenticated = true;
      } else {
        state.isLoading = false;
        state.isSuccessful = false;
        state.error = message;
        state.isAuthenticated = false;
      }
    },
    // ----------------------------
    [forgetPassword.pending] : (state, action) => {
      state.isLoading = true;
    },
    [forgetPassword.fulfilled] : (state, action) => {
      const { statusCode, message } = action.payload;
      if (statusCode === 200) {
        state.isLoading = false;
        state.isSuccessful = true;
        toastr.success(message)
      } else {
        state.isLoading = false;
        state.isSuccessful = false;
        toastr.success(message)
      }
    },
    // --------------------------
    [resetPassword.pending] : (state, action) => {
      state.isLoading = true;
    },
    [resetPassword.fulfilled] : (state, action) => {
      const { statusCode, message } = action.payload;
      if (statusCode === 200) {
        state.isLoading = false;
        state.isChangePassword = true;
        toastr.success(message)
      } else {
        state.isLoading = false;
        state.isChangePassword = false;
        toastr.success(message)
      }
    },
    [setCurrentUser.fulfilled]: (state, action) => {
      const token = action.payload;
      if (token !== null) {
        state.isAuthenticated = true
      } else {
        state.isAuthenticated = false;
      }
    }
  }
})

export default userSlice.reducer;