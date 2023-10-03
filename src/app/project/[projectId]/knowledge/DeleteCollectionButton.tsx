"use client";
import { Button } from "@/src/components/ui/button";
import { useToast } from "@/src/components/ui/use-toast";
import { deleteCollection } from "@/src/utils/actions/collection";
// import { Button } from "@/components/ui/button";
// import { useToast } from "@/components/ui/use-toast";
// import { deleteCollection } from "@/lib/actions/collection";
import { Trash2Icon } from "lucide-react";
import { useTransition } from "react";

type Props = {
  collectionName: string;
  size?: "xs" | "sm" | "lg" | "default" | null | undefined;
};
const DeleteCollectionButton = ({ collectionName ,size}: Props) => {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const deleteCollectionMutation = async () => {
    startTransition(() => deleteCollection(collectionName));

    toast({
      title: "Library erfolgreich gelöscht",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">
            {JSON.stringify(collectionName, null, 2)}
          </code>
        </pre>
      ),
    });
  };
  return (
    <Button
      type="button"
      size={size}
      disabled={isPending}
      onClick={async (e) => {
        await deleteCollectionMutation();
      }}
      variant="destructive"
    >
      <Trash2Icon className="h-4 w-4" />
    </Button>
  );
};

export default DeleteCollectionButton;
