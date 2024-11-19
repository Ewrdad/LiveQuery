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
 */
export const StartUpScreen = ({ Server, setSessionCode }) => {
  const navigate = useNavigate();
  const [RoomCode, setRoomCode] = useState("");

  useEffect(() => {
    Server.on("SuccessJoined", (message) => {
      if (message.status == 200) {
        console.log(message);
        navigate("/player");
        setSessionCode(message.sessionID);
      }
    });

    Server.on("SeshCreated", (message) => {
      if (message.status == 200) {
        console.log(message);
        navigate("/dashboard");
        setSessionCode(message.sessionID);
      }
    });

    return () => {
      Server.off("SuccessJoined");
      Server.off("SeshCreated");
    };
  }, []);

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
            console.log(RoomCode);
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

            // navigate("/dashboard");
          }}
        >
          Create Session
        </Button>
      </CardContent>
    </Card>
  );
};
