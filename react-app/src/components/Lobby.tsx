import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

type InputProps = {
  name: string;
  value: string;
  onChange: Function;
};

function Input({ name, value, onChange }: InputProps) {
  return (
    <React.Fragment>
      <InputContainer>
        <label htmlFor={name.split(" ").join()}>{name}:</label>
        <input
          name={name.split(" ").join()}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </InputContainer>
    </React.Fragment>
  );
}

function Lobby() {
  const [appId, setAppId] = useState("");
  const [channelName, setChannelName] = useState("");
  const [token, setToken] = useState("");
  return (
    <div>
      <Link to="/channel">Test Channel using temp token</Link>

      <br />
      <br />
      <hr />

      <p>Or use your own appId and channel settings</p>
      <Input name="App ID" value={appId} onChange={setAppId} />
      <Input
        name="Channel Name"
        value={channelName}
        onChange={setChannelName}
      />
      <Input name="Token" value={token} onChange={setToken} />

      <Link
        to={`/channel?appId=${appId}&channelName=${channelName}&token=${token}`}
      >
        Go
      </Link>
    </div>
  );
}

export default Lobby;

const InputContainer = styled.div`
  margin: 10px 0;

  label {
    margin-right: 10px;
  }
`;
