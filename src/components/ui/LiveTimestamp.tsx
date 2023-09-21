"use client";
import germanStrings from "react-timeago/lib/language-strings/de";
import englishStrings from "react-timeago/lib/language-strings/en";
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";

import TimeAgo from "react-timeago";
type Props = { time: Date; lang: Locale };
function LiveTimestamp({ time, lang }: Props) {
  const formatter =
    lang === "de"
      ? buildFormatter(germanStrings)
      : buildFormatter(englishStrings);
  return <TimeAgo formatter={formatter} date={time} />;
}

export default LiveTimestamp;
