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
import { CollectionDTO } from "@/src/utils/middleware/chroma/collection";


// import { useKnowledgeStore } from "@/store/KnowledgeStore";

type Props = {
  datasets: CollectionDTO[] | null;
  lang: Locale;
  user: User | null;
  projectId: string;
};

const DatasetList = ({ datasets, lang }: Props) => {
  const searchString = useKnowledgeStore((state) => state.searchString);
  console.log("searchString: ", searchString);
  return (
    <main>
        <h1 className="uppercase tracking-widest text-2xl">Your datasets</h1>

      <Table className="w-full text-xs">
        <TableCaption>Your datasets.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-left">#</TableHead>
            <TableHead className="">Status</TableHead>
            <TableHead className="">Visibility</TableHead>
            <TableHead className="">Title</TableHead>
            <TableHead className="">
              General Info
            </TableHead>
            <TableHead className="">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {datasets?.map((collection, index) => {
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
                key={collection.name}
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

export default DatasetList;
