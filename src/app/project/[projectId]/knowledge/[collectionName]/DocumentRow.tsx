import DeleteCollectionButton from "@/src/app/project/[projectId]/knowledge/DeleteCollectionButton";
import { DocumentMetadata } from "@/src/app/project/[projectId]/knowledge/[collectionName]/page";
import ClipboardButton from "@/src/components/ui/ClipboardButton";
import LiveTimestamp from "@/src/components/ui/LiveTimestamp";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { TableCell, TableRow } from "@/src/components/ui/table";
import { formatFileSize, formatNumberToInt } from "@/src/utils/helper";
import { FragmentMetadataEntity } from "@/src/utils/middleware/chroma/fragment";
import {
  ChatBubbleBottomCenterIcon,
  CheckBadgeIcon,
} from "@heroicons/react/24/solid";
import { ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
type Props = {
  lang: Locale;
  index: number;
  metadata: FragmentMetadataEntity;
  id: string;
  projectId: string;
};
function DocumentRow({ index, metadata, id, lang, projectId }: Props) {
  const { title, filetype, n_char, n_token, filesize, n_people } = metadata;
  console.log("metadata: ", metadata);
  return (
    <TableRow>
      <TableCell className="text-left">{index + 1}</TableCell>

      <TableCell>{title}</TableCell>
      <TableCell>
        <Badge>{filetype}</Badge>
      </TableCell>
      <TableCell>{filesize && formatFileSize(filesize, lang)}</TableCell>
      <TableCell>{n_char && formatNumberToInt(n_char, lang)}</TableCell>
      <TableCell>{n_token && formatNumberToInt(n_token, lang)}</TableCell>
      <TableCell>{n_people && formatNumberToInt(n_people, lang)}</TableCell>
      <TableCell className="grid">
        <Link
          title="Details"
          href={`/project/${projectId}/knowledge/${id}/document/${metadata.source_uuid}`}
        >
          <ArrowRight className="h-8 w-8" />
        </Link>
      </TableCell>
    </TableRow>
  );
}

export default DocumentRow;
