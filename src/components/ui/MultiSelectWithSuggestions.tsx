import React, { Dispatch, SetStateAction } from "react";
import { WithContext as ReactTags } from "react-tag-input";

const KeyCodes = {
  comma: 188,
  enter: 13,
};
import "./tags.css";

const delimiters = [KeyCodes.comma, KeyCodes.enter];
type Props<T> = {
  setTags: Dispatch<SetStateAction<T[]>>;
  tags: T[];
  suggestions: T[];
  placeholder?: string;
  description?: boolean;
};

function MultiSelectWithSuggestions<T extends { id: string; text: string }>({
  setTags,
  tags,
  suggestions,
  placeholder = "Select ... ",
}: Props<T>) {
  const handleDelete = (i: number) => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleAddition = (tag: T) => {
    setTags([...tags, tag]);
  };

  const handleDrag = (tag: T, currPos: number, newPos: number) => {
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    // re-render
    setTags(newTags);
  };

  const reactTags = tags as { id: string; text: string }[];
  const reactSuggestions = suggestions as { id: string; text: string }[];

  return (
    <ReactTags
      classNames={{
        tags: "flex flex-col gap-2 w-full py-2",
        tagInput: "tagInputClass w-full",
        tagInputField: "tagInputFieldClass w-full bg-secondary-foreground/20 p-2",
        selected: "flex gap-5 py-2 flex-wrap",
        tag: "relative border-dotted text-xs flex gap-1 bg-primary-background p-1 px-2 border-2 border-primary rounded-md",
        remove: "removeClass text-primary font-bold rounded-full absolute -top-3 -right-4 border border-slate-500 p-0 bg-slate-600 border-destructive hover:scale-125 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10 border border-gray-100 px-2",
        // suggestions: "suggestionsClass",
        activeSuggestion: "activeSuggestionClass",
        // editTagInput: "editTagInputClass",
        // editTagInputField: "editTagInputField",
        // clearAll: "bg-destructive text-white p-1",
      }}
      // clearAll
      inline
      tags={reactTags}
      suggestions={reactSuggestions}
      delimiters={delimiters}
      handleDelete={handleDelete}
      handleAddition={
        handleAddition as (tag: { id: string; text: string }) => void
      }
      handleDrag={
        handleDrag as (
          tag: { id: string; text: string },
          currPos: number,
          newPos: number,
        ) => void
      }
      inputFieldPosition="top"
      autocomplete
      placeholder={placeholder}
    />
  );
}

export default MultiSelectWithSuggestions;
