import React, { Dispatch, SetStateAction } from "react";
import { WithContext as ReactTags } from "react-tag-input";

const KeyCodes = {
  comma: 188,
  enter: 13,
};
import "./tags.css";

const delimiters = [KeyCodes.comma, KeyCodes.enter];
type Props = {
  setTags:
    | Dispatch<SetStateAction<MultiSelectTagDefault[]>>
    | Dispatch<SetStateAction<MultiSelectTagDefault[]>>;
  // | []
  tags: MultiSelectTagDefault[] | MultiSelectCollectionTag[];
  suggestions: MultiSelectTagDefault[] | MultiSelectCollectionTag[];
  placeholder?: string;
  description?: boolean;
};

function MultiSelectWithSuggestions({
  setTags,
  tags,
  suggestions,
  placeholder = "Select ... ",
}: Props) {
  const handleDelete = (i: number) => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleAddition = (
    tag: MultiSelectTagDefault | MultiSelectCollectionTag,
  ) => {
    setTags([...tags, tag]);
  };

  const handleDrag = (
    tag: MultiSelectTagDefault | MultiSelectCollectionTag,
    currPos: number,
    newPos: number,
  ) => {
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    // re-render
    setTags(newTags);
  };

  const handleTagClick = (index: number) => {
    console.log("The tag at index " + index + " was clicked");
  };
  return (
    <ReactTags
      inline
      tags={tags}
      suggestions={suggestions}
      delimiters={delimiters}
      handleDelete={handleDelete}
      handleAddition={handleAddition}
      handleDrag={handleDrag}
      handleTagClick={handleTagClick}
      inputFieldPosition="top"
      autocomplete
      placeholder={placeholder}
    />
  );
}

export default MultiSelectWithSuggestions;
