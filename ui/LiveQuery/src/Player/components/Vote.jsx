import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export const Vote = ({ options, setShowResults }) => {
  return (
    <div className="w-full  text-xl">
      {options.map((option, index) => {
        return (
          <div key={index}>
            <Separator
              orientation="horizontal"
              className="my-2 bg-black w-full min-w-full"
            />
            <Button
              className="w-full shadow-lg bg-slate-500 text-center text-2xl p-10 "
              onClick={() => setShowResults(true)}
            >
              <div className="w-1/3"></div>
              {option.text}

              <div className="w-1/3"></div>
            </Button>
          </div>
        );
      })}
      <Separator orientation="horizontal" className="my-2 bg-black w-full" />
    </div>
  );
};
