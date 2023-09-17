"use client";
import { User } from "next-auth";
// import CollectionCard from "./CollectionCard";
import { DocumentMetadata } from "./page";
import { useKnowledgeStore } from "@/src/store/KnowledgeStore";

import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import DocumentRow from "@/src/app/project/[projectId]/knowledge/[collectionName]/DocumentRow";
import { FragmentMetadataEntity } from "@/src/utils/middleware/chroma/fragment";

type Props = {
  knowledge: FragmentMetadataEntity[] | null;
  lang: Locale;
  projectId: string;
  collectionName: string;
  user: User | null;
};

const CollectionList = ({
  knowledge,
  lang,
  projectId,
  collectionName,
  user,
}: Props) => {
  const searchString = useKnowledgeStore((state) => state.searchString);

  return (
    <main className="w-full">
      <Table className="w-full text-xs">
        <TableCaption>Documents in dataset.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-left">#</TableHead>
            <TableHead className="w-24">Filename</TableHead>
            <TableHead className="w-24">Type</TableHead>
            <TableHead className="">File Size</TableHead>
            <TableHead className=""># Characters</TableHead>
            <TableHead className=""># Tokens</TableHead>
            <TableHead className=""># People</TableHead>
            <TableHead className="">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {knowledge?.map((document, index) => {
            if (
              searchString &&
              (!document.title
                .toLowerCase()
                .includes(searchString.toLowerCase()))
              // || !collection.usefulFor
              //   .toLowerCase()
              //   .includes(searchString.toLowerCase())
            )
              return null;
            return (
              <DocumentRow
                key={index}
                index={index}
                id={collectionName}
                lang={lang}
                metadata={document}
                projectId={projectId}
              />
            );
          })}
        </TableBody>
      </Table>
      {/* <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
        {knowledge?.map((collection) => {
          if (
            searchString &&
            (!collection.title
              .toLowerCase()
              .includes(searchString.toLowerCase()) ||
              !collection.description
                .toLowerCase()
                .includes(searchString.toLowerCase()))
            // || !collection.usefulFor
            //   .toLowerCase()
            //   .includes(searchString.toLowerCase())
          )
            return null;
          return (
            <CollectionCard
              projectId={projectId}
              name={collectionName}
              key={collection.title}
              metadata={collection}
              lang={lang}
              user={user}
            />
          );
        })}
      </div> */}
    </main>
  );
};

export default CollectionList;
