import { createSlice } from '@reduxjs/toolkit';

type RemoteStreamMetasState = StreamMeta[];

const initialState: RemoteStreamMetasState = [];


const remoteStreamMetasSlice = createSlice({
  name: 'remoteStreamMetas',
  initialState,
  reducers: {
    createRemoteStream(state, action) {},
    deleteRemoteStream(state, action) {}
  }
})

const { actions, reducer } = remoteStreamMetasSlice;

export const { createRemoteStream, deleteRemoteStream } = actions;
export default reducer;