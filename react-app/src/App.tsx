import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Sidebar from "./Sidebar";
import { RootState } from "./store/rootReducer";
import StreamPlayer from "./StreamPlayer";

function App() {
  const remoteStreams = useSelector((state: RootState) =>
    state.streamMetas.filter((meta) => meta.streamId !== "local")
  );
  return (
    <Container>
      <Main>
        {remoteStreams.map((streamMeta) => {
          return (
            <StreamPlayer
              key={streamMeta.streamId}
              type="remote"
              streamId={streamMeta.streamId}
            />
          );
        })}
      </Main>
      <SidebarStyled />
    </Container>
  );
}

export default App;


const Container = styled.div`
  display: flex;
  padding: 30px;
  width: 100%;
`;

const Main = styled.div`
  display: flex;
  flex: 3;
`;

const SidebarStyled = styled(Sidebar)`
  flex: 1;
`;