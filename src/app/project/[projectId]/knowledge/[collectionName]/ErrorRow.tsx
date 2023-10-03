import { Badge } from "@/src/components/ui/badge";

import { TableCell, TableRow } from "@/src/components/ui/table";
import { formatFileSize } from "@/src/utils/helper";
import { type DocumentDTO } from "@/src/utils/middleware/chroma/document";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
type Props = {
  lang: Locale;
  index: number;
  metadata: DocumentDTO;
  projectId: string;
  collectionName: string;
};
function ErrorRow({ index, metadata, lang, projectId, collectionName }: Props) {
  const { title, filetype, filesize, description } = metadata;

  return (
    <TableRow>
      <TableCell className="text-left">{index + 1}</TableCell>

      <TableCell>{title}</TableCell>
      <TableCell>
        <Badge>{filetype}</Badge>
      </TableCell>
      <TableCell>{filesize && formatFileSize(filesize, lang)}</TableCell>
      <TableCell>{description && description}</TableCell>
      <TableCell className="grid">
        <Link
          title="Details"
          href={`/project/${projectId}/knowledge/${collectionName}/document/${metadata.source_uuid}`}
        >
          <ArrowRight className="h-8 w-8" />
        </Link>
      </TableCell>
    </TableRow>
  );
}

export default ErrorRow;
