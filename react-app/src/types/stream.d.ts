const STREAM_TYPES = ["remote", "local"] as const;
type StreamType = typeof STREAM_TYPES[number];

type StreamInfo = {
  streamId: string | null;
  type: StreamType;
  audioMuted: boolean;
  videoMuted: boolean;
  stream?: AgoraRTC.Stream;
  error?: any;
};

type StreamMeta = Pick<StreamInfo, "streamId" | "type">;
