import { type User } from "next-auth";
import EditCollection from "./EditCollection";
import Search from "@/src/app/project/[projectId]/knowledge/Search";
import { type CollectionMetadataSchema } from "@/src/utils/middleware/chroma/collection";

type Props = {
  lang: Locale;
  metadata: CollectionMetadataSchema;
  user: User | null;
  collectionName: string;
};

const CollectionHeader = ({ lang, metadata, collectionName }: Props) => {

  return (
    <nav className="w-full p-6">
      <EditCollection
        collectionName={collectionName}
        lang={lang}
        metadata={metadata}
      />
      <Search lang={lang} collectionName={collectionName} />
    </nav>
  );
};

export default CollectionHeader;
