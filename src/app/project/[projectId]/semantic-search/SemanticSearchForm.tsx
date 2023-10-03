"use client";

import MultiSelectWithSuggestions from "@/src/components/ui/MultiSelectWithSuggestions";
import { CollectionType } from "chromadb/dist/main/types";
import { v4 as uuidv4 } from "uuid";
// import { usePathname } from "next/navigation";

import { startTransition, useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/ui/form";
// import { useToast } from "@/src/components/ui/use-toast";
import {
  SemanticSearchSchemaEntity,
  semanticSearchSchema,
} from "@/src/utils/middleware/chroma/collection";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/src/components/ui/textarea";
import { Button } from "@/src/components/ui/button";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Slider } from "@/src/components/ui/slider";
// import { useRouter } from "next/navigation";
import { Switch } from "@/src/components/ui/switch";
import { Badge } from "@/src/components/ui/badge";
import { usePathname, useRouter } from "next/navigation";
// import { goldenRation } from "@/src/assets/constants";

const FILETYPES: MultiSelectTagDefault[] = [
  { id: uuidv4(), text: "PDF" },
  { id: uuidv4(), text: "MSG" },
  { id: uuidv4(), text: "TXT" },
  { id: uuidv4(), text: "DOCX" },
  { id: uuidv4(), text: "DOC" },
];
const NPPI_TRIGGERS = [
  { id: "date_of_birth", text: "Date of Birth" },
  { id: "social_security_number", text: "Social Security No." },
  {
    id: "state_id_or_drivers_license",
    text: "US Drivers License or State ID No.",
  },
  { id: "passport_number", text: "Passport No." },
  { id: "financial_account_number", text: "Financial Account No." },
  { id: "payment_card_number", text: "Payment Card No." },
  { id: "username_and_password", text: "Online Account Credentials" },
  { id: "biometric_data", text: "Biometric Data" },
  { id: "medical_information", text: "Medical Information" },
  { id: "medical_record_number", text: "Medical Record Number" },
  { id: "health_insurance_info", text: "Health Insurance Information" },
];

type Props = {
  collections: CollectionType[];
  lang: Locale;
  searchParams: SemanticSearchParams;
};
const SemanticSearchForm = ({ collections, searchParams }: Props) => {
  const router = useRouter();
  const { relevance, limit, semantic, q } = searchParams;
  const pathname = usePathname();
  const form = useForm<SemanticSearchSchemaEntity>({
    resolver: zodResolver(semanticSearchSchema),
    defaultValues: {
      relevanceThreshold: relevance ? parseFloat(relevance) : 80,
      numberOfDocs: limit ? parseInt(limit) : 10,
      semantic_switch_people:
        semantic && semantic === "true"
          ? true
          : semantic && semantic === "false"
          ? false
          : true,
      semanticInput: q || "",
    },
  });
  const collectionSuggestions: MultiSelectCollectionTag[] = collections.map(
    (collection) =>
      ({
        id: collection.name,
        text: collection.metadata?.title,
        metadata: collection.metadata as CollectionMetadata,
      }) as MultiSelectCollectionTag,
  );

  const [collectionTags, setCollectionTags] = useState<
    MultiSelectCollectionTag[]
  >(
    collectionSuggestions && collectionSuggestions.length > 0
      ? [collectionSuggestions[collectionSuggestions.length - 1]!]
      : [],
  );
  console.log(collections);
  useEffect(() => {
    console.log("Use effect");
    console.log("collectionTags := ", collectionTags);
    const people: ExtractedPeople = [];
    collectionTags.map(({ metadata }) => {
      // console.log(JSON.stringify(metadata?.people, null, 2));
      console.log("metadata := ", metadata);
      const collectionPeople = JSON.parse(metadata?.people) as ExtractedPeople;
      console.log("collectionPeople := ", collectionPeople);

      const indexedPeople = collectionPeople.map((person) => ({
        ...person,
      }));
      people.push(...indexedPeople);
    });
    console.log("people := ", people);
    const suggestions = people.map(
      (person) =>
        ({
          id: uuidv4(),
          text: `${person.full_name.firstname} ${person.full_name.lastname}`,
          metadata: { ...person },
        }) as MultiSelectTagDefault,
    );
    if (suggestions && suggestions.length > 0 && suggestions[0]) {
      // setPeopleTags([suggestions[0]]);
      setPeopleSuggestions(suggestions);
    }
  }, [collectionTags]);
  const [peopleSuggestions, setPeopleSuggestions] = useState<
    MultiSelectTagDefault[]
  >([]);

  const [peopleTags, setPeopleTags] = useState<MultiSelectTagDefault[]>([]);
  const [nppiTags, setNppiTags] =
    useState<MultiSelectTagDefault[]>(NPPI_TRIGGERS);
  const [fileTypeTags, setFileTypeTags] =
    useState<MultiSelectTagDefault[]>(FILETYPES);
  // const onSubmit = () => {};
  const onSubmit = (data: SemanticSearchSchemaEntity) => {
    console.log("onSubmit Handler started ...", data);
    console.log("fileTypeTags", fileTypeTags);
    const filetypeString = `${fileTypeTags
      .map((type) => `${type.text}`)
      .join(",")}`;
    const peopleString = `${peopleTags
      .map((type) => `${type.id}_${type.text}`.replace(",", ","))
      .join(",")}`;
    const collectionString = `${collectionTags
      .map((type) => `${type.id}_${type.text}`.replace(",", ","))
      .join(",")}`;
    console.log("filetypeString", filetypeString);

    if (data.semanticInput !== "") {
      startTransition(() =>
        router.push(
          `${pathname}?q=${encodeURIComponent(data.semanticInput)}${
            filetypeString !== ""
              ? `&ft=${encodeURIComponent(filetypeString)}`
              : ""
          }${
            collectionTags.length > 0
              ? `&ds=${encodeURIComponent(collectionString)}`
              : ""
          }${
            peopleTags.length > 0
              ? `&p=${encodeURIComponent(peopleString)}`
              : ""
          }&relevance=${encodeURIComponent(
            data.relevanceThreshold,
          )}&limit=${encodeURIComponent(
            data.numberOfDocs,
          )}&semantic=${encodeURIComponent(data.semantic_switch_people)}`,
        ),
      );
    }
    // toast({
    //   title: "You submitted the following values:",
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4"></pre>
    //   ),
    // });
  };

  return (
    <Form {...form}>
      <form
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={form.handleSubmit(onSubmit)}
        // onSubmit={() => form.handleSubmit(onSubmit)}
        className="flex w-full flex-col items-end gap-2 py-2"
      >
        <div className="grid w-full grid-cols-2 gap-4">
          <MultiSelectWithSuggestions
            suggestions={collectionSuggestions}
            tags={collectionTags}
            setTags={setCollectionTags}
            placeholder="Select Datasets ..."
          />
          <MultiSelectWithSuggestions
            suggestions={FILETYPES}
            tags={fileTypeTags}
            setTags={setFileTypeTags}
            placeholder="Select Filetypes ..."
          />
          <MultiSelectWithSuggestions
            suggestions={peopleSuggestions}
            tags={peopleTags}
            setTags={setPeopleTags}
            placeholder="Select People ..."
          />
          <MultiSelectWithSuggestions
            suggestions={NPPI_TRIGGERS}
            tags={nppiTags}
            setTags={setNppiTags}
            placeholder="Select NPPI Triggers ..."
          />
        </div>
        <div className="w-full">
          <FormField
            control={form.control}
            name="semantic_switch_people"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Capture fields?</FormLabel>
                  <FormDescription>
                    Include defined CAPTURE data points for each selected NPPI
                    trigger in dataset Prisma.
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="semanticInput"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-lg">Semantic Input (optional)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={`Type your search query in here e.g. '${
                      peopleTags && peopleTags.length > 0
                        ? peopleTags[0]?.text
                        : `John Doe's`
                    } Banking Accounts and Financial information.'`}
                    {...field}
                  />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid w-full grid-cols-2">
          <FormField
            control={form.control}
            name="numberOfDocs"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>
                  # No. Documents (max.) <Badge>{field.value}</Badge>
                </FormLabel>
                <FormControl>
                  <Slider
                    min={0}
                    max={100}
                    step={1}
                    defaultValue={[field.value]}
                    onValueChange={(vals) => {
                      field.onChange(vals[0]);
                    }}
                  />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="relevanceThreshold"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>
                  Relevance Threshold <Badge>{field.value}</Badge>
                </FormLabel>
                <FormControl>
                  <Slider
                    min={0}
                    max={100}
                    step={0.01}
                    defaultValue={[field.value]}
                    onValueChange={(vals) => {
                      field.onChange(vals[0]);
                    }}
                  />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button className="flex gap-1" type="submit">
          <MagnifyingGlassIcon className="h-8 w-8" />{" "}
          <span className="hidden md:inline">Search</span>
        </Button>
      </form>
    </Form>
  );
};

export default SemanticSearchForm;
