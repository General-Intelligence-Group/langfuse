// import CollectionList from "./CollectionList";
import { type User, getServerSession } from "next-auth";
import CollectionHeader from "./CollectionHeader";
import { redirect } from "next/navigation";
import CollectionList from "./CollectionList";
import { authOptions } from "@/src/server/auth";
import { connectToVectorStore } from "@/src/utils/middleware/chroma";
import { CollectionService } from "@/src/utils/middleware/chroma/collection";
import {
  type DocumentDTO,
  DocumentService,
} from "@/src/utils/middleware/chroma/document";
import ExtractedPeopleTable from "@/src/app/project/[projectId]/knowledge/[collectionName]/ExtractedPeopleTable";
import { Badge } from "@/src/components/ui/badge";
import { v4 as uuidv4 } from "uuid";
import { type Metadata } from "next";
const vecStoreClient = connectToVectorStore();

export interface DocumentMetadata {
  abbreviation: string;
  author: string;
  category: string;
  description: string;
  footnotes: string;
  owner: string;
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

export async function generateMetadata({
  params,
}: {
  params: { lang: Locale; collectionName: string };
}): Promise<Metadata> {
  const { collectionName } = params;

  const collectionService = new CollectionService(vecStoreClient);
  const collection = await collectionService.findCollection(collectionName);

  return {
    title: `${collection?.metadata.title} | Dataset | Prisma`,
    description: collection?.metadata.description,
    authors: { name: "General Intelligence Group" },
  };
}

const CollectionPage = async ({
  params,
}: {
  params: { collectionName: string; projectId: string; lang: Locale };
}) => {
  const { projectId, lang, collectionName } = params;
  const session = await getServerSession(authOptions);
  let user: User | null = null;

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

  const extractedPeople = metadata?.people;
  const filteredPeople = extractedPeople
    ? extractedPeople.filter(
        (person) =>
          person.date_of_birth ||
          person.social_security_number ||
          person.state_id_or_drivers_license ||
          person.passport_number ||
          person.financial_account_number ||
          person.payment_card_number ||
          person.username_and_password ||
          (person.biometric_data && person.biometric_data.length > 0) ||
          (person.medical_information &&
            person.medical_information.length > 0) ||
          person.medical_record_number ||
          (person.health_insurance_info &&
            person.health_insurance_info.length > 0),
      )
    : [];

  return (
    <main className="flex h-full w-full flex-1 flex-col items-center justify-between gap-5 pt-4">
      <CollectionHeader
        collectionName={collectionName}
        user={user}
        metadata={metadata}
        lang={lang}
      />
      <section className="w-full">
        {metadata.error_files && metadata.error_files.length > 0 && (
          <>
            <h2 className="flex gap-1 text-lg font-bold">
              <Badge variant="destructive">
                {metadata.error_files && metadata.error_files.length}
              </Badge>
              <span>Document loading error</span>
            </h2>
            <CollectionList
              error
              collectionName={collectionName}
              projectId={projectId}
              user={user}
              knowledge={
                metadata.error_files?.map(({ file, error }) => ({
                  source: file.absolute_path,
                  title: file.absolute_path,
                  source_uuid: uuidv4(),
                  description: error,
                  filesize: file.size,
                  filetype: file.type,
                })) as DocumentDTO[]
              }
              lang={lang}
            />
          </>
        )}
        {filteredPeople && filteredPeople.length > 0 && (
          <ExtractedPeopleTable
            projectId={projectId}
            collectionId={collectionName}
            people={filteredPeople}
          />
        )}
        <h2 className="mb-3 text-4xl uppercase tracking-widest text-primary/60 underline decoration-secondary-foreground/20 underline-offset-4">
          Files
        </h2>

        <div className="flex gap-1 text-lg font-bold">
          <Badge>{documents && documents.length}</Badge>
          <span>Documents in Dataset</span>
        </div>
        <CollectionList
          collectionName={collectionName}
          projectId={projectId}
          user={user}
          knowledge={documents}
          lang={lang}
        />
      </section>
    </main>
  );
};

export default CollectionPage;
export const dynamic = "force-dynamic";
