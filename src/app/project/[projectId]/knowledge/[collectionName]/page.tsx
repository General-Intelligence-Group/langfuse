// import CollectionList from "./CollectionList";
import { User, getServerSession } from "next-auth";
import CollectionHeader from "./CollectionHeader";
import { redirect } from "next/navigation";
import CollectionList from "./CollectionList";
import { authOptions } from "@/src/server/auth";
import { connectToVectorStore } from "@/src/utils/middleware/chroma";
import { CollectionService } from "@/src/utils/middleware/chroma/collection";
import { DocumentService } from "@/src/utils/middleware/chroma/document";
import ExtractedPeopleTable from "@/src/app/project/[projectId]/knowledge/[collectionName]/ExtractedPeopleTable";

export interface DocumentMetadata {
  abbreviation: string;
  author: string;
  category: string;
  description: string;
  footnotes: string;
  owner: any;
  publishedAt: string;
  updatedAt: string;
  people?: string;
  semantic_triggers?: string;
  source: string;
  title: string;
  type: string;
  usefulFor: string;
  version: string;
  source_uuid: string;
}

const GeneralKnowledgePage = async ({
  params,
}: {
  params: { collectionName: string; projectId: string; lang: Locale };
}) => {
  const { projectId, lang, collectionName } = params;
  const session = await getServerSession(authOptions);
  let user: User | null = null;
  const vecStoreClient = await connectToVectorStore();

  if (session) {
    user = session.user;
  }

  const collectionService = new CollectionService(vecStoreClient);
  const collection = await collectionService.findCollection(collectionName);

  if (!collection) {
    redirect(`/knowledge`);
  }
  const { metadata } = collection;
  const docService = new DocumentService(vecStoreClient);
  const documents = await docService.findDocument({ name: collectionName });
  if (!metadata) {
    redirect(`/knowledge`);
  }

  const extractedPeople = JSON.parse(metadata?.people!) as ExtractedPeople;

  return (
    <main className="mx-auto flex h-full max-w-7xl flex-1 flex-col items-center justify-between gap-5 pt-4">
      <CollectionHeader
        collectionName={collectionName}
        user={user}
        metadata={metadata}
        lang={lang}
      />
      <section>
        <h2>Documents in Dataset</h2>

        <CollectionList
          collectionName={collectionName}
          projectId={projectId}
          user={user}
          // @ts-ignore TODO fix type error
          knowledge={documents!}
          lang={lang}
        />
      </section>
      {extractedPeople && extractedPeople.length > 0 && <ExtractedPeopleTable people={extractedPeople} />}

      {/* <footer>Collection footer</footer> */}
    </main>
  )
}

export default GeneralKnowledgePage;
export const dynamic = "force-dynamic";
