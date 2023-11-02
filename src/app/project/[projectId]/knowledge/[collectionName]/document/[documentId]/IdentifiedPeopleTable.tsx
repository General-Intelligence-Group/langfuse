import { Badge } from "@/src/components/ui/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import { IdentifiedPersonOnDoc } from "@/src/utils/middleware/mongo/Document";

type Props = { people: IdentifiedPersonOnDoc[] };


const IdentifiedPeopleTable = ({ people }: Props) => {
  return (
    <div className="space-y-4 p-2">
      <h4 className="flex items-center gap-1 text-lg font-semibold">
        <Badge>{people.length}</Badge>
        <span>Identified People</span>
      </h4>
      <Table>
        <TableCaption>
          A list of identified people in the document.
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">#</TableHead>
            <TableHead>Titles</TableHead>
            <TableHead>First Name</TableHead>
            <TableHead>Middle Names</TableHead>
            {/* <TableHead>Middle Names</TableHead> */}
            <TableHead>Last Name</TableHead>
            {/* <TableHead className="text-right">Conficence</TableHead> */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {people.map((person, rowIndex: number) => (
            <TableRow key={rowIndex}>
              <TableCell className="font-medium">{rowIndex + 1}</TableCell>
              <TableCell className="flex-1">{person.name.pre}</TableCell>
              <TableCell className="flex-1">
                {person.name.fn}
              </TableCell>
              <TableCell className="flex-1">
                {person.name.mn}
              </TableCell>
              {/* <TableCell>{person.name.middlenames}</TableCell> */}
              <TableCell className="flex-1">
                {person.name.ln}
              </TableCell>
              {/* <TableCell className="text-right">{(person.name.confidence).toFixed(2)*100}%</TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
  // ;
};

export default IdentifiedPeopleTable;
