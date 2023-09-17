import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/src/components/ui/popover";
import { DocumentMagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { Footprints, LayoutList } from "lucide-react";
import Link from "next/link";

type Props = {
  values: ExtractedDataPointRef[];
  projectId: string;
  collectionId: string;
};

function ExtractedCellPopover({ values, projectId, collectionId }: Props) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Details</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Extraction Details</h4>
            <p className="text-sm text-muted-foreground">
              Set the dimensions for the layer.
            </p>
            {/* <pre>{JSON.stringify(values)}</pre> */}
          </div>
          <div className="grid gap-2">
            {values.map(
              ({
                chunk_source,
                document_source,
                value,
                trace,
                observation,
              }) => (
                <div
                  key={chunk_source}
                  className="grid grid-cols-2 items-center gap-4"
                >
                  <div>
                    <Badge>
                      {typeof value === "object" ? `${value.username} | ${value.password}` : typeof value === "boolean"
                        ? value
                          ? "YES"
                          : "NO"
                        : value}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-end gap-1">
                    <Link
                      title="Go to Document"
                      href={`/project/${projectId}/knowledge/${collectionId}/document/${document_source}`}
                    >
                      <DocumentMagnifyingGlassIcon className="h-8 w-8 duration-150 ease-out hover:scale-105" />
                    </Link>
                    <Link
                      title="Go to Extraction Step"
                      href={`/project/${projectId}/traces/${trace}?observation=${observation}`}
                    >
                      <Footprints className="h-8 w-8 duration-150 ease-out hover:scale-105" />
                    </Link>
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default ExtractedCellPopover;
