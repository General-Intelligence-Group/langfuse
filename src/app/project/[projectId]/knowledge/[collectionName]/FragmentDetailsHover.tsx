import SemanticTriggersTable from "@/src/app/project/[projectId]/knowledge/[collectionName]/document/[documentId]/SemanticTriggersTable";
import { Badge } from "@/src/components/ui/badge";

type Props = { metadata: Record<string, any> };

function FragmentDetailsHover({ metadata }: Props) {
  const semanticTriggers = JSON.parse(
    metadata.semantic_triggers
  ) as IdentifiedPerson[];

  return (
    // <div className="flex flex-col gap-2">
    <div className="space-y-1">
      <h4 className="flex items-center gap-1 text-lg font-semibold">
        <Badge>{semanticTriggers.length}</Badge>
        <span>Semantic Triggers</span>
      </h4>
      {/* <h4 className="text-sm font-semibold">
          <Badge>{semanticTriggers.length}</Badge> Semantic Triggers
        </h4> */}
      <p className="text-sm">
        Semantic <b>trigger scores</b> [0 - 100] on reportable data breach incidences per Person.
      </p>
      <div className="flex items-center pt-2">
        <SemanticTriggersTable triggers={semanticTriggers} />
      </div>
    </div>
    // </div>
  );
}

export default FragmentDetailsHover;
