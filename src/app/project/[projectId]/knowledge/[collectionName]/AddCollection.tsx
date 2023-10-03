"use client";
import { type z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  type Dispatch,
  type SetStateAction,
  useState,
  useTransition,
} from "react";
const knowledgeVisibility = ["public", "paid", "private"];
import KnowledgeTags from "./KnowledgeTags";
import { type CollectionType } from "chromadb/dist/main/types";
import { type User } from "next-auth";
import { Button } from "@/src/components/ui/button";
import {
  FormMessage,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import { useToast } from "@/src/components/ui/use-toast";
import {
  type CollectionMetadataSchema,
  collectionMetadataSchema,
} from "@/src/utils/middleware/chroma/collection";
import { RadioGroup, RadioGroupItem } from "@/src/components/ui/radio-group";
import { addCollection } from "@/src/utils/actions/collection";
import Spinner from "@/src/components/ui/Spinner";
import { Slider } from "@/src/components/ui/slider";
import { formatNumber } from "@/src/utils/helper";
import { Switch } from "@/src/components/ui/switch";
import ClipboardButton from "@/src/components/ui/ClipboardButton";
import { Badge } from "@/src/components/ui/badge";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/src/components/ui/hover-card";
type Props = {
  lang: Locale;
  availableCollections: CollectionType[];
  user: User | null;
  projectId: string;
  setShowAddForm: Dispatch<SetStateAction<boolean>>;
};
const suggestions = [
  { id: "Vietnam", text: "Vietnam", weight: 0 },
  { id: "Turkey", text: "Turkey", weight: 0 },
  { id: "Thailand", text: "Thailand" },
  { id: "India", text: "India" },
];
import shareGif from "@/src/assets/ShareWithGServiceAccount.gif";
import Image from "next/image";
type Step = {
  id: string;
  title: string;
  text: string;
};
type Steps = Step[];
const STEPS: Steps = [
  {
    id: "embed",
    title: "Ingestion",
    text: "Read Files & Embed Text Documents & Metadata found in Google Drive Folder.",
  },
  { id: "id", title: "Identify", text: "Identify people with NER on-the-fly." },
  {
    id: "nppi_extract",
    title: "NPPI Trigger Flagging & Extraction",
    text: "Automatically flag & extract NPPI triggers.",
  },
  {
    id: "nppi_analysis",
    title: "Analysis Step",
    text: "Enable pre-emptive analysis step before NPPI trigger extraction to give the AI `time to think`.",
  },
  {
    id: "nppi_dd",
    title: "De-Doubling",
    text: "Reflection Step to automatically solve false double-assignments of NPPI triggers.",
  },
  {
    id: "capture_extract",
    title: "Capture Data Points",
    text: "Extract CAPTURE data points for found NPPI triggers.",
  },
  {
    id: "capture_analysis",
    title: "Analysis Step",
    text: "Enable pre-emptive analysis step before data point extraction to give the AI `time to think`.",
  },
  {
    id: "capture_dd",
    title: "De-Doubling",
    text: "Reflection Step to automatically solve false double-assignments of CAPTURE data points.",
  },
];
const THRESHOLDS = [
  // "general_distance_threshold",
  "dob_distance_threshold",
  "ssn_distance_threshold",
  "state_id_distance_threshold",
  "passport_number_distance_threshold",
  "account_number_distance_threshold",
  "card_number_distance_threshold",
  "username_distance_threshold",
  "bio_distance_threshold",
  "medical_distance_threshold",
  "mrn_distance_threshold",
  "insurance_distance_threshold",
] as const;
const GENERATION_MODELS = ["gpt-4", "gpt-3", "platypus2-13b"];
const AddCollection = ({
  // lang,
  // availableCollections,
  user,
  projectId,
  setShowAddForm,
}: Props) => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof collectionMetadataSchema>>({
    resolver: zodResolver(collectionMetadataSchema),
    defaultValues: {
      steps: Array(8).fill(true),
      ingestBatchSize: 3,
      identBatchSize: 3,
      extractBatchSize: 3,
      visibility: "private",
      description: "",
      gdriveId: "1mkW3UBDNHJlYWKS3GI2s16cjxsryGj5m",
      retrievalBreakPoint: 3,
      ident_model: "gpt-3",
      extract_model: "gpt-3",
      embedding_model: "openai",
      analysis_step: true,
      general_distance_threshold: 0,
      embeddingsSize: 1 * 1024 + 1 * 256 + 1 * 128,
      chunkOverlap: 960,
      dob_distance_threshold: 50,
      ssn_distance_threshold: 43.86,
      drivers_distance_threshold: 42.57,
      state_id_distance_threshold: 40.86,
      passport_number_distance_threshold: 0,
      account_number_distance_threshold: 41.96,
      card_number_distance_threshold: 0,
      username_distance_threshold: 47.81,
      email_distance_threshold: 50,
      bio_distance_threshold: 0,
      medical_distance_threshold: 40.34,
      mrn_distance_threshold: 40,
      insurance_distance_threshold: 0,
    },
  });
  const knowledgeTags: KnowledgeTag[] = [];
  const [tags, setTags] = useState<KnowledgeTag[]>(knowledgeTags);

  const [isPending, startTransition] = useTransition();
  function onSubmit(data: z.infer<typeof collectionMetadataSchema>) {
    console.log("tags", tags);

    const collectionCandidate: CollectionMetadataSchema = {
      ...data,
      owner: { name: user?.name || "", id: user?.id || "" },
      publishedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      analysis_step: data.analysis_step || false,
      retrievalBreakPoint: data.retrievalBreakPoint,
      projectId: projectId,
      // tags: tags ? tags : [],
      tags: tags.map((tag) => `${tag.id}:${tag.text}`).join(","),
    };

    startTransition(async () => {
      const response = await addCollection(
        collectionCandidate,
        [
          data.general_distance_threshold,
          data.dob_distance_threshold,
          data.ssn_distance_threshold,
          data.drivers_distance_threshold,
          data.state_id_distance_threshold,
          data.passport_number_distance_threshold,
          data.account_number_distance_threshold,
          data.card_number_distance_threshold,
          data.username_distance_threshold,
          data.email_distance_threshold,
          data.bio_distance_threshold,
          data.medical_distance_threshold,
          data.mrn_distance_threshold,
          data.insurance_distance_threshold,
        ],
        data.gdriveId,
        data.analysis_step,
        data.retrievalBreakPoint,
        data.embeddingsSize,
        data.chunkOverlap,
        [
          data.ident_model === "platypus2-13b"
            ? "gpt-3.5-turbo-0613"
            : data.ident_model,
          data.extract_model === "platypus2-13b"
            ? "gpt-3.5-turbo-0613"
            : data.extract_model,
        ],
        {
          extractBatchSize: data.extractBatchSize,
          identBatchSize: data.identBatchSize,
          ingestBatchSize: data.ingestBatchSize,
        },
      );
      console.log("response", response);
    });

    form.reset();
    setShowAddForm(false);
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">
            {JSON.stringify(collectionCandidate, null, 2)}
          </code>
        </pre>
      ),
    });
  }

  return isPending ? (
    <Spinner />
  ) : (
    <Form {...form}>
      <form
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col items-end gap-6"
      >
        <div className="w-full">
          <h5 className="underline-offset-3 w-full text-center font-sans text-xl font-medium uppercase tracking-widest underline decoration-secondary-foreground">
            General Info
          </h5>
          <HoverCard>
            <HoverCardTrigger asChild>
              <p className="w-full text-center">
                Please share a Google Drive folder with our{" "}
                <b>Google Service Account</b>
                <Badge variant="secondary">
                  <ClipboardButton
                    title="Our Google Service Account"
                    description=""
                    url="subtextai-breach-platform-dev@arete-breach-platform-dev.iam.gserviceaccount.com"
                    id="prisma-service-account"
                  />
                </Badge>
                <br />
                and add the ID of this folder or a subfolder in order to
                securely and efficiently ingest a new dataset.
              </p>
            </HoverCardTrigger>
            <HoverCardContent className="w-3/4">
              <Image
                className="object-fit"
                src={shareGif}
                alt="Sharing Google Drive Folder with our Service Account"
              />
            </HoverCardContent>
          </HoverCard>
        </div>
        <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      placeholder="Collection Title"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 items-end">
              <FormField
                control={form.control}
                name="visibility"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Visibility</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1 md:flex-row"
                      >
                        {knowledgeVisibility.map((category) => (
                          <FormItem
                            key={category}
                            className="flex items-center space-x-3 space-y-0"
                          >
                            <FormControl>
                              <RadioGroupItem value={category} />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {category}
                            </FormLabel>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <KnowledgeTags
                suggestions={suggestions}
                tags={tags}
                setTags={setTags}
              />
            </div>
          </div>
          <div>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Short description (max. 256 chars)"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />{" "}
            <FormField
              control={form.control}
              name="gdriveId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Google Drive File or Folder ID</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. 1mHD6SBDNHJlYWKS3GI2s16c2shzyGj5m"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="w-full">
          <h5 className="underline-offset-3 w-full text-center font-sans text-xl font-medium uppercase tracking-widest underline decoration-secondary-foreground">
            Processing Steps
          </h5>
          <div className="">
            {/* eslint-disable-next-line @typescript-eslint/no-unsafe-call */}
            {STEPS.map(({ title, id, text }: Step, idx: number) => (
              <FormField
                key={id}
                control={form.control}
                name={`steps.${idx}`}
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="mr-8 flex-1 space-y-0.5">
                      <FormLabel className="text-base">
                        {idx + 1}. {title}
                      </FormLabel>
                      <FormDescription>{text}</FormDescription>
                      {field.value && (
                        <div className="w-full">
                          {id === "embed" && (
                            <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-3">
                              <FormField
                                control={form.control}
                                name="ingestBatchSize"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>
                                      No. Concurrent Processes
                                    </FormLabel>
                                    <FormControl>
                                      <Input
                                        type="number"
                                        step={1}
                                        defaultValue={field.value}
                                        max={4}
                                        min={1}
                                        onChange={(e) => {
                                          // Convert the input value to a number using parseInt
                                          const parsedValue = parseInt(
                                            e.target.value,
                                            10,
                                          );
                                          field.onChange(parsedValue); // Update the field value with the parsed number
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
                                name="embeddingsSize"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Embeddings Size</FormLabel>
                                    <FormControl>
                                      <Input
                                        type="number"
                                        step={1}
                                        defaultValue={field.value}
                                        max={4 * 1024}
                                        min={512}
                                        onChange={(e) => {
                                          // Convert the input value to a number using parseInt
                                          const parsedValue = parseInt(
                                            e.target.value,
                                            10,
                                          );
                                          field.onChange(parsedValue); // Update the field value with the parsed number
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
                                name="chunkOverlap"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Chunk Overlap</FormLabel>
                                    <FormControl>
                                      {/* <Input type="number" step={1} max={12} min={1} {...field} /> */}
                                      <Input
                                        type="number"
                                        step={1}
                                        defaultValue={field.value}
                                        max={4 * 1024}
                                        min={0}
                                        onChange={(e) => {
                                          // Convert the input value to a number using parseInt
                                          const parsedValue = parseInt(
                                            e.target.value,
                                            10,
                                          );
                                          field.onChange(parsedValue); // Update the field value with the parsed number
                                        }}
                                      />
                                    </FormControl>
                                    <FormDescription />
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                          )}
                          {id === "id" && (
                            <div className="grid w-full grid-cols-2 gap-4">
                              <FormField
                                control={form.control}
                                name="ident_model"
                                render={({ field }) => (
                                  <FormItem className="space-y-3">
                                    <FormLabel>LLM</FormLabel>
                                    <FormControl>
                                      <RadioGroup
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        className="flex flex-col space-y-1 md:flex-col"
                                      >
                                        {GENERATION_MODELS.map((model) => (
                                          <FormItem
                                            key={model}
                                            className="flex items-center space-x-3 space-y-0"
                                          >
                                            <FormControl>
                                              <RadioGroupItem value={model} />
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                              {model}
                                            </FormLabel>
                                          </FormItem>
                                        ))}
                                      </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                name="identBatchSize"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>
                                      No. Concurrent Processes
                                    </FormLabel>
                                    <FormControl>
                                      <Input
                                        type="number"
                                        step={1}
                                        defaultValue={field.value}
                                        max={5}
                                        min={1}
                                        onChange={(e) => {
                                          // Convert the input value to a number using parseInt
                                          const parsedValue = parseInt(
                                            e.target.value,
                                            10,
                                          );
                                          field.onChange(parsedValue); // Update the field value with the parsed number
                                        }}
                                      />
                                    </FormControl>
                                    <FormDescription />
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                          )}
                          {id === "nppi_extract" && (
                            <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-3">
                              <FormField
                                control={form.control}
                                name="extract_model"
                                render={({ field }) => (
                                  <FormItem className="space-y-3">
                                    <FormLabel>Extraction Model</FormLabel>
                                    <FormControl>
                                      <RadioGroup
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        className="flex flex-col space-y-1 md:flex-col"
                                      >
                                        {GENERATION_MODELS.map((model) => (
                                          <FormItem
                                            key={model}
                                            className="flex items-center space-x-3 space-y-0"
                                          >
                                            <FormControl>
                                              <RadioGroupItem value={model} />
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                              {model}
                                            </FormLabel>
                                          </FormItem>
                                        ))}
                                      </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                name="retrievalBreakPoint"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Retrieval Break Point</FormLabel>
                                    <FormControl>
                                      <Input
                                        type="number"
                                        step={1}
                                        defaultValue={field.value}
                                        min={0}
                                        onChange={(e) => {
                                          // Convert the input value to a number using parseInt
                                          const parsedValue = parseInt(
                                            e.target.value,
                                            10,
                                          );
                                          field.onChange(parsedValue); // Update the field value with the parsed number
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
                                name="extractBatchSize"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>
                                      No. Concurrent Processes
                                    </FormLabel>
                                    <FormControl>
                                      <Input
                                        type="number"
                                        step={1}
                                        defaultValue={field.value}
                                        max={5}
                                        min={1}
                                        onChange={(e) => {
                                          // Convert the input value to a number using parseInt
                                          const parsedValue = parseInt(
                                            e.target.value,
                                            10,
                                          );
                                          field.onChange(parsedValue); // Update the field value with the parsed number
                                        }}
                                      />
                                    </FormControl>
                                    <FormDescription />
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <div className="col-span-3">
                                <h6 className="text-sm font-medium">
                                  Relevance Thresholds
                                </h6>
                                <div className="flex flex-wrap justify-between gap-2">
                                  {THRESHOLDS.map((t) => (
                                    <FormField
                                      control={form.control}
                                      key={t}
                                      name={t}
                                      render={({ field }) => (
                                        <FormItem className="flex-1">
                                          <FormLabel className="text-center uppercase">
                                            {t.split("_")[0]}
                                            <br />
                                            {formatNumber({
                                              numberToFormat: field.value,
                                              maximumFractionDigits: 2,
                                            })}
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
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}
                          {id === "nppi_analysis" && (
                            <div className="grid w-full grid-cols-2 gap-4"></div>
                          )}
                          {id === "nppi_dd" && (
                            <div className="grid w-full grid-cols-2 gap-4"></div>
                          )}
                          {id === "capture_extract" && (
                            <div className="grid w-full grid-cols-2 gap-4"></div>
                          )}
                          {id === "capture_analysis" && (
                            <div className="grid w-full grid-cols-2 gap-4"></div>
                          )}
                          {id === "capture_dd" && (
                            <div className="grid w-full grid-cols-2 gap-4"></div>
                          )}
                        </div>
                      )}
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        // onCheckedChange={field.onChange}
                        onCheckedChange={(checked) => {
                          field.onChange(checked);
                          if (!checked) {
                            for (let j = idx + 1; j < STEPS.length; j++) {
                              form.setValue(`steps.${j}`, false);
                            }
                          } else if (checked && idx > 0) {
                            let prevIdx = idx - 1;
                            while (
                              prevIdx >= 0 &&
                              !form.getValues(`steps.${prevIdx}`)
                            ) {
                              form.setValue(`steps.${prevIdx}`, true);
                              prevIdx--;
                            }
                          }
                        }}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            ))}
          </div>
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default AddCollection;
