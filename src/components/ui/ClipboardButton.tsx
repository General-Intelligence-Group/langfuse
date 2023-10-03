"use client";
import clipboardCopy from "clipboard-copy";
import { CheckCircleIcon, ClipboardIcon } from "lucide-react";
import { useState } from "react";
import { useToast } from "./use-toast";
import { Button } from "@/src/components/ui/button";

interface ShareButtonProps {
  url: string;
  title: string;
  description: string;
  sidebar?: boolean;
  size?: "xs" | "sm" | "lg" | "default" | null | undefined;
  variant?:
    | "ghost"
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | null
    | undefined;
  id?: string;
}

const ClipboardButton = ({
  description = "",
  url = "",
  title = "",
  sidebar = true,
  variant = "ghost",
  size = "xs",
  id,
}: ShareButtonProps) => {
  const { toast } = useToast();
  const [copied, setCopied] = useState<boolean>(false);
  const handleCopy = async () => {
    await clipboardCopy(sidebar ? url : `${title}\n${description}\n${url}`);
    setCopied(true);
    toast({
      title: `${title} ${description} copied to clipboard!`,
      description: (
        <pre className="mt-2 w-full rounded-md bg-slate-950 p-4">
          <code className="text-white">
            {description} copied to clipboard ...
          </code>
        </pre>
      ),
    });
  };
  return (
    <Button
      id={id ? id : ""}
      size={size}
      variant={variant}
      type="button"
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onClick={handleCopy}
      title="Copy to clipboard"
      className="focus:outline-none"
    >
      {copied ? (
        <CheckCircleIcon
          className={`${sidebar ? "h-6 w-6" : "h-9 w-9"} rounded-full`}
        />
      ) : (
        <ClipboardIcon
          className={`${sidebar ? "h-6 w-6" : "h-9 w-9"} rounded-full`}
        />
      )}
    </Button>
  );
};

export default ClipboardButton;
