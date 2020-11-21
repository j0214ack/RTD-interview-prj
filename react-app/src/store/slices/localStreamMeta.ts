import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: StreamMeta = {
  streamId: null,
  type: "local",
};

const localStreamMetaSlice = createSlice({
  name: "localStreamMeta",
  initialState,
  reducers: {
    createLocalStream(state, action: PayloadAction<StreamMeta>) {
      console.log(action);
      state.streamId = action.payload.streamId;
      state.type = action.payload.type;
    },
    deleteLocalStream(state, action: PayloadAction<undefined>) {
      console.log('delete local stream')
      state = initialState;
    },
  },
});

const { actions, reducer } = localStreamMetaSlice;

export const { createLocalStream, deleteLocalStream } = actions;
export default reducer;