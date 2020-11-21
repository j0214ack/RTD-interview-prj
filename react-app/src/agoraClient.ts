import AgoraRTC from "agora-rtc-sdk";
import streamManager from "./streamManager";
import errorPrinter from "./utils/errorPrinter";

const agoraClient = AgoraRTC.createClient({
  mode: "rtc",
  codec: "vp8",
});

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
    audioMuted: false,
    videoMuted: false,
  });
});

function handleRemoveStream(evt: any) {
  const stream = evt.stream;
  const streamId = String(stream.getId());
  agoraClient.unsubscribe(stream, errorPrinter("unsubscribe string"));
  streamManager.removeStream({
    streamId,
    stream,
    type: "remote",
    audioMuted: false,
    videoMuted: false,
  });
}

agoraClient.on("stream-removed", handleRemoveStream);
agoraClient.on("peer-leave", handleRemoveStream);

export default agoraClient;
