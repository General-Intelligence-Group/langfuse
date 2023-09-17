"use client";
import { useKnowledgeStore } from "@/src/store/KnowledgeStore";
import { User } from "next-auth";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import DatasetRow from "@/src/app/project/[projectId]/knowledge/DatasetRow";
// import { useKnowledgeStore } from "@/store/KnowledgeStore";

type Props = {
  knowledge: Record<string, any>[];
  lang: Locale;
  user: User | null;
  projectId: string;
};

const CollectionList = ({ user, knowledge, lang, projectId }: Props) => {
  const searchString = useKnowledgeStore((state) => state.searchString);
  console.log("searchString: ", searchString);
  return (
    <main>
      <Table className="w-full text-xs">
        <TableCaption>Your datasets.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-left">#</TableHead>
            <TableHead className="w-24">Status</TableHead>
            <TableHead className="w-24">Visibility</TableHead>
            <TableHead className="">Title</TableHead>
            <TableHead className="">Description</TableHead>
            <TableHead className="">Owner</TableHead>
            <TableHead className="">Published</TableHead>
            <TableHead className="">LLMs</TableHead>
            <TableHead className="">SentenceBatch</TableHead>
            <TableHead className="">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {knowledge?.map((collection, index) => {
            if (
              searchString &&
              (!collection.metadata.title
                .toLowerCase()
                .includes(searchString.toLowerCase()) ||
                !collection.metadata.description
                  .toLowerCase()
                  .includes(searchString.toLowerCase()))
            )
              return null;
            return (
              <DatasetRow
                lang={lang}
                id={collection.name}
                key={index}
                index={index}
                metadata={collection.metadata}
              />
            );
          })}
        </TableBody>
      </Table>
    </main>
  );
};

export default CollectionList;
