"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTransition } from "react";

const knowledgeVisibility = ["public", "paid", "private"];
import { updateCollection } from "@/src/utils/actions/collection";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/ui/form";
import { Textarea } from "@/src/components/ui/textarea";
import {
  type CollectionDTO,
  type CollectionMetadataSchema,
  collectionMetadataSchema,
} from "@/src/utils/middleware/chroma/collection";
import { useToast } from "@/src/components/ui/use-toast";
import { Input } from "@/src/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/src/components/ui/radio-group";
type Props = {
  lang: Locale;
  metadata: CollectionMetadataSchema;
  collectionName: string;
};

const EditCollection = ({ metadata, collectionName }: Props) => {
  const { title, description, visibility } = metadata;
  const { toast } = useToast();
  const form = useForm<CollectionMetadataSchema>({
    resolver: zodResolver(collectionMetadataSchema),
    defaultValues: { title, description, visibility },
  });

  const [isPending, startTransition] = useTransition();
  console.log("isPending", isPending);
  function onSubmit(data: CollectionMetadataSchema) {
    // console.log("tags", tags);
    const collectionCandidate: Omit<CollectionDTO, "id"> = {
      name: collectionName,
      metadata: {
        ...data,
      },
    };
    startTransition(() => updateCollection(visibility, collectionCandidate));
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
  return (
    <Form {...form}>
      <form
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-6"
      >
        <h1 className="text-4xl">
          <span className="underline">Dataset</span>: <i>{metadata.title}</i>
        </h1>
        
        <div className="flex flex-col justify-between gap-2 md:flex-row">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    disabled
                    // disabled={isPending}
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
                          <RadioGroupItem disabled value={category} />
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
        </div>
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  disabled
                  placeholder="Kurzbeschreibung (256 Zeichen)"
                  {...field}
                />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />

        {/* <Button disabled type="submit">Submit</Button> */}
      </form>
    </Form>
  );
};

export default EditCollection;
