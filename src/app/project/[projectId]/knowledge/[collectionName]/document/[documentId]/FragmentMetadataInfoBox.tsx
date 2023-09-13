import { Badge } from "@/src/components/ui/badge";
import { FragmentMetadataEntity } from "@/src/utils/middleware/chroma/fragment";

type Props = { metadata: FragmentMetadataEntity };

function FragmentMetadataInfoBox({ metadata }: Props) {
  const {
    filetype,
    file_directory,
    sent_to,
    sent_from,
    subject,
    n_char,
    n_token,
  } = metadata;
  return (
    <div>
      <h4 className="flex items-center gap-2 text-lg font-semibold">
        Metadata
      </h4>
      <div className="grid grid-cols-3">
        <div className="col-span-1">
          {n_char && (
            <p className=" flex items-center gap-2">
              <Badge># {n_char}</Badge>
              <span className="font-medium">characters</span>
            </p>
          )}
          {n_token && (
            <p className=" flex items-center gap-2">
              <Badge># {n_token}</Badge>
              <span className="font-medium">token</span>
            </p>
          )}
          {filetype && (
            <p className=" flex items-center gap-2">
              <Badge>{filetype}</Badge>
              <span className="font-medium">file type</span>
            </p>
          )}
          {file_directory && (
            <p className=" flex items-center gap-2">
              <Badge>{file_directory}</Badge>
              <span className="font-medium">source path</span>
            </p>
          )}
        </div>
        <div className="col-span-2">
          {subject && (
            <p className=" flex items-center gap-2">
              <span className="font-medium">Subject: </span>
              <Badge>{subject}</Badge>
            </p>
          )}
          {sent_from && (
            <p className=" flex items-center gap-2">
              <span className="font-medium whitespace-nowrap">Sent from:</span>
              <Badge>{sent_from}</Badge>
            </p>
          )}
          {sent_to && (
            <p className="w-full flex items-center gap-2">
              <span className="font-medium whitespace-nowrap">Sent to:</span>
              <ul className="flex flex-wrap gap-1">
              {sent_to.split(";").map((recipient, idx) => (
                <Badge className="whitespace-nowrap" key={idx}>{recipient}</Badge>
              ))}
              </ul>
            </p>
          )}
        </div>
      </div>
      {/* <pre>{JSON.stringify(metadata, null, 2)}</pre> */}
    </div>
  );
}

export default FragmentMetadataInfoBox;
