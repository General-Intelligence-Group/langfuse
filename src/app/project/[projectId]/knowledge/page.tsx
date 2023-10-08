import DatasetList from "./DatasetList";
import { getServerSession } from "next-auth";
import { type User } from "next-auth";
import { authOptions } from "@/src/server/auth";
import { connectToVectorStore } from "@/src/utils/middleware/chroma";
import { CollectionService } from "@/src/utils/middleware/chroma/collection";
import { type Metadata } from "next";

type Props = {
  params: { lang: Locale; projectId: string };
};

export function generateMetadata({}: { params: { lang: Locale } }): Metadata {
  return {
    title: `Datasets | Prisma`,
    description: `Breach Datasets`,
    authors: { name: "General Intelligence Group" },
  };
}

export default async function KnowledgePage({
  params: { projectId, lang },
}: Props) {
  const session = await getServerSession(authOptions);
  let user: User | null = null;
  if (session) {
    user = session.user;
  }
  const vecStoreClient = connectToVectorStore();
  const collectionService = new CollectionService(vecStoreClient);
  const collections = (await collectionService.getCollections(projectId))?.sort(
    (a, b) => {
      const publishedA = a.metadata.publishedAt;
      console.log("publishedA", publishedA);
      const dateA = new Date(publishedA as string);
      const dateB = new Date(b.metadata.publishedAt as string);
      return dateB.getTime() - dateA.getTime();
    },
  );

  return (
    <>
      <main className="w-full p-6">
        {collections && (
          <DatasetList
            user={user}
            lang={lang}
            datasets={collections}
            projectId={projectId}
          />
        )}
      </main>
    </>
  );
}

export const dynamic = "force-dynamic";
