import { connectToVectorStore } from "@/src/utils/middleware/chroma";
import FragmentList from "../../FragmentList";
import {
  FragmentService,
} from "@/src/utils/middleware/chroma/fragment";

import DocumentHeader from "@/src/app/project/[projectId]/knowledge/[collectionName]/document/[documentId]/DocumentHeader";
// import { DocumentService } from "@/src/utils/middleware/mongo/Document";
import { connectToMongoDb } from "@/src/utils/middleware/mongo";
import { DocumentService } from "@/src/utils/middleware/mongo/Document";

// const KnowledgeDocumentPage = ({ searchParams }: Props) => {
// console.log("searchParams", searchParams);
const KnowledgeDocumentPage = async ({
  params,
}: {
  params: {
    projectId: string;
    documentId: string;
    collectionName: string;
    visibility: string;
    lang: Locale;
  };
  // searchParams: { author: string; title: string; source: string };
}) => {
  const { visibility, collectionName, lang, documentId, projectId } = params;
  // console.log("visibility:=", visibility);
  // console.log("params:=", params);
  // console.log("searchParams", searchParams);
  const vecStoreClient = connectToVectorStore();
  const fragService = new FragmentService(vecStoreClient);
  const { client: mongoClient } = await connectToMongoDb({});

  const docService = new DocumentService(mongoClient, projectId);
  const document = await docService.getDocument({
    sessionId: collectionName,
    sourceId: documentId,
  });
  
  const fragments = await fragService.getFragments({
    collectionName,
    source_uuid: documentId,
  });

  // if (fragments && fragments.length > 0) {
  //   metadata = fragments[0]?.metadata;
  // }

  return (
    <main className="mx-auto max-w-7xl">
      {document && <DocumentHeader metadata={document} />}
      {fragments && (
        <FragmentList
          projectId={projectId}
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
