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
      const stateCopy = state;
      stateCopy[key] = action.payload[key];
    },
    setId: (state, action) => {
      const stateCopy = state;
      stateCopy.idToChange = action.payload;
    },
  },
});

export const { setShow, setId } = modalsSlice.actions;

export default modalsSlice.reducer;
// store.dispatch(renameChannel({ id, changes: { removable, name } }))
