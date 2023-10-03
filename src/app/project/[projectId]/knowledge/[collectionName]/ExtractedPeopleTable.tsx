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
import {type   IdentifiedPerson } from "@/src/utils/middleware/chroma/collection";

type Props = {
  people: IdentifiedPerson[];
  projectId: string;
  collectionId: string;
};

const ExtractedPeopleTable = ({ people, projectId, collectionId }: Props) => {
  return (
    <div className="w-full space-y-4 py-2">
      <h4 className="flex items-center gap-1 text-lg font-semibold">
        <Badge>{people.length}</Badge>
        <span>Identified People & Extracted Data</span>
      </h4>
      {/* <div className="grid grid-cols-2 w-full"> */}
      {/* <pre>{JSON.stringify(people, null, 2)}</pre> */}
      <Table className="text-xs">
        <TableCaption>A list of extracted people in the document.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">#</TableHead>
            <TableHead className="text-center">Titles</TableHead>
            <TableHead className="text-center">Firstname</TableHead>
            <TableHead className="text-center">Middlenames</TableHead>
            <TableHead className="text-center">Lastname</TableHead>
            <TableHead className="text-center" title="Date of Birth">
              DoB
            </TableHead>
            <TableHead className="text-center" title="Social Security Number">
              SSN
            </TableHead>
            <TableHead
              className="text-center text-xs"
              title="Driver's License Number"
            >
              DL / State&nbsp;ID
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
              // true ||
              // person.date_of_birth ||
              // person.social_security_number ||
              // person.state_id_or_drivers_license ||
              // person.passport_number ||
              // person.financial_account_number ||
              // person.payment_card_number ||
              // person.username_and_password ||
              // (person.biometric_data && person.biometric_data?.length > 0) ||
              // (person.medical_information &&
              //   person.medical_information?.length > 0) ||
              // person.medical_record_number ||
              // (person.health_insurance_info &&
              //   person.health_insurance_info?.length > 0) ? (
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
                <TableCell className="">
                  {person.date_of_birth && (
                    <ExtractedCellPopover
                      projectId={projectId}
                      collectionId={collectionId}
                      values={person.date_of_birth}
                    />
                  )}
                </TableCell>
                <TableCell className="">
                  {person.social_security_number && (
                    <ExtractedCellPopover
                      projectId={projectId}
                      collectionId={collectionId}
                      values={person.social_security_number}
                    />
                  )}
                </TableCell>
                <TableCell className="">
                  {person.state_id_or_drivers_license && (
                    <ExtractedCellPopover
                      projectId={projectId}
                      collectionId={collectionId}
                      values={person.state_id_or_drivers_license}
                    />
                  )}
                </TableCell>
                <TableCell className="w-12">
                  {person.passport_number && (
                    <ExtractedCellPopover
                      projectId={projectId}
                      collectionId={collectionId}
                      values={person.passport_number}
                    />
                  )}
                </TableCell>
                <TableCell className="">
                  {person.financial_account_number && (
                    <ExtractedCellPopover
                      projectId={projectId}
                      collectionId={collectionId}
                      values={person.financial_account_number}
                    />
                  )}
                </TableCell>
                <TableCell className="">
                  {person.payment_card_number && (
                    <ExtractedCellPopover
                      projectId={projectId}
                      collectionId={collectionId}
                      values={person.payment_card_number}
                    />
                  )}
                </TableCell>
                <TableCell className="">
                  {person.username_and_password && (
                    <ExtractedCellPopover
                      projectId={projectId}
                      collectionId={collectionId}
                      values={person.username_and_password}
                    />
                  )}
                </TableCell>
                <TableCell className="">
                  {person.biometric_data && (
                    <ExtractedCellPopover
                      projectId={projectId}
                      collectionId={collectionId}
                      values={person.biometric_data}
                    />
                  )}
                </TableCell>
                <TableCell className="">
                  {person.medical_information && (
                    <ExtractedCellPopover
                      projectId={projectId}
                      collectionId={collectionId}
                      values={person.medical_information}
                    />
                  )}
                </TableCell>
                <TableCell className="">
                  {person.medical_record_number && (
                    <ExtractedCellPopover
                      projectId={projectId}
                      collectionId={collectionId}
                      values={person.medical_record_number}
                    />
                  )}
                </TableCell>
                <TableCell className="">
                  {person.health_insurance_info && (
                    <ExtractedCellPopover
                      projectId={projectId}
                      collectionId={collectionId}
                      values={person.health_insurance_info}
                    />
                  )}
                </TableCell>
                {/* <TableCell className="text-right">{(person.full_name.confidence).toFixed(2)*100}%</TableCell> */}
              </TableRow>
            ),
            // ) : null,
          )}
        </TableBody>
      </Table>
    </div>
    // </div>
  );
};

export default ExtractedPeopleTable;
