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

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="*" element={<StartUpScreen />} />
      <Route path="dashboard" element={<SessionMaster />} />
      <Route path="player" element={<Player />} />
    </>
  )
);

/**
 * MARK: App
 * @description The main app component for the application
 * @returns {JSX.Element} App component
 */
function App() {
  return (
    <>
      {" "}
      <RouterProvider router={router} />
    </>
  );
}

export default App;
