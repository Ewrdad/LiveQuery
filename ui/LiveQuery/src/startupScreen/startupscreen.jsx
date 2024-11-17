import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

/**
 * MARK: StartUpScreen
 * @description The statup screen for users. Allows creating a session and joining a session.
 * @returns {JSX.Element} StartUpScreen component
 * @example <StartUpScreen />
 */
export const StartUpScreen = () => {
  const navigate = useNavigate();
  return (
    <Card className="w-full p-3 border-3-black shadow-md bg-slate-200 ">
      <CardContent>
        <br />

        <Input placeholder="Session ID" className="w-full bg-white shadow-lg" />
        <br />
        <Button
          className="w-full shadow-lg bg-slate-500"
          onClick={() => {
            navigate("/player");
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
            navigate("/dashboard");
          }}
        >
          Create Session
        </Button>
      </CardContent>
    </Card>
  );
};
