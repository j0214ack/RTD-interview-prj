import React, { useEffect, useState } from "react";
import streamManager from "./streamManager";

type StreamPlayerProps = {
  height?: number;
  width?: number;
} & StreamMeta;

function StreamPlayer({
  height = 165,
  width = 235,
  streamId,
  type,
}: StreamPlayerProps) {
  const [streamInfo, setStreamInfo] = useState<StreamInfo | null>(null);

  useEffect(() => {
    if (streamId) {
      setStreamInfo(streamManager.getStreamInfo(streamId));
    }
  }, [streamId]);

  useEffect(() => {
    if (streamId) streamInfo?.stream?.play(streamId);
  }, [streamInfo, streamId]);

  return (
    <div
      style={{
        height,
        width,
        transform: `rotateY(${type === "local" ? 0 : 180}deg)`,
      }}
      id={streamId || ""}
    >
      {streamInfo?.error && "something went wrong"}
      {!streamInfo?.error && !streamId && "preparing stream..."}
    </div>
  );
}

export default StreamPlayer;
