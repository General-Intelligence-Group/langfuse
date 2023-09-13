// import LiveTimestamp from "@/components/ui/LiveTimestamp";
// import { Button } from "@/components/ui/button";
import {
  ChatBubbleBottomCenterIcon,
  LightBulbIcon,
} from "@heroicons/react/24/outline";
import { User } from "next-auth";
import Link from "next/link";
import React from "react";
import DeleteCollectionButton from "./DeleteCollectionButton";
// import ClipboardButton from "@/components/ui/ClipboardButton";
import { Badge } from "@/src/components/ui/badge";
import LiveTimestamp from "@/src/components/ui/LiveTimestamp";
import ClipboardButton from "@/src/components/ui/ClipboardButton";
import { Button } from "@/src/components/ui/button";
import { Loader2 } from "lucide-react";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";
// import { Badge } from "@/components/ui/badge";

type Props = {
  name: string;
  projectId: string;
  metadata: CollectionMetadata;
  lang: Locale;
  user: User | null;
};

const CollectionCard = ({ name, metadata, lang, user, projectId }: Props) => {
  const {
    image,
    title,
    visibility,
    status,
    owner,
    description,
    publishedAt,
    updatedAt,
    sentenceBatchSize,
    thresholds,
  } = metadata;

  return (
    // <Link href={`/knowledge/${name}`}>
    <article className="relative flex h-full flex-col rounded-lg bg-slate-100 shadow-sm transition-all duration-200 ease-out hover:scale-105 hover:bg-slate-200 hover:shadow-lg dark:bg-slate-800 dark:text-slate-100">
      {image && (
        <img
          src={image}
          alt={title}
          className="h-56 w-full rounded-t-lg object-cover shadow-md"
        />
      )}
      <div className="grid w-full grid-cols-3 items-center justify-between px-2">
        <div className="flex flex-col items-start justify-center pt-1">
          {status !== "ready" ? (
            <Loader2 className="h-10 w-10 animate-spin text-red-400" />
          ) : (
            <CheckBadgeIcon className="h-8 w-8 " />
          )}
          <span>{status}</span>
        </div>
        <div className="flex items-center justify-center">
          <Badge className="flex gap-1">
            ID
            <ClipboardButton url={name} sidebar title="" description={name} />
          </Badge>
        </div>
        <div className="flex justify-end">
          <DeleteCollectionButton collectionName={name} />
        </div>
      </div>
      {/* <Button type="button" variant="ghost" className="absolute right-12 top-2">
          <span># ID</span>
          <ClipboardButton url={name} sidebar title="" description={name} />
      </Button> */}
      <div className="flex flex-1 flex-col">
        <div className="flex flex-1 flex-col p-5">
          <h2 className="font-serif font-bold">{title}</h2>
          <section className="mt-2 flex h-full flex-col justify-between gap-2">
            <p className="line-clamp-3 flex-1 hover:line-clamp-none">
              {description}
            </p>
            <footer className="ml-auto mt-2 space-x-1 text-right text-xs italic text-gray-400">
              {sentenceBatchSize && (
                <p>Sentence Batch Size: <Badge>{sentenceBatchSize}</Badge></p>
              )}
              {owner && <p>Owner: {JSON.parse(owner).name}</p>}
              {publishedAt && (
                <p>
                  Published <LiveTimestamp lang={lang} time={publishedAt} />
                </p>
              )}
              {updatedAt && (
                <p>
                  Updated <LiveTimestamp lang={lang} time={updatedAt} />
                </p>
              )}

              {thresholds && (
                <div className="flex flex-wrap gap-1 pt-1">
                  <p>Thresholds</p>
                  {JSON.parse(thresholds).map((t: number) => (
                    <Badge>{t}</Badge>
                  ))}
                </div>
              )}
            </footer>
            <div className="flex flex-col items-center gap-2">
              <div className="flex gap-1">
                <Button title="Chat with Knowledge">
                  Chat with Data{" "}
                  <ChatBubbleBottomCenterIcon className="h-8 w-8" />
                </Button>
                <Button>
                  Extract Knowledge
                  <LightBulbIcon className="h-8 w-8" />
                </Button>
              </div>
              <Link href={`/project/${projectId}/knowledge/${name}`}>
                Details
              </Link>
            </div>
          </section>
        </div>
      </div>
    </article>
    // </Link>
  );
};

export default CollectionCard;
