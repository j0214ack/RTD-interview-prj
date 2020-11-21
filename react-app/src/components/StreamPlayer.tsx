import React, { useEffect, useState } from "react";
import styled from "styled-components";
import streamManager from "../streamManager";


import mic from "../assets/mic.svg";
import micOff from "../assets/mic_off.svg";
import videocam from "../assets/videocam.svg";
import videocamOff from "../assets/videocam_off.svg";
import visibility from "../assets/visibility.svg";
import visibilityOff from "../assets/visibility_off.svg";
import volume from "../assets/volume.svg";
import volumeOff from "../assets/volume_off.svg";

type StreamPlayerProps = {
  height?: number;
  width?: number;
  className?: string;
} & StreamMeta;

function StreamPlayer({
  height = 165,
  width = 235,
  className,
  streamId,
  type,
  ...rest
}: StreamPlayerProps) {
  const [streamInfo, setStreamInfo] = useState<StreamInfo | null>(null);

  useEffect(() => {
    if (streamId) {
      setStreamInfo(streamManager.getStreamInfo(streamId));
    }
  }, [streamId]);

  useEffect(() => {
    if (streamId && streamInfo && streamInfo.stream) {
      streamInfo.stream.play(streamId);
    }
  }, [streamInfo, streamId]);

  return (
    <Container>
      <div
        className={className}
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
      <Controls streamId={streamId} type={type} {...rest} />
    </Container>
  );
}

export default StreamPlayer;


function Controls({ streamId, type, audioMuted, videoMuted }: StreamMeta) {
  let videoImgSrc;
  if (type === "local") videoImgSrc = videoMuted ? videocamOff : videocam;
  else videoImgSrc = videoMuted ? visibilityOff : visibility;

  let audioImgSrc;
  if (type === "local") audioImgSrc = audioMuted ? micOff : mic;
  else audioImgSrc = audioMuted ? volumeOff : volume;

  function toggleVideo() {
    if (streamId) streamManager.toggleStreamVideo(streamId);
  }

  function toggleAudio() {
    if (streamId) streamManager.toggleStreamAudio(streamId);
  }

  return (
    <ControlsContainer>
      <img src={videoImgSrc} alt="Toggle Video Mute" onClick={toggleVideo} />
      <img src={audioImgSrc} alt="Toggle Audio Mute" onClick={toggleAudio} />
    </ControlsContainer>
  );
}

const Container = styled.div``;
const ControlsContainer = styled.div`
  img {
    height: 24px;
    width: 24px;
    cursor: pointer;
    :hover {
      opacity: 0.5;
    }
  }
`;