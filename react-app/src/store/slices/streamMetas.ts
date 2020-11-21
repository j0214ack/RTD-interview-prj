import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type StreamMetasState = StreamMeta[];

const initialState: StreamMetasState = [];

const streamMetasSlice = createSlice({
  name: "streamMetas",
  initialState,
  reducers: {
    createStream(draft, action: PayloadAction<StreamMeta>) {
      draft.push({
        ...action.payload,
      });
    },
    updateStream(draft, action: PayloadAction<Partial<StreamMeta> & Pick<StreamMeta, 'streamId'>>) {
      const targetIndex = draft.findIndex(
        (streamMeta) => streamMeta.streamId === action.payload.streamId
      );

      if (targetIndex !== -1) {
        draft[targetIndex] = {
          ...draft[targetIndex],
          ...action.payload
        }
      }
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

export const { createStream, deleteStream, updateStream } = actions;
export default reducer;
