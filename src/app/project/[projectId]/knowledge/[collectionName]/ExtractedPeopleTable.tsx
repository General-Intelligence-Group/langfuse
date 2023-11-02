import ExtractedCellPopover from "@/src/app/project/[projectId]/knowledge/[collectionName]/ExtractedCellPopover";
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
import { type ResultDTO } from "@/src/utils/middleware/mongo/ExtractionResults";

type Props = {
  results: ResultDTO[];
  projectId: string;
  collectionId: string;
};

const ExtractedPeopleTable = ({ results, projectId, collectionId }: Props) => {
  return (
    <div className="w-full space-y-4 py-2">
      <h2 className="text-4xl uppercase tracking-widest text-primary/60 underline decoration-secondary-foreground/20 underline-offset-4">
        Results
      </h2>
      <div className="flex items-center gap-1 text-lg font-semibold">
        <Badge>{results.length}</Badge>
        <span>Identified People & Extracted Data</span>
      </div>
      <Table>
        <TableCaption>A list of extracted people in the document.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">#</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Firstname</TableHead>
            <TableHead>Middlename</TableHead>
            <TableHead>Lastname</TableHead>
            <TableHead className="text-center" title="Date of Birth">
              Birthdate
            </TableHead>
            <TableHead className="text-center" title="Address">
              Address
            </TableHead>
            <TableHead className="text-center" title="Social Security Number">
              SSN
            </TableHead>
            <TableHead
              className="text-center"
              title="Driver's License or State ID Number"
            >
              ID
            </TableHead>

            <TableHead className="text-center" title="Passport Number">
              Passport
            </TableHead>
            <TableHead className="text-center" title="Financial Account Number">
              Bank&nbsp;Account
            </TableHead>
            <TableHead className="text-center" title="Payment Card Number">
              Pay&nbsp;Card
            </TableHead>
            <TableHead className="text-center" title="Username & Password">
              Login
            </TableHead>
            {/* <TableHead className="text-center" title="E-Mail & Password">
              E-Mail
            </TableHead> */}
            <TableHead className="text-center" title="Biometric Data">
              Biometric
            </TableHead>
            <TableHead className="text-center" title="Medical Information">
              Medical
            </TableHead>
            <TableHead className="text-center" title="Medical Record Number">
              MRN
            </TableHead>
            <TableHead
              className="text-center"
              title="Health Insurance Information"
            >
              Healthcare
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {results.map(
            (person, rowIndex: number) => (
              <TableRow key={rowIndex}>
                <TableCell className="font-medium">{rowIndex + 1}</TableCell>
                <TableCell className="flex-1">
                  {person.name.pre}
                </TableCell>
                <TableCell className="flex-1">
                  {person.name.fn}
                </TableCell>
                <TableCell className="flex-1">
                  {person.name.mn}
                </TableCell>
                <TableCell className="flex-1">
                  {person.name.ln}
                </TableCell>
                <TableCell>
                  {person.dob && (
                    <ExtractedCellPopover
                      projectId={projectId}
                      collectionId={collectionId}
                      values={person.dob}
                      name={person.name}
                      type="dob"
                    />
                  )}
                </TableCell>
                <TableCell>
                  {person.address && (
                    <ExtractedCellPopover
                      projectId={projectId}
                      collectionId={collectionId}
                      values={person.address}
                      name={person.name}
                      type="address"
                    />
                  )}
                </TableCell>
                <TableCell>
                  {person.ssn && (
                    <ExtractedCellPopover
                      name={person.name}
                      projectId={projectId}
                      collectionId={collectionId}
                      values={person.ssn}
                    />
                  )}
                </TableCell>
                <TableCell>
                  {person.stateId && (
                    <ExtractedCellPopover
                      name={person.name}
                      projectId={projectId}
                      collectionId={collectionId}
                      values={person.stateId}
                    />
                  )}
                </TableCell>
                <TableCell className="w-12">
                  {person.pass && (
                    <ExtractedCellPopover
                      name={person.name}
                      projectId={projectId}
                      collectionId={collectionId}
                      values={person.pass}
                    />
                  )}
                </TableCell>
                <TableCell>
                  {person.acc && (
                    <ExtractedCellPopover
                      name={person.name}
                      projectId={projectId}
                      collectionId={collectionId}
                      values={person.acc}
                      type="financial_account"
                    />
                  )}
                </TableCell>
                <TableCell>
                  {person.pay && (
                    <ExtractedCellPopover
                      name={person.name}
                      projectId={projectId}
                      collectionId={collectionId}
                      values={person.pay}
                      type="payment_card"
                    />
                  )}
                </TableCell>
                <TableCell>
                  {person.cred && (
                    <ExtractedCellPopover
                      name={person.name}
                      projectId={projectId}
                      collectionId={collectionId}
                      values={person.cred}
                      type="credentials"
                    />
                  )}
                </TableCell>
                <TableCell>
                  {person.bio && (
                    <ExtractedCellPopover
                      name={person.name}
                      projectId={projectId}
                      collectionId={collectionId}
                      values={person.bio}
                    />
                  )}
                </TableCell>
                <TableCell>
                  {person.med && (
                    <ExtractedCellPopover
                      name={person.name}
                      projectId={projectId}
                      collectionId={collectionId}
                      values={person.med}
                    />
                  )}
                </TableCell>
                <TableCell>
                  {person.mrn && (
                    <ExtractedCellPopover
                      name={person.name}
                      projectId={projectId}
                      collectionId={collectionId}
                      values={person.mrn}
                    />
                  )}
                </TableCell>
                <TableCell>
                  {person.health && (
                    <ExtractedCellPopover
                      name={person.name}
                      projectId={projectId}
                      collectionId={collectionId}
                      values={person.health}
                    />
                  )}
                </TableCell>
              </TableRow>
            ),
            // ) : null,
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ExtractedPeopleTable;
