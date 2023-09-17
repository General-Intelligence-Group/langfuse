// import { Badge } from "@/components/ui/Badge";
// import LiveTimestamp from "@/components/ui/LiveTimestamp";
// import { Button } from "@/components/ui/button";
// import { FragmentMetadataEntity } from "@/lib/middleware/chroma/fragment";
import { FragmentMetadataEntity } from "@/src/utils/middleware/chroma/fragment";
// import parse, { domToReact } from "html-react-parser";
import React from "react";

type Props = {
  visibility: string;
  name: string;
  metadata: FragmentMetadataEntity;
  pageContent: string;
  lang: Locale;
  index: number;
  id: string;
};
// import { HTMLReactParserOptions, Element } from "html-react-parser";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import LiveTimestamp from "@/src/components/ui/LiveTimestamp";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/src/components/ui/hover-card";
import FragmentDetailsHover from "@/src/app/project/[projectId]/knowledge/[collectionName]/FragmentDetailsHover";
// import {
//   HoverCard,
//   HoverCardContent,
//   HoverCardTrigger,
// } from "@/components/ui/hover-card"

// const options: HTMLReactParserOptions = {
//   replace: (domNode) => {
//     if (domNode instanceof Element && domNode.attribs) {
//       // console.log("Replacing element ", domNode);
//       const { attribs, children } = domNode;
//       // console.log(Object.keys(attribs), "attribs keys");
//       // console.log(Object.keys(domNode), "domNode keys");
//       // console.log(domNode.name, "domNode name");
//       // console.log(domNode.type, "domNode type");
//       if (domNode.name === "p") {
//         return <p className="text-xs">{domToReact(children, options)}</p>;
//       }
//       if (domNode.name === "h4") {
//         return <h5 className="font-bold">{domToReact(children, options)}</h5>;
//       }
//       if (domNode.name === "h3") {
//         return <h4 className="text-lg">{domToReact(children, options)}</h4>;
//       }
//       if (domNode.name === "h2") {
//         return <h3 className="text-xs">{domToReact(children, options)}</h3>;
//       }
//       if (domNode.name === "h1") {
//         return <h2 className="xs">{domToReact(children, options)}</h2>;
//       }
//     }
//   },
// };

const FragmentCard = ({
  visibility,
  name,
  metadata,
  pageContent,
  lang,
  index,
}: Props) => {
  console.log(metadata)
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <span className="hover:bg-slate-400 px-2">{pageContent}</span>
        
      </HoverCardTrigger>
      <HoverCardContent className="w-screen h-screen overflow-scroll">
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
