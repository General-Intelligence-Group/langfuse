"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Dispatch, SetStateAction, useState, useTransition } from "react";
const knowledgeVisibility = ["public", "paid", "private"];
import KnowledgeTags from "./KnowledgeTags";
import { CollectionType } from "chromadb/dist/main/types";
import { User } from "next-auth";
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
import { CollectionMetadataSchema } from "@/src/utils/middleware/chroma/collection";
import { RadioGroup, RadioGroupItem } from "@/src/components/ui/radio-group";
import { addCollection } from "@/src/utils/actions/collection";
import { Loader2 } from "lucide-react";
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

const THRESHOLDS = [
  "general_distance_threshold",
  "dob_distance_threshold",
  "ssn_distance_threshold",
  "drivers_distance_threshold",
  "state_id_distance_threshold",
  "passport_number_distance_threshold",
  "account_number_distance_threshold",
  "card_number_distance_threshold",
  "username_distance_threshold",
  "email_distance_threshold",
  "bio_distance_threshold",
  "medical_distance_threshold",
  "mrn_distance_threshold",
  "insurance_distance_threshold",
] as const;
const GENERATION_MODELS = ["gpt-4", "gpt-3", "platypus2-13b"];
const EMBEDDING_MODELS = ["openai", "local"];
const AddCollection = ({
  lang,
  availableCollections,
  user,
  projectId,
  setShowAddForm,
}: Props) => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof CollectionMetadataSchema>>({
    resolver: zodResolver(CollectionMetadataSchema),
    defaultValues: {
      visibility: "private",
      description: "",
      sentenceBatchSize: 9,
      ident_model: "gpt-4",
      extract_model: "gpt-4",
      embedding_model: "openai",
      general_distance_threshold: 0.3,
      dob_distance_threshold: 0.5,
      ssn_distance_threshold: 0.42,
      drivers_distance_threshold: 0.35,
      state_id_distance_threshold: 0.35,
      passport_number_distance_threshold: 0.35,
      account_number_distance_threshold: 0.35,
      card_number_distance_threshold: 0.35,
      username_distance_threshold: 0.35,
      email_distance_threshold: 0.35,
      bio_distance_threshold: 0.35,
      medical_distance_threshold: 0.35,
      mrn_distance_threshold: 0.35,
      insurance_distance_threshold: 0.35,
      // general_distance_threshold: 0.4,
      // dob_distance_threshold: 0.45,
      // ssn_distance_threshold: 0.425,
      // drivers_distance_threshold: 0.28,
      // state_id_distance_threshold: 0.425,
      // passport_number_distance_threshold: 0.425,
      // account_number_distance_threshold: 0.425,
      // card_number_distance_threshold: 0.425,
      // username_distance_threshold: 0.325,
      // email_distance_threshold: 0.325,
      // bio_distance_threshold: 0.4,
      // medical_distance_threshold: 0.425,
      // mrn_distance_threshold: 0.29,
      // insurance_distance_threshold: 0.4,
    },
  });
  const knowledgeTags: KnowledgeTag[] = [];
  const [tags, setTags] = useState<KnowledgeTag[]>(knowledgeTags);

  const [isPending, startTransition] = useTransition();
  function onSubmit(data: z.infer<typeof CollectionMetadataSchema>) {
    console.log("tags", tags);

    const collectionCandidate: CollectionMetadata = {
      ...data,
      owner: JSON.stringify(user),
      publishedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),

      projectId: projectId,
      // tags: tags ? tags : [],
      tags: tags.map((tag) => `${tag.id}:${tag.text}`).join(","),
    };
    startTransition(() =>
      addCollection(
        collectionCandidate,
        [
          data.general_distance_threshold!,
          data.dob_distance_threshold!,
          data.ssn_distance_threshold!,
          data.drivers_distance_threshold!,
          data.state_id_distance_threshold!,
          data.passport_number_distance_threshold!,
          data.account_number_distance_threshold!,
          data.card_number_distance_threshold!,
          data.username_distance_threshold!,
          data.email_distance_threshold!,
          data.bio_distance_threshold!,
          data.medical_distance_threshold!,
          data.mrn_distance_threshold!,
          data.insurance_distance_threshold!,
        ],
        data.sentenceBatchSize,
        [
          data.ident_model === "platypus2-13b"
            ? "gpt-3.5-turbo-0613"
            : data.ident_model!,
          data.extract_model === "platypus2-13b"
            ? "gpt-3.5-turbo-0613"
            : data.extract_model!,
        ],
      ),
    );

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
        // action={startTransition(form.handleSubmit(onSubmit))}
        // action={mutationUpdateCollection}

        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto w-2/3 space-y-6"
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    placeholder="Titel der Library"
                    {...field}
                  />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
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
          />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
          <FormField
            control={form.control}
            name="visibility"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Sichtbarkeit</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1 md:flex-col"
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
                      // <SelectItem key={category} value={category}>
                      //   {category}
                      // </SelectItem>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
              <FormField
            control={form.control}
            name="embedding_model"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Embedding Model</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1 md:flex-col"
                  >
                    {EMBEDDING_MODELS.map((model) => (
                      <FormItem
                        key={model}
                        className="flex items-center space-x-3 space-y-0"
                      >
                        <FormControl>
                          <RadioGroupItem value={model} />
                        </FormControl>
                        <FormLabel className="font-normal">{model}</FormLabel>
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
            name="ident_model"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Identification Model</FormLabel>
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
                        <FormLabel className="font-normal">{model}</FormLabel>
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
                        <FormLabel className="font-normal">{model}</FormLabel>
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
            name="sentenceBatchSize"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sentence Batch Size</FormLabel>
                <FormControl>
                  {/* <Input type="number" step={1} max={12} min={1} {...field} /> */}
                  <Input
                    type="number"
                    step={1}
                    max={24}
                    min={1}
                    value={field.value || 7} // Ensure it's a string or an empty string if undefined
                    onChange={(e) => {
                      // Convert the input value to a number using parseInt
                      const parsedValue = parseInt(e.target.value, 10);
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

        <div className="grid grid-cols-5 gap-2">
          {THRESHOLDS.map((t, index) => (
            <FormField
              control={form.control}
              key={t}
              name={t}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase">{t.split("_")[0]}</FormLabel>
                  <FormControl>
                    {/* <Input type="number" step={1} max={12} min={1} {...field} /> */}
                    <Input
                      type="number"
                      step={0.001}
                      // defaultValue={0.45}
                      max={1}
                      min={0}
                      value={field.value || 0} // Ensure it's a string or an empty string if undefined
                      onChange={(e) => {
                        // Convert the input value to a number using parseInt
                        const parsedValue = parseFloat(e.target.value);
                        field.onChange(parsedValue); // Update the field value with the parsed number
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

        <KnowledgeTags
          suggestions={suggestions}
          tags={tags}
          setTags={setTags}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default AddCollection;

function Spinner() {
  return (
    <div className="flex h-3/4 items-center justify-center">
      <Loader2 className="h-full w-full animate-spin" />
    </div>
  );
}
