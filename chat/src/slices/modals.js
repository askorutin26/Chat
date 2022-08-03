import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  add: false,
  rename: false,
  remove: false,
  idToChange: '',
};
const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    setShow: (state, action) => {
      const key = Object.keys(action.payload);
      state[key] = action.payload[key];
    },
    setId: (state, action) => {
      state.idToChange = action.payload;
    },
  },
});

export const { setShow, setId } = modalsSlice.actions;

export default modalsSlice.reducer;
// store.dispatch(renameChannel({ id, changes: { removable, name } }))
