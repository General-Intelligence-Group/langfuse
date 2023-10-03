// import NavLink from "../news/NavLink";
import Link from "next/link";
import { BuildingLibraryIcon } from "@heroicons/react/24/outline";

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
      {/* <nav className="flex flex-wrap justify-center md:grid md:grid-cols-7 text-xs md:text-sm gap-x-4 pb-2 max-w-6xl mx-auto border-b-2">
        {knowledgeCategories.map((category) => (
          <NavLink
            path="knowledge"
            key={category}
            category={category}
            lang={lang}
          />
        ))}
      </nav> */}
      <section className="w-full bg-gray-500/10 ">
        <div className="relative mx-auto flex max-w-7xl flex-col items-center rounded-b-2xl p-5 lg:flex-row">
          <Link
            href={`/project/${projectId}/knowledge`}
            className="mb-5 flex w-full flex-col items-end justify-start gap-3 text-center sm:flex-row sm:text-left"
          >
            <div>
              <BuildingLibraryIcon className="mx-auto h-24 w-24" />
              <p className="decoration-secondary-500 text-primary-950 underline-offset-3 text-center font-serif text-sm font-medium italic tracking-widest underline">
                The Knowledge Network
              </p>
            </div>
            <div>
              <h2 className="font-serif text-6xl tracking-widest">
                Truth Tables
              </h2>
              <p className="text-[18px] uppercase tracking-[9px]">
                Distributed Knowledge Management
              </p>
            </div>
          </Link>

          {/* <div className="flex items-center justify-end flex-1 w-full gap-5">
          </div> */}
        </div>
        <div className="mx-auto max-w-7xl">
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
