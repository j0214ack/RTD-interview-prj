import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type StreamMetasState = StreamMeta[];

const initialState: StreamMetasState = [];

const streamMetasSlice = createSlice({
  name: "streamMetas",
  initialState,
  reducers: {
    createStream(draft, action: PayloadAction<StreamMeta>) {
      console.log(action);
      draft.push({
        streamId: action.payload.streamId,
        type: action.payload.type,
      });
    },
    deleteStream(draft, action: PayloadAction<string>) {
      console.log("delete local stream");
      draft.splice(
        draft.findIndex((streamMeta) => streamMeta.streamId === action.payload),
        1
      );
    },
  },
});

const { actions, reducer } = streamMetasSlice;

export const { createStream, deleteStream } = actions;
export default reducer;
