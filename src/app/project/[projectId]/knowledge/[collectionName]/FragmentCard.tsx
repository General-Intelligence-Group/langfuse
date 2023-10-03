import { type FragmentMetadataEntity } from "@/src/utils/middleware/chroma/fragment";

type Props = {
  visibility: string;
  name: string;
  metadata: FragmentMetadataEntity;
  pageContent: string;
  lang: Locale;
  index: number;
  id: string;
};
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/src/components/ui/hover-card";

const FragmentCard = ({ metadata, pageContent }: Props) => {
  console.log(metadata);
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <span className="px-2 hover:bg-slate-400">{pageContent}</span>
      </HoverCardTrigger>
      <HoverCardContent className="h-screen w-screen overflow-scroll">
        {/* <FragmentDetailsHover metadata={metadata} /> */}
      </HoverCardContent>

      {/* <article className="flex h-full flex-col rounded-lg bg-slate-100 shadow-sm transition-all duration-200 ease-out hover:scale-105 hover:bg-slate-200 hover:shadow-lg dark:bg-slate-800 dark:text-slate-50">
        <div className="flex flex-1 flex-col">
          <div className="flex flex-1 flex-col p-5">
            <h4 className="truncate font-serif font-bold">
              Fragment <Badge variant="default">#{index + 1}</Badge>
            </h4>
            <section className="mt-2 flex-1">
              <div className="md:min-h-7.5 line-clamp-3 overflow-hidden hover:line-clamp-none hover:text-sm md:line-clamp-5 lg:line-clamp-5">
                {pageContent}
              </div>
            </section>
            <footer className="ml-auto space-x-1 pt-5 text-right text-xs italic text-gray-400">
              <p>
                <LiveTimestamp lang={lang} time={metadata.last_modified!} />
              </p>
            </footer>
          </div>
          <div className="flex flex-col items-center gap-2 px-3 pb-4">
        </div>
      </article> */}
    </HoverCard>
  );
};

export default FragmentCard;
