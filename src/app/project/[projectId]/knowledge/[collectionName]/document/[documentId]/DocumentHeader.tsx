import FragmentMetadataInfoBox from "@/src/app/project/[projectId]/knowledge/[collectionName]/document/[documentId]/FragmentMetadataInfoBox";
import IdentifiedPeopleTable from "@/src/app/project/[projectId]/knowledge/[collectionName]/document/[documentId]/IdentifiedPeopleTable";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/ui/tabs";
import { type FragmentMetadataEntity } from "@/src/utils/middleware/chroma/fragment";

type Props = { metadata: FragmentMetadataEntity | undefined };
function DocumentHeader({ metadata }: Props) {
  let people: IdentifiedPeople = [];
  if (metadata && metadata.people) {
    people = JSON.parse(metadata.people) as IdentifiedPeople;
  }
  return (
    <header className="p-3">
      <h4 className="flex items-center gap-1 text-xl font-semibold">
        Document {metadata?.title}
      </h4>
      <Tabs defaultValue="people" className="w-full">
        <TabsList>
          <TabsTrigger value="people">Identified People</TabsTrigger>
          <TabsTrigger value="metadata">Metadata</TabsTrigger>
        </TabsList>
        <TabsContent value="people">
          {people && <IdentifiedPeopleTable people={people} />}
        </TabsContent>
        <TabsContent value="metadata">
          {metadata && <FragmentMetadataInfoBox metadata={metadata} />}
        </TabsContent>
      </Tabs>
      {/* <div className="grid grid-cols-2">
        
        
      </div> */}
    </header>
  );
}

export default DocumentHeader;
