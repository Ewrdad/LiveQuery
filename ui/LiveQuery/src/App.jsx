import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { StartUpScreen } from "./startupScreen/startupscreen";
import { Player } from "./Player/Player";
import { SessionMaster } from "./SessionMaster/SessionMaster";
import { io } from "socket.io-client";
import { useState } from "react";

/**
 * MARK: App
 * @description The main app component for the application
 * @returns {JSX.Element} App component
 * @example <App />
 *
 * @listens connect Emits a welcome message to the server
 * @listens UserJoined Logs a message when a user joins the session
 * @emit Welcome Emits a welcome message to the server
 */
function App() {
  const [SessionCode, setSessionCode] = useState("");
  const Server = io("ws://localhost:3002");

  Server.on("connect", () => {
    console.log("Connected to server");
    Server.emit("Welcome", { message: "Hello from client", Server: Server });
  });

  Server.on("UserJoined", (message) => {
    console.log(message);
  });

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route
          path="*"
          element={
            <StartUpScreen Server={Server} setSessionCode={setSessionCode} />
          }
        />
        <Route
          path="dashboard"
          element={<SessionMaster Server={Server} SessionCode={SessionCode} />}
        />
        <Route
          path="player"
          element={<Player Server={Server} SessionCode={SessionCode} />}
        />
      </>
    )
  );
  return (
    <>
      {" "}
      {/* <Counter Server={Server} SessionCode={SessionCode}/> */}
      <RouterProvider router={router} />
    </>
  );
}

export default App;
