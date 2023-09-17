"use client";
import { Button } from "@/src/components/ui/button";
import { Label } from "@/src/components/ui/label";
import { useKnowledgeStore } from "@/src/store/KnowledgeStore";
import { classifyChunk } from "@/src/utils/actions/chunks";
import { FragmentDTO } from "@/src/utils/middleware/chroma/fragment";
import { CrossCircledIcon } from "@radix-ui/react-icons";
import { CheckCheck } from "lucide-react";
// import { useKnowledgeStore } from "@/store/KnowledgeStore";
import dynamic from "next/dynamic";

const FragmentCard = dynamic(() => import("./FragmentCard"));
const NPPIs = [
  { label: "DoB", param: "date_of_birth" },
  { label: "SSN", param: "social_security_number" },
  { label: "ID", param: "state_id_or_drivers_license" },
  { label: "Passport", param: "passport_number" },
  { label: "Account", param: "financial_account_number" },
  { label: "Card", param: "payment_card_number" },
  { label: "Creds", param: "username_and_password" },
  { label: "Bio", param: "biometric_data" },
  { label: "Med", param: "medical_information" },
  { label: "MRN", param: "medical_record_number" },
  { label: "Insurance", param: "health_insurance_info" },
];
type Props = {
  projectId: string;
  collectionName: string;
  knowledge: FragmentDTO[];
  lang: Locale;
  visibility: string;
};

const FragmentList = ({
  projectId,
  visibility,
  collectionName,
  knowledge,
  lang,
}: Props) => {
  const searchString = useKnowledgeStore((state) => state.searchString);
  return (
    <>
      <div className="grid grid-cols-2">
        <h4 className="text-lg font-semibold">Content</h4>
        <h4 className="text-lg font-semibold">Metadata</h4>
      </div>
      <section className="bg-slate-200">
        {knowledge?.map(({ id, pageContent, metadata }, idx) => {
          // if (
          //   searchString &&
          //   !fragment.pageContent
          //     .toLowerCase()
          //     .includes(searchString.toLowerCase())
          // )
          //   return null;
          const booleanArray = JSON.parse(metadata.verified_nppi!) as boolean[];
          return (
            <div key={id} className="grid grid-cols-2">
              <p className="bg-slate-100 p-2">{pageContent}</p>
              <div>
                <p>ID: {id}</p>
                <div>
                  <h4>Classify containing</h4>
                  <ul className="grid grid-cols-11">
                    {booleanArray.map((val, index) => (
                      <form
                        key={NPPIs[index]!.param}
                        action={async (e) => {
                          console.log("Classify Chunk Client");
                          booleanArray[index] = !booleanArray[index];
                          await classifyChunk(
                            projectId,
                            collectionName,
                            id,
                            booleanArray,
                          );
                        }}
                        className="grid grid-rows-2"
                      >
                        <Label className="text-xs">{NPPIs[index]!.label}</Label>
                        <Button
                          type="submit"
                        >
                          {val ? (
                            <CheckCheck className="h-6 w-6" />
                          ) : (
                            <CrossCircledIcon className="h-6 w-6" />
                          )}
                        </Button>
                        {/* <p>{val ? "true" : "false"}</p> */}
                      </form>
                    ))}
                  </ul>
                </div>
                <p>Sentences: {metadata.sentences}</p>
              </div>
            </div>
          );
        })}
      </section>
    </>
  );
};

export default FragmentList;
