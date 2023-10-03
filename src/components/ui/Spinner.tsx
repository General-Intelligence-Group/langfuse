import { Loader2 } from "lucide-react";

function Spinner() {
  return (
    <div className="flex h-3/4 items-center justify-center">
      <Loader2 className="h-full w-full animate-spin" />
    </div>
  );
}

export default Spinner;
