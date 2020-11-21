import React, { useEffect } from "react";
import StreamPlayer from "./StreamPlayer";
import { useSelector } from "react-redux";
import { RootState } from "../store/rootReducer";

function LocalStreamPlayer() {
  const localStreamMeta = useSelector((state: RootState) =>
    state.streamMetas.find((streamMeta) => streamMeta.streamId === "local")
  );

  if (localStreamMeta) return <StreamPlayer streamId="local" type="local" />;
  return null;
}

function Sidebar({ className }: { className?: string }) {
  return (
    <div className={className}>
      sidebar
      <LocalStreamPlayer />
    </div>
  );
}

export default Sidebar;
