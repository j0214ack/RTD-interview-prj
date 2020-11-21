import React from "react";
import styled from "styled-components";
import Sidebar from "./components/Sidebar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Lobby from "./components/Lobby";
import Channel from "./components/Channel";

function App() {
  return (
    <Router>
      <Container>
        <Main>
          <Switch>
            <Route path="/channel">
              <Channel />
            </Route>
            <Route path="/">
              <Lobby />
            </Route>
          </Switch>
        </Main>
        <SidebarStyled />
      </Container>
    </Router>
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