import { connectToVectorStore } from "@/src/utils/middleware/chroma";
import FragmentList from "../../FragmentList";
import {
  FragmentDTO,
  FragmentMetadataEntity,
  FragmentService,
} from "@/src/utils/middleware/chroma/fragment";
import { DocumentMetadata } from "@/src/app/project/[projectId]/knowledge/[collectionName]/page";
import { Badge } from "@/src/components/ui/badge";
import DocumentHeader from "@/src/app/project/[projectId]/knowledge/[collectionName]/document/[documentId]/DocumentHeader";

type Props = {
  searchParams?: {
    author: string;
    title: string;
    source: string;
    visibility: string;
  };
};
// const KnowledgeDocumentPage = ({ searchParams }: Props) => {
// console.log("searchParams", searchParams);
const KnowledgeDocumentPage = async ({
  params,
}: {
  params: {
    documentId: string;
    collectionName: string;
    visibility: string;
    lang: Locale;
  };
  // searchParams: { author: string; title: string; source: string };
}) => {
  const { visibility, collectionName, lang, documentId } = params;
  // console.log("visibility:=", visibility);
  // console.log("params:=", params);
  // console.log("searchParams", searchParams);
  const vecStoreClient = connectToVectorStore();
  const fragService = new FragmentService(vecStoreClient);
  const fragments = await fragService.getFragments({
    collectionName,
    source_uuid: documentId,
  });
  console.log("fragments: ", fragments);
  let metadata: FragmentMetadataEntity | undefined = undefined;
  
  
  if (fragments && fragments.length > 0) {
    metadata = fragments[0]?.metadata;
    
  }

  return (
    <main className="mx-auto max-w-7xl">
      <DocumentHeader metadata={metadata} />
      {fragments && (
        <FragmentList
          collectionName={collectionName}
          knowledge={fragments}
          lang={lang}
          visibility={visibility}
        />
      )}
    </main>
  );
};

export default KnowledgeDocumentPage;
export const dynamic = "force-dynamic";
