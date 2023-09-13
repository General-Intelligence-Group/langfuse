import { User } from "next-auth";
import EditCollection from "./EditCollection";

type Props = {
  lang: Locale;
  metadata: CollectionMetadata;
  user: User | null;
  collectionName: string;
};

const CollectionHeader = ({
  lang,
  metadata,
  user,
  collectionName,
}: Props) => {
  const { title, description, use, visibility } = metadata;

  return (
    <nav className="w-full p-6">
        <EditCollection
          collectionName={collectionName}
          lang={lang}
          metadata={metadata}
        />
    </nav>
  );
};

export default CollectionHeader;
