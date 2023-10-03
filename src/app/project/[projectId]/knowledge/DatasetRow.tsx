import DeleteCollectionButton from "@/src/app/project/[projectId]/knowledge/DeleteCollectionButton";
import ClipboardButton from "@/src/components/ui/ClipboardButton";

import { Button } from "@/src/components/ui/button";
import { TableCell, TableRow } from "@/src/components/ui/table";
import { EyeDropperIcon } from "@heroicons/react/20/solid";
import { CheckBadgeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { ArrowRight, Loader2, Share } from "lucide-react";
import Link from "next/link";

import dynamic from "next/dynamic";
import {
  ChatBubbleBottomCenterIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import { type CollectionMetadataSchema } from "@/src/utils/middleware/chroma/collection";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/src/components/ui/hover-card";
import { Avatar, AvatarFallback } from "@/src/components/ui/avatar";
const TimeAgo = dynamic(() => import("./TimeAgo"), { ssr: false });
type Props = {
  lang: Locale;
  index: number;
  metadata: CollectionMetadataSchema;
  id: string;
};
function DatasetRow({ index, metadata, id, lang }: Props) {
  const {
    title,
    visibility,
    status,
    owner,
    description,
    publishedAt,
    ident_model,
    extract_model,
    projectId,
    embeddingsSize,
    chunkOverlap
  } = metadata;

  return (
    <TableRow>
      <TableCell className="text-left">{index + 1}</TableCell>
      <TableCell title={status?.replace("_", " ")} className="text-center">
        {status !== "ready" ? (
          <Loader2 className="h-10 w-10 animate-spin text-red-400" />
        ) : (
          <CheckBadgeIcon className="h-8 w-8 " />
        )}
      </TableCell>
      <TableCell title={visibility}>
        {visibility === "private" ? (
          <EyeSlashIcon className="h-8 w-8" />
        ) : visibility === "public" ? (
          <EyeDropperIcon className="h-8 w-8" />
        ) : (
          <Share className="h-8 w-8" />
        )}
      </TableCell>
      <TableCell>{title}</TableCell>

      <TableCell>
        <HoverCard>
          <HoverCardTrigger asChild>
            <Button variant="link">
              <InformationCircleIcon className="inline h-7 w-7" />
            </Button>
          </HoverCardTrigger>
          <HoverCardContent className="w-80">
            <div className="flex justify-between space-x-4">
              <div>
                <Avatar title={`${owner?.name}`}>
                  <AvatarFallback className="bg-primary text-primary-foreground">{`${owner?.name
                    .split(" ")[0]
                    ?.charAt(0)}${owner?.name
                    .split(" ")[1]
                    ?.charAt(0)}`}</AvatarFallback>
                </Avatar>
                <i>Owner</i>
              </div>
              <div className="flex-1 space-y-1">
                <h4 className="text-sm font-semibold">{title}</h4>
                <p className="text-sm">{description}</p>
                <h5 className="font-medium tracking-widest">LLMs</h5>
                <ul className="">
                  <li>Identification: {ident_model}</li>
                  <li>Extraction: {extract_model}</li>
                  <li>Embeddings Size: {embeddingsSize}</li>
                  <li>Chunk Overlap: {chunkOverlap}</li>
                </ul>
                <div className="flex items-center pt-2">
                  <span className="text-xs text-muted-foreground">
                    Published{" "}
                    {publishedAt && (
                      <TimeAgo lang={lang} timestamp={publishedAt} />
                    )}
                  </span>
                </div>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      </TableCell>

      <TableCell className="flex items-center gap-0 text-center">
        <Link title="Details" href={`/project/${projectId}/knowledge/${id}`}>
          <Button size="xs" className="pl-0" variant="ghost">
            <ArrowRight className="h-6 w-6" />
          </Button>
        </Link>
        <ClipboardButton url={id} sidebar title="" description={id} />
        <Button size="xs" variant="ghost" title="Chat with Dataset">
          <ChatBubbleBottomCenterIcon className="h-6 w-6" />
        </Button>
        <DeleteCollectionButton size="xs" collectionName={id} />
      </TableCell>
    </TableRow>
  );
}

export default DatasetRow;
