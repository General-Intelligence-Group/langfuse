import DeleteCollectionButton from "@/src/app/project/[projectId]/knowledge/DeleteCollectionButton";
import ClipboardButton from "@/src/components/ui/ClipboardButton";
import LiveTimestamp from "@/src/components/ui/LiveTimestamp";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import { EyeDropperIcon } from "@heroicons/react/20/solid";
import {
  ChatBubbleBottomCenterIcon,
  CheckBadgeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/solid";
import { ArrowRight, Loader2, Share } from "lucide-react";
import Link from "next/link";
type Props = {
  lang: Locale;
  index: number;
  metadata: CollectionMetadata;
  id: string;
};
function DatasetRow({ index, metadata, id, lang }: Props) {
  const {
    image,
    title,
    visibility,
    status,
    owner,
    description,
    publishedAt,
    updatedAt,
    sentenceBatchSize,
    thresholds,
    ident_model,
    extract_model,
    projectId,
  } = metadata;
  return (
    <TableRow title={thresholds}>
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
      <TableCell>{description}</TableCell>
      <TableCell>{owner && JSON.parse(owner).name}</TableCell>
      <TableCell>
        {publishedAt && <LiveTimestamp lang={lang} time={publishedAt} />}
      </TableCell>
      <TableCell>
        <ul className="discard">
          <li>Identify: {ident_model}</li>
          <li>Extract: {extract_model}</li>
        </ul>
      </TableCell>
      <TableCell>{sentenceBatchSize}</TableCell>
      <TableCell className="grid grid-cols-4">
        <Link title="Details" href={`/project/${projectId}/knowledge/${id}`}>
          <ArrowRight className="h-8 w-8" />
        </Link>
        <div>
          <Badge>
            ID:&nbsp;
            <ClipboardButton url={id} sidebar title="" description={id} />
          </Badge>
        </div>
        <div>
          <Button variant="ghost" title="Chat with Dataset">
            <ChatBubbleBottomCenterIcon className="h-8 w-8" />
          </Button>
        </div>
        <div>
          <DeleteCollectionButton collectionName={id} />
        </div>
      </TableCell>
    </TableRow>
  );
}

export default DatasetRow;
