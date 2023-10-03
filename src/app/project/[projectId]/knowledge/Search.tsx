"use client";
import { useKnowledgeStore } from "@/src/store/KnowledgeStore";
import { FunnelIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { MagicWandIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

type Props = { lang: Locale; collectionName: string; sourceDocId?: string };

const Search = ({ lang, collectionName }: Props) => {
  const [searchString, setSearchString] = useKnowledgeStore((state) => [
    state.searchString,
    state.setSearchString,
  ]);
  const { push } = useRouter();
  const submitSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    push(`/knowledge/search/${collectionName}?searchString=${searchString}`);
    setSearchString("");
  };
  return (
    <form
      onSubmit={submitSearch}
      className="flex w-fit flex-1 items-center gap-5 rounded-md bg-white p-2 shadow-md lg:flex-initial"
    >
      <button>
        <MagicWandIcon className="h-6 w-6 text-gray-400" />
      </button>
      <input
        className="flex-1 p-2 outline-none"
        placeholder="Semantic Search"
        type="text"
        value={searchString}
        onChange={(e) => setSearchString(e.target.value)}
      />
      <button type="submit" hidden>
        Semantic Search
      </button>
    </form>
  );
};

export default Search;
