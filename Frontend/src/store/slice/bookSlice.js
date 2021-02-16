import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import toastr from 'toastr';
import { useDispatch } from 'react-redux';
import { baseUrl } from '../../services/constant'

const GET_BOOKS = `
query {
  books {
    title
    description
    author {
      fullName
      email
    }
  }
}
`


export const getBooks = createAsyncThunk(
  'books/getBooks',
  async () => {
    const res = await axios({
      url: `${baseUrl}/graphql`,
      method: 'post',
      data: {
        query: GET_BOOKS
      }
    });
    const { data } = res.data;
    return data.books
  }
);

export const addBook = createAsyncThunk(
  'book/addBook',
  async (payload) => {
    const { title, description, token } = payload
    const res = await axios({
      url: `${baseUrl}/book/create`,
      method: 'post',
      data: { title, description },
      headers: {
        Authorization: token
      }
    });
    const { data } = res.data;
    return data;
  }
)

const initialState = {
  books: [],
  isLoading: false,
  addBookIsLoading: false,
}

const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {},
  extraReducers: {
    [getBooks.pending] : (state, action) => {
      state.isLoading = true
    },
    [getBooks.fulfilled] : (state, action) => {
      state.books = action.payload;
      state.isLoading = false
    },
    [addBook.pending]: (state, action) => {
      state.addBookIsLoading = true
    },
    [addBook.fulfilled]: (state, action) => {
      state.addBookIsLoading = false
      toastr.success('Success adding books')
    }
  }
})

export default bookSlice.reducer;
