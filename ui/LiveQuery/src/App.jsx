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
 */
function App() {
  const [SessionCode, setSessionCode] = useState("");
  const Server = io("http://localhost:3001");

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
      <RouterProvider router={router} />
    </>
  );
}

export default App;
