import { createSlice } from '@reduxjs/toolkit';

const initialState = { id: '' };
const currentChannelSlice = createSlice({
  name: 'currentChannel',
  initialState,

  reducers: {
    setCurrentChannel: (state, action) => {
      const stateCopy = state;
      stateCopy.id = action;
      state = stateCopy;
    },
  },
});

export const { setCurrentChannel } = currentChannelSlice.actions;
export default currentChannelSlice.reducer;
