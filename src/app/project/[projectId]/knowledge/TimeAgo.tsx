"use client";

import LiveTimestamp from "@/src/components/ui/LiveTimestamp";

type Props = {
  timestamp: string;
  lang: Locale;
};

const TimeAgo = ({ timestamp, lang }: Props) => {
  // Replace spaces and "UTC" to make the string compatible with Date
// Replace spaces and "UTC" to make the string compatible with Date  
const formattedString = timestamp.replace(' ', 'T').replace(' UTC', 'Z');  
  
const date = new Date(formattedString); // Create a Date object 
  return (
    <>
      <LiveTimestamp lang={lang} time={date} />
    </>
  );
};

export default TimeAgo;
