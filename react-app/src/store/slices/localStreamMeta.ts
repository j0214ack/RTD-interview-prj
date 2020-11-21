import { createSlice } from '@reduxjs/toolkit';

const initialState : StreamMeta = {
  id: null
}

const localStreamMetaSlice = createSlice({
  name: 'localStreamMeta',
  initialState,
  reducers: {
    createLocalStream(state, action) {},
    deleteLocalStream(state, action) {}
  }
})

const { actions, reducer } = localStreamMetaSlice;

export const { createLocalStream, deleteLocalStream } = actions;
export default reducer;