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

type Props = { triggers: IdentifiedPeople };

const SemanticTriggersTable = ({ triggers }: Props) => {
  return triggers.length > 0 ? (
    <div className="space-y-4 p-2">
      {triggers.map((trigger, idx) => (
        <>
          <h5 className="flex-1">
            {trigger.full_name.firstname} {trigger.full_name.middlenames}{" "}
            {trigger.full_name.lastname}
          </h5>

          <Table>
            <TableCaption>
              A list of identified triggers in the document.
            </TableCaption>
            <TableHeader>
              <TableRow>
                {trigger.social_security_number && (
                  <TableHead>Social Security Number</TableHead>
                )}
                {trigger.date_of_birth && (
                  <TableHead className="">date_of_birth</TableHead>
                )}
                {trigger.state_id_or_drivers_license && (
                  <TableHead className="">Driver License Number</TableHead>
                )}
                {/* {trigger.state_id && (
                  <TableHead className="">state_id</TableHead>
                )} */}
                {/* {trigger.security_code && (
                  <TableHead className="">security_code</TableHead>
                )} */}
                {trigger.passport_number && (
                  <TableHead className="">passport_number</TableHead>
                )}
                {trigger.financial_account_number && (
                  <TableHead className="">financial_account_number</TableHead>
                )}
                {trigger.payment_card_number && (
                  <TableHead className="">payment_card_number</TableHead>
                )}
                {trigger.payment_card_number && (
                  <TableHead className="">payment_card_number</TableHead>
                )}
                {trigger.username_and_password && (
                  <TableHead className="">username_and_password</TableHead>
                )}
                {trigger.email_and_password && (
                  <TableHead className="">email_and_password</TableHead>
                )}
                {trigger.uid_or_username && (
                  <TableHead className="">uid_or_username</TableHead>
                )}
                {trigger.biometric_data && (
                  <TableHead className="">biometric_data</TableHead>
                )}
                {trigger.medical_information && (
                  <TableHead className="">medical_information</TableHead>
                )}
                {trigger.medical_record_number && (
                  <TableHead className="">medical_record_number</TableHead>
                )}
                {trigger.health_insurance_info && (
                  <TableHead className="">health_insurance_info</TableHead>
                )}
                {/* {trigger.includes_has_medical_information && (
                  <TableHead className="">
                    includes_has_medical_information
                  </TableHead>
                )}
                {trigger.includes_health_insurance_information && (
                  <TableHead className="">
                    includes_health_insurance_information
                  </TableHead>
                )} */}
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                {trigger.social_security_number && (
                  <TableCell>
                    {(1 -
                      Number(
                        trigger.social_security_number.relevance_score.toFixed(
                          2,
                        ),
                      )) *
                      100}
                  </TableCell>
                )}
                {trigger.date_of_birth && (
                  <TableCell>
                    {(1 -
                      Number(
                        trigger.date_of_birth.relevance_score.toFixed(2),
                      )) *
                      100}
                  </TableCell>
                )}
                {trigger.state_id_or_drivers_license && (
                  <TableCell>
                    {(1 -
                      Number(
                        trigger.state_id_or_drivers_license.relevance_score.toFixed(
                          2,
                        ),
                      )) *
                      100}
                  </TableCell>
                )}
                {/* {trigger.state_id && (
                  <TableCell>
                    {(1 -
                      Number(
                        trigger.state_id.relevance_score.toFixed(2)
                      )) *
                      100}
                  </TableCell>
                )} */}
                {trigger.security_code && (
                  <TableCell>
                    {(1 -
                      Number(
                        trigger.security_code.relevance_score.toFixed(2),
                      )) *
                      100}
                  </TableCell>
                )}
                {trigger.passport_number && (
                  <TableCell>
                    {(1 -
                      Number(
                        trigger.passport_number.relevance_score.toFixed(2),
                      )) *
                      100}
                  </TableCell>
                )}
                {trigger.financial_account_number && (
                  <TableCell>
                    {(1 -
                      Number(
                        trigger.financial_account_number.relevance_score.toFixed(
                          2,
                        ),
                      )) *
                      100}
                  </TableCell>
                )}
                {trigger.payment_card_number && (
                  <TableCell>
                    {(1 -
                      Number(
                        trigger.payment_card_number.relevance_score.toFixed(2),
                      )) *
                      100}
                  </TableCell>
                )}
                {trigger.payment_card_number && (
                  <TableCell>
                    {(1 -
                      Number(
                        trigger.payment_card_number.relevance_score.toFixed(2),
                      )) *
                      100}
                  </TableCell>
                )}
                {trigger.username_and_password && (
                  <TableCell>
                    {(1 -
                      Number(
                        trigger.username_and_password.relevance_score.toFixed(
                          2,
                        ),
                      )) *
                      100}
                  </TableCell>
                )}
                {trigger.email_and_password && (
                  <TableCell>
                    {(1 -
                      Number(
                        trigger.email_and_password.relevance_score.toFixed(2),
                      )) *
                      100}
                  </TableCell>
                )}
                {trigger.uid_or_username && (
                  <TableCell>
                    {(1 -
                      Number(
                        trigger.uid_or_username.relevance_score.toFixed(2),
                      )) *
                      100}
                  </TableCell>
                )}
                {trigger.biometric_data && (
                  <TableCell>
                    {(1 -
                      Number(
                        trigger.biometric_data.relevance_score.toFixed(2),
                      )) *
                      100}
                  </TableCell>
                )}
                {trigger.medical_information && (
                  <TableCell>
                    {(1 -
                      Number(
                        trigger.medical_information.relevance_score.toFixed(2),
                      )) *
                      100}
                  </TableCell>
                )}
                {trigger.medical_record_number && (
                  <TableCell>
                    {(1 -
                      Number(
                        trigger.medical_record_number.relevance_score.toFixed(
                          2,
                        ),
                      )) *
                      100}
                  </TableCell>
                )}
                {trigger.health_insurance_info && (
                  <TableCell>
                    {(1 -
                      Number(
                        trigger.health_insurance_info.relevance_score.toFixed(
                          2,
                        ),
                      )) *
                      100}
                  </TableCell>
                )}
                {/* {trigger.includes_has_medical_information && (
                  <TableCell>
                    {(1 -
                      Number(
                        trigger.includes_has_medical_information.relevance_score.toFixed(2)
                      )) *
                      100}
                  </TableCell>
                )}
                {trigger.includes_health_insurance_information && (
                  <TableCell>
                    {(1 -
                      Number(
                        trigger.includes_health_insurance_information.relevance_score.toFixed(2)
                      )) *
                      100}
                  </TableCell>
                )} */}
              </TableRow>
              {/* {triggers.map((trigger: IdentifiedPerson, rowIndex: number) => (
           
              ))} */}
            </TableBody>
          </Table>
        </>
      ))}

      <div className="h-4" />
    </div>
  ) : (
    <p>No Triggers fired on this content</p>
  );
  // ;
};

export default SemanticTriggersTable;
