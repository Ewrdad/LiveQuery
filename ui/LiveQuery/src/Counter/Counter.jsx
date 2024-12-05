import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react"


export const Counter = ({Server, SessionCode}) => {
    const [count, setCount] = useState(0);

    Server.on("counter", (message) => {
        console.log("Counter", message);
        setCount(message);
    }
    );
    
    useEffect(() => {


        Server.emit("increment", {amount: 0, code: SessionCode});

    }
    , [Server]);

    return <>

    <Button onClick={() => {
        Server.emit("increment", {amount: 1});
    }
    }>
        Increment ( {count} )
    </Button>
    
    </>
}
