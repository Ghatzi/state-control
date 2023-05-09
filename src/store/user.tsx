import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: [
    {
      id: 0,
      username: '',
      password: '',
      firstName: '',
      lastName: '',
      isAdmin: false,
      createdDate: '',
      updatedDate: ''
    }
  ]
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    deleteUser: (state, action) => ({
      ...state,
      user: state.user.filter(n => n.id !== action.payload)
    })
  }
});

// Action creators are generated for each case reducer function
export const { deleteUser } = usersSlice.actions;

export default usersSlice.reducer;
