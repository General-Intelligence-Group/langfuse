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
import { type IdentifiedPerson } from "@/src/utils/middleware/chroma/collection";

type Props = {
  people: IdentifiedPerson[];
  projectId: string;
  collectionId: string;
};

const ExtractedPeopleTable = ({ people, projectId, collectionId }: Props) => {
  return (
    <div className="w-full space-y-4 py-2">
      <h2 className="text-4xl uppercase tracking-widest text-primary/60 underline decoration-secondary-foreground/20 underline-offset-4">
        Results
      </h2>
      <div className="flex items-center gap-1 text-lg font-semibold">
        <Badge>{people.length}</Badge>
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
          {people.map(
            (person, rowIndex: number) => (
              <TableRow key={rowIndex}>
                <TableCell className="font-medium">{rowIndex + 1}</TableCell>
                <TableCell className="flex-1">
                  {person.full_name.title}
                </TableCell>
                <TableCell className="flex-1">
                  {person.full_name.firstname}
                </TableCell>
                <TableCell className="flex-1">
                  {person.full_name.middlenames}
                </TableCell>
                <TableCell className="flex-1">
                  {person.full_name.lastname}
                </TableCell>
                <TableCell>
                  {person.date_of_birth && (
                    <ExtractedCellPopover
                      projectId={projectId}
                      collectionId={collectionId}
                      values={person.date_of_birth}
                      name={person.full_name}
                      type="birthdate"
                    />
                  )}
                </TableCell>
                <TableCell>
                  {person.address && (
                    <ExtractedCellPopover
                      projectId={projectId}
                      collectionId={collectionId}
                      values={person.address}
                      name={person.full_name}
                      type="address"
                    />
                  )}
                </TableCell>
                <TableCell>
                  {person.social_security_number && (
                    <ExtractedCellPopover
                      name={person.full_name}
                      projectId={projectId}
                      collectionId={collectionId}
                      values={person.social_security_number}
                    />
                  )}
                </TableCell>
                <TableCell>
                  {person.state_id_or_drivers_license && (
                    <ExtractedCellPopover
                      name={person.full_name}
                      projectId={projectId}
                      collectionId={collectionId}
                      values={person.state_id_or_drivers_license}
                    />
                  )}
                </TableCell>
                <TableCell className="w-12">
                  {person.passport_number && (
                    <ExtractedCellPopover
                      name={person.full_name}
                      projectId={projectId}
                      collectionId={collectionId}
                      values={person.passport_number}
                    />
                  )}
                </TableCell>
                <TableCell>
                  {person.financial_account_number && (
                    <ExtractedCellPopover
                      name={person.full_name}
                      projectId={projectId}
                      collectionId={collectionId}
                      values={person.financial_account_number}
                      type="financial_account"
                    />
                  )}
                </TableCell>
                <TableCell>
                  {person.payment_card_number && (
                    <ExtractedCellPopover
                      name={person.full_name}
                      projectId={projectId}
                      collectionId={collectionId}
                      values={person.payment_card_number}
                      type="payment_card"
                    />
                  )}
                </TableCell>
                <TableCell>
                  {person.username_and_password && (
                    <ExtractedCellPopover
                      name={person.full_name}
                      projectId={projectId}
                      collectionId={collectionId}
                      values={person.username_and_password}
                      type="credentials"
                    />
                  )}
                </TableCell>
                <TableCell>
                  {person.biometric_data && (
                    <ExtractedCellPopover
                      name={person.full_name}
                      projectId={projectId}
                      collectionId={collectionId}
                      values={person.biometric_data}
                    />
                  )}
                </TableCell>
                <TableCell>
                  {person.medical_information && (
                    <ExtractedCellPopover
                      name={person.full_name}
                      projectId={projectId}
                      collectionId={collectionId}
                      values={person.medical_information}
                    />
                  )}
                </TableCell>
                <TableCell>
                  {person.medical_record_number && (
                    <ExtractedCellPopover
                      name={person.full_name}
                      projectId={projectId}
                      collectionId={collectionId}
                      values={person.medical_record_number}
                    />
                  )}
                </TableCell>
                <TableCell>
                  {person.health_insurance_info && (
                    <ExtractedCellPopover
                      name={person.full_name}
                      projectId={projectId}
                      collectionId={collectionId}
                      values={person.health_insurance_info}
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
