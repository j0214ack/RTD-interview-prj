import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/rootReducer";
import StreamPlayer from "./StreamPlayer";
import agoraClient from "../agoraClient";
import streamManager from "../streamManager";
import errorPrinter from "../utils/errorPrinter";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

const tempChannelInfo = {
  channelName: "test",
  token:
    "006c8f5724dda654b68bdd42aa9f4063856IAChxVhalIRz1V2QyiWdSIzsrmsXvLJn+z8JYLI4JZ6Nzgx+f9gAAAAAEADGU1aH6za6XwEAAQDrNrpf",
};

function useSearchParam(paramName: string, fallbackValue: any) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  let value;
  if (searchParams.has(paramName)) {
    value = searchParams.get("appId");
  }

  return value || fallbackValue;
}

function Channel() {
  const remoteStreams = useSelector((state: RootState) =>
    state.streamMetas.filter((meta) => meta.streamId !== "local")
  );

  const appId = useSearchParam("appId", "c8f5724dda654b68bdd42aa9f4063856");
  const token = useSearchParam("token", tempChannelInfo.token);
  const channelName = useSearchParam(
    "channelName",
    tempChannelInfo.channelName
  );

  console.log({
    appId,
    token,
    channelName,
  });

  useEffect(() => {
    agoraClient.init(
      "c8f5724dda654b68bdd42aa9f4063856",
      undefined,
      errorPrinter("agora client init")
    );
    console.log("agora inited");

    agoraClient.join(
      token,
      channelName,
      null,
      (uid) => {
        const localStream = streamManager.getStreamInfo("local")?.stream;
        if (localStream)
          agoraClient.publish(
            localStream,
            errorPrinter(`publish local stream to channel ${channelName}`)
          );
      },
      errorPrinter(`join ${channelName}`)
    );
    console.log("agora channel joined");

    return () => {
      agoraClient.leave();
      streamManager.removeAllRemoteStreams();
      console.log("agora channel left");
    };
  }, [appId, token, channelName]);

  return (
    <React.Fragment>
      <Link to="/">Back to Lobby</Link>
      {remoteStreams.map((streamMeta) => (
        <StreamPlayerStyled key={streamMeta.streamId} {...streamMeta} />
      ))}
    </React.Fragment>
  );
}

export default Channel;

const StreamPlayerStyled = styled(StreamPlayer)`
  margin: 10px;
`;
