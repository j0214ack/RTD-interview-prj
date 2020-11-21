import AgoraRTC from "agora-rtc-sdk";
import store from "./store";
import { createStream, deleteStream } from "./store/slices/streamMetas";

function errorPrinter(scenario: string) {
  return (error: any) => {
    console.error(`${scenario} failed with`, error);
  };
}

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
          });
        },
        (error) => {
          this.setStream({
            streamId: "local",
            type: "local",
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
}

const streamManager = new StreamManager();
streamManager.createLocalStream();

const agoraClient = AgoraRTC.createClient({
  mode: "rtc",
  codec: "vp8",
});
agoraClient.init(
  "c8f5724dda654b68bdd42aa9f4063856",
  undefined,
  errorPrinter("agora client init")
);

const tempChannelInfo = {
  channelName: "test",
  token:
    "006c8f5724dda654b68bdd42aa9f4063856IADmksy5121JORxazvCEIO6MlTWImi1IOl5VSKYDZ0vguQx+f9gAAAAAEADGU1aHOB26XwEAAQA3Hbpf",
};

agoraClient.join(
  tempChannelInfo.token,
  tempChannelInfo.channelName,
  null,
  (uid) => {
    const localStream = streamManager.getStreamInfo("local")?.stream;
    if (localStream)
      agoraClient.publish(
        localStream,
        errorPrinter(
          `publish local stream to channel ${tempChannelInfo.channelName}`
        )
      );
  },
  errorPrinter(`join ${tempChannelInfo.channelName}`)
);

agoraClient.on("stream-added", (evt) => {
  agoraClient.subscribe(evt.stream, undefined, errorPrinter("subscribe"));
});

agoraClient.on("stream-subscribed", (evt) => {
  const stream = evt.stream;
  const streamId = String(stream.getId());
  streamManager.setStream({
    streamId,
    type: "remote",
    stream,
  });
});

function handleRemoveStream(evt: any) {
  const stream = evt.stream;
  const streamId = String(stream.getId());
  streamManager.removeStream({
    streamId,
    stream,
    type: "remote",
  });
}

agoraClient.on("stream-removed", handleRemoveStream);
agoraClient.on("peer-leave", handleRemoveStream);

export default streamManager;
