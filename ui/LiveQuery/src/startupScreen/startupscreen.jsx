import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

/**
 * MARK: StartUpScreen
 * @description The statup screen for users. Allows creating a session and joining a session.
 * @returns {JSX.Element} StartUpScreen component
 * @example <StartUpScreen />
 * @param {Object} Server The socket.io server connection
 * @param {Function} setSessionCode The function to set the session code
 *
 * @listens SuccessJoined sets session code and navigates to Player screen
 * @listens SeshCreated sets session code and navigates to Dashboard screen
 * @emits JoinSession emits a request to join a session
 * @emits CreateSesh emits a request to create a session
 *
 */
export const StartUpScreen = ({ Server, setSessionCode }) => {
  //MARK: useState
  const navigate = useNavigate();
  const [RoomCode, setRoomCode] = useState("");

  //MARK: useEffect
  useEffect(() => {
    Server.on("SuccessJoined", async (message) => {
      if (message.status == 200) {
        console.log(message);
        await setSessionCode(message.sessionID);
        navigate("/player");
      }
    });

    Server.on("SeshCreated", async (message) => {
      if (message.status == 200) {
        console.log(message);
        await setSessionCode(message.sessionID);
        navigate("/dashboard");
      }
    });
  }, [Server, navigate, setSessionCode]);

  //MARK: Return
  return (
    <Card className="w-full p-3 border-3-black shadow-md bg-slate-200 ">
      <CardContent>
        <br />
        <Input
          placeholder="Session ID"
          value={RoomCode}
          onChange={(e) => {
            setRoomCode(e.target.value);
          }}
          className="w-full bg-white shadow-lg"
        />
        <br />
        <Button
          className="w-full shadow-lg bg-slate-500"
          onClick={() => {
            Server.emit("JoinSession", { sessionID: RoomCode });
          }}
        >
          Join Session
        </Button>
        <br />
        <p className="h-4" />
        <p>OR</p>
        <br />
        <Button
          className="w-full shadow-lg "
          onClick={() => {
            const SeshID = Math.floor(Math.random() * 1000000);
            Server.emit("CreateSesh", { user: "admin", seshID: SeshID });
          }}
        >
          Create Session
        </Button>
        <h4 className="mt-8 text-3xl">🏳‍🌈 ❤ 🏳‍⚧</h4>
      </CardContent>
    </Card>
  );
};
