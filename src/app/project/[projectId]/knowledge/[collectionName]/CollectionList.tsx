"use client";
import { type User } from "next-auth";
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
import { type DocumentDTO } from "@/src/utils/middleware/chroma/document";
import ErrorRow from "./ErrorRow";

type Props = {
  knowledge: DocumentDTO[] | null;
  lang: Locale;
  projectId: string;
  collectionName: string;
  user: User | null;
  error?: boolean;
};

const CollectionList = ({
  knowledge,
  lang,
  projectId,
  collectionName,
  error = false,
}: Props) => {
  const searchString = useKnowledgeStore((state) => state.searchString);

  return (
    <main className="w-full">
      <Table className="w-full text-xs">
        <TableCaption>Documents in dataset.</TableCaption>
        {!error ? (
          <TableHeader>
            <TableRow>
              <TableHead className="text-left">#</TableHead>
              {/* <TableHead className="flex items-center gap-2 text-center">
              <MagicWandIcon className="inline h-6 w-6" />
            </TableHead> */}
              <TableHead className="w-24">Filename</TableHead>
              <TableHead className="w-24">Type</TableHead>
              <TableHead className="">File Size</TableHead>
              <TableHead className=""># Characters</TableHead>
              <TableHead className=""># Tokens</TableHead>
              <TableHead className=""># People</TableHead>
              <TableHead className="">Actions</TableHead>
            </TableRow>
          </TableHeader>
        ) : (
          <TableHeader>
            <TableRow>
              <TableHead className="text-left">#</TableHead>
              {/* <TableHead className="flex items-center gap-2 text-center">
              <MagicWandIcon className="inline h-6 w-6" />
            </TableHead> */}
              <TableHead className="w-24">Filename</TableHead>
              <TableHead className="w-24">Type</TableHead>
              <TableHead className="">File Size</TableHead>
              <TableHead className="">Error Message</TableHead>
              <TableHead className="">Actions</TableHead>
            </TableRow>
          </TableHeader>
        )}

        <TableBody>
          {knowledge?.map((document, index) => {
            if (
              searchString &&
              !document.title.toLowerCase().includes(searchString.toLowerCase())
              // || !collection.usefulFor
              //   .toLowerCase()
              //   .includes(searchString.toLowerCase())
            )
              return null;
            return !error ? (
              <DocumentRow
                key={index}
                index={index}
                collectionName={collectionName}
                lang={lang}
                metadata={document}
                projectId={projectId}
              />
            ) : (
              <ErrorRow
                key={index}
                index={index}
                collectionName={collectionName}
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
