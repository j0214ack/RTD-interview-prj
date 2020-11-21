import AgoraRTC from "agora-rtc-sdk";
import store from "./store";
import {
  createStream,
  deleteStream,
  updateStream,
} from "./store/slices/streamMetas";
class StreamManager {
  streams: StreamInfo[];

  constructor() {
    this.streams = [];
  }

  createLocalStream() {
    const localStreamPromise = new Promise<StreamInfo>((resolve, reject) => {
      const localStream = AgoraRTC.createStream({
        audio: true,
        video: true,
      });

      localStream.init(
        () => {
          console.log("localstream init completed");
          this.setStream({
            streamId: "local",
            type: "local",
            stream: localStream,
            videoMuted: false,
            audioMuted: false,
          });
        },
        (error) => {
          this.setStream({
            streamId: "local",
            type: "local",
            videoMuted: false,
            audioMuted: false,
            error,
          });
          reject(error);
        }
      );
    });

    return localStreamPromise;
  }

  getStreamInfo(streamId: string) {
    return this.streams.find((stream) => stream.streamId === streamId) || null;
  }

  getStreamIndex(streamId: string) {
    return this.streams.findIndex((stream) => stream.streamId === streamId);
  }

  setStream(streamInfo: StreamInfo) {
    if (!streamInfo.streamId) return;
    const existingStreamIndex = this.getStreamIndex(streamInfo.streamId);
    if (existingStreamIndex !== -1) {
      console.error("streamId already exists");
      return;
    } else {
      this.streams.push(streamInfo);
      store.dispatch(
        createStream({
          streamId: streamInfo.streamId,
          type: streamInfo.type,
          audioMuted: streamInfo.audioMuted,
          videoMuted: streamInfo.videoMuted,
        })
      );
    }
  }

  toggleStreamVideo(streamId: string) {
    const streamInfo = this.getStreamInfo(streamId)
    if (streamInfo && streamInfo.stream) {
      const muted = streamInfo.videoMuted;
      if (muted) streamInfo.stream.unmuteVideo();
      else streamInfo.stream.muteVideo();

      streamInfo.videoMuted = !muted;
      store.dispatch(
        updateStream({
          streamId,
          videoMuted: !muted,
        })
      );
    }
  }

  toggleStreamAudio(streamId: string) {
    const streamInfo = this.getStreamInfo(streamId)
    if (streamInfo && streamInfo.stream) {
      const muted = streamInfo.audioMuted;
      if (muted) streamInfo.stream.unmuteAudio();
      else streamInfo.stream.muteAudio();

      streamInfo.audioMuted = !muted;
      store.dispatch(
        updateStream({
          streamId,
          audioMuted: !muted,
        })
      );
    }
  }

  removeStream(streamInfo: StreamInfo) {
    if (!streamInfo.streamId || !streamInfo.stream) return;
    const removeIndex = this.streams.findIndex(
      (stream) => stream.streamId === streamInfo.streamId
    );
    if (removeIndex !== -1) {
      this.streams.splice(removeIndex, 1);
    }
    streamInfo.stream.close();
    store.dispatch(deleteStream(streamInfo.streamId));
  }

  removeAllRemoteStreams() {
    this.streams
      .filter((streamInfo) => streamInfo.streamId !== "local")
      .forEach((streamInfo) => {
        this.removeStream(streamInfo);
      });
  }
}

const streamManager = new StreamManager();
streamManager.createLocalStream();

export default streamManager;
