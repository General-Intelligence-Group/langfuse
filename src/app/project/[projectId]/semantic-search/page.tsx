// import { options } from "@/app/api/auth/[...nextauth]/options";
import { connectToVectorStore } from "@/src/utils/middleware/chroma";
import SemanticSearchForm from "./SemanticSearchForm";
import { type Metadata } from "next";
import SearchResult from "./SearchResult";
// import SearchResult from "./SearchResult";

type Props = {
  params: { lang: Locale; projectId: string };
  searchParams: SemanticSearchParams;
};

export function generateMetadata({ params: {} }: Props): Metadata {
  return {
    description: "Semantic Search",
    title: "Semantic Search",
    authors: { name: "General Intelligence Group" },
  };
}

export default async function KnowledgePage({
  searchParams,
  params: { lang, projectId },
}: Props) {
  const vecStoreClient = connectToVectorStore();
  const collections = (await vecStoreClient.listCollections()).filter(
    (col) => col && col.metadata?.projectId === projectId,
  );
  // TODO 1. Google Drive connector
  // TODO 2. Archive extraction & Attachment ingestion
  
  // TODO 5. Reflection after extraction with gpt-3
  // TODO 6. Reflection on double-bind with gpt-3
  // TODO 1. Re-Run & Skip steps
  // TODO 7. Benchmark base for each NPPI trigger
  // TODO Semantic Prisma on NNPI & Capture fields
  // TODO 8. Human verification on NPPI triggers step --> Attach to chunk --> Block value in chunk for other persons
  // TODO 9. Capture datapoint recursion - Retrieve -> Analyze -> Extract -> Reflect
  // TODO 10. Human verification on Capture data points
  // TODO 11. chat retrieval single / multiple
  // TODO 12. Dedouble people with same name with reflection

  
  // TODO Optimize token usage by blocking Person / datapoint pairs already extracted from specific document
  // TODO Semantic search for capture fields
  // TODO chat agent knowledge & tools
  // TODO user feedback with knowledge graph
  // TODO knowledge graph link traceability
  // TODO embeddings classifier
  // TODO datasets person classifier
  // TODO person feature classifier
  // TODO KNowledge Graph memory
  // TODO filter searchParam
  // TODO decouple api at least ocr / ingestion

  return (
    <main className="mx-auto max-w-7xl p-6">
      <h1 className="mb-2 text-4xl uppercase tracking-widest underline decoration-secondary-foreground">
        Semantic Search
      </h1>
      {collections && collections.length > 0 && (
        <SemanticSearchForm
          lang={lang}
          collections={collections}
          searchParams={searchParams}
        />
      )}

      <SearchResult
        projectId={projectId}
        queryParams={searchParams}
        collections={collections}
      />
    </main>
  );
}

export const dynamic = "force-dynamic";
