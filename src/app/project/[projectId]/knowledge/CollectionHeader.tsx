// import NavLink from "../news/NavLink";
// import Link from "next/link";
// import { BuildingLibraryIcon } from "@heroicons/react/24/outline";

import CollectionMenuBar from "./CollectionMenuBar";
import { type CollectionType } from "chromadb/dist/main/types";
import { type User } from "next-auth";
type Props = {
  lang: Locale;
  collectionName: string;
  projectId: string;
  availableCollections: CollectionType[];
  user: User | null;
};

export default function CollectionHeader({
  lang,
  collectionName,
  availableCollections,
  user,
  projectId,
}: Props) {
  return (
    <header>
      <section className="w-full bg-gray-500/10 ">
        <div className="max-w-7xl">
          <CollectionMenuBar
            availableCollections={availableCollections}
            lang={lang}
            collectionName={collectionName}
            user={user}
            projectId={projectId}
          />
        </div>
      </section>
    </header>
  );
}
