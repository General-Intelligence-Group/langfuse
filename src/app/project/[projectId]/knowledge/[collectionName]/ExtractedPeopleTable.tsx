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

type Props = { people: ExtractedPeople };

const ExtractedPeopleTable = ({ people }: Props) => {
  return (
    <div className="w-full space-y-4 p-2">
      <h4 className="flex items-center gap-1 text-lg font-semibold">
        <Badge>{people.length}</Badge>
        <span>Extracted People</span>
      </h4>
      {/* <div className="grid grid-cols-2 w-full"> */}
      {/* <pre>{JSON.stringify(people, null, 2)}</pre> */}
      <Table className="text-xs">
        <TableCaption>A list of extracted people in the document.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">#</TableHead>
            <TableHead className="text-center">Firstname</TableHead>
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
              Driver's&nbsp;License
            </TableHead>
            <TableHead className="text-center" title="State ID Number">
              State&nbsp;ID
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
            <TableHead className="text-center" title="E-Mail & Password">
              E-Mail
            </TableHead>
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
            {/* <TableHead className="text-right">Conficence</TableHead> */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {people.map((person, rowIndex: number) => (
            <TableRow>
              <TableCell className="font-medium">{rowIndex + 1}</TableCell>
              <TableCell className="flex-1">
                {person.full_name.firstname}
              </TableCell>
              <TableCell className="flex-1">
                {person.full_name.lastname}
              </TableCell>
              <TableCell
                className=""
                title={
                  person.data_of_birth ? person.data_of_birth[0].value : ""
                }
              >
                {person.data_of_birth ? "true" : ""}
              </TableCell>
              <TableCell
                className=""
                title={
                  person.social_security_number
                    ? person.social_security_number[0].value
                    : ""
                }
              >
                {person.social_security_number ? "true" : ""}
              </TableCell>
              <TableCell
                className=""
                title={
                  person.drivers_license_id
                    ? person.drivers_license_id[0].value
                    : ""
                }
              >
                {person.drivers_license_id ? "true" : ""}
              </TableCell>
              <TableCell
                className=""
                title={person.state_id ? person.state_id[0].value : ""}
              >
                {person.state_id ? "true" : ""}
              </TableCell>
              <TableCell
                className=""
                title={
                  person.passport_number ? person.passport_number[0].value : ""
                }
              >
                {person.passport_number ? "true" : ""}
              </TableCell>
              <TableCell
                className=""
                title={
                  person.financial_account_number
                    ? person.financial_account_number[0].value
                    : ""
                }
              >
                {person.financial_account_number ? "true" : ""}
              </TableCell>
              <TableCell
                className=""
                title={
                  person.payment_card_number
                    ? person.payment_card_number[0].value
                    : ""
                }
              >
                {person.payment_card_number ? "true" : ""}
              </TableCell>
              <TableCell
                className=""
                title={
                  person.username_and_password
                    ? person.username_and_password[0].value
                    : ""
                }
              >
                {person.username_and_password ? "true" : ""}
              </TableCell>
              <TableCell
                className=""
                title={
                  person.email_and_password
                    ? person.email_and_password[0].value
                    : ""
                }
              >
                {person.email_and_password ? "true" : ""}
              </TableCell>
              <TableCell
                className=""
                title={
                  person.biometric_data && person.biometric_data[0].value
                    ? person.biometric_data[0].value
                    : ""
                }
              >
                {person.biometric_data && person.biometric_data[0].value
                  ? "true"
                  : ""}
              </TableCell>
              <TableCell
                className=""
                title={
                  person.medical_information &&
                  person.medical_information[0].value
                    ? person.medical_information[0].value
                    : ""
                }
              >
                {person.medical_information &&
                person.medical_information[0].value
                  ? "true"
                  : ""}
              </TableCell>
              <TableCell
                className=""
                title={
                  person.medical_record_number
                    ? person.medical_record_number[0].value
                    : ""
                }
              >
                {person.medical_record_number ? "true" : ""}
              </TableCell>
              <TableCell
                className=""
                title={
                  person.health_insurance_info &&
                  person.health_insurance_info[0].value
                    ? person.health_insurance_info[0].value
                    : ""
                }
              >
                {person.health_insurance_info &&
                person.health_insurance_info[0].value
                  ? "true"
                  : ""}
              </TableCell>
              {/* <TableCell className="text-right">{(person.full_name.confidence).toFixed(2)*100}%</TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
    // </div>
  );
};

export default ExtractedPeopleTable;
