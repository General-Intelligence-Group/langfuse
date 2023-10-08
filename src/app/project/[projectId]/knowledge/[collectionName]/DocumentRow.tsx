import { Badge } from "@/src/components/ui/badge";

import { TableCell, TableRow } from "@/src/components/ui/table";
import { formatFileSize, formatNumberToInt } from "@/src/utils/helper";
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
function DocumentRow({
  index,
  metadata,
  lang,
  projectId,
  collectionName,
}: Props) {
  const { title, filetype, n_char, n_token, filesize, n_people } = metadata;

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
      <TableCell className="grid justify-end">
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

export default DocumentRow;
