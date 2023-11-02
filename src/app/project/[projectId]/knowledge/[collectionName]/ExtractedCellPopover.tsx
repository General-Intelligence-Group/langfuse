import { Button } from "@/src/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/src/components/ui/popover";
import { formatNumber } from "@/src/utils/helper";
import {
  type FinancialAccount,
  type DataPoint,
  type Address,
  type PaymentCard,
  type Credentials,
} from "@/src/utils/middleware/mongo/ExtractionResults";
import { FullName } from "@/src/utils/middleware/mongo/ExtractionResults";
import { CheckBadgeIcon } from "@heroicons/react/24/outline";
import { DocumentMagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { CrossCircledIcon } from "@radix-ui/react-icons";
import { Footprints } from "lucide-react";
import Link from "next/link";

type Props = {
  values:
    | DataPoint[]
    | FinancialAccount[]
    | Address[]
    | PaymentCard[]
    | Credentials[];
  projectId: string;
  collectionId: string;
  name: FullName;
  type?: string;
};

function ExtractedCellPopover({
  values,
  projectId,
  collectionId,
  type,
  name: { fn, pre, ln, mn },
}: Props) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div>
          <Button variant="outline">Details</Button>
          {values.map(
            ({ chunk_source, relevance_distance, relevance_score }) => (
              <div key={chunk_source} className="grid grid-cols-2 gap-2">
                <span>Dist.</span>
                <span>Score</span>
                {relevance_distance && (
                  <span>
                    {formatNumber({
                      numberToFormat: relevance_distance,
                      minimumFractionDigits: 3,
                      maximumFractionDigits: 3,
                      lang: "de",
                    })}
                  </span>
                )}

                {relevance_score && (
                  <span>
                    {formatNumber({
                      numberToFormat: relevance_score,
                      minimumFractionDigits: 3,
                      maximumFractionDigits: 3,
                      lang: "de",
                    })}
                  </span>
                )}
              </div>
            ),
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-96">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">
              {pre && `${pre} `}
              {fn}
              {mn && ` ${mn}`} {ln}
              {type?.split("_").map((item) => item)}
            </h4>
            <p className="text-sm text-muted-foreground">
              Verify or reject data point extraction.
            </p>
          </div>
          {type &&
            type === "address" &&
            (values as Address[]).map(
              ({
                value: {
                  apartment_no,
                  city,
                  country,
                  state,
                  street,
                  house_no,
                  zip,
                },
                chunk_source,
                document_source,
                observation,
                trace,
              }) => (
                <div
                  key={chunk_source}
                  className="flex h-full w-full items-center justify-between gap-4"
                >
                  <div className="flex items-center justify-end gap-1">
                    <Link
                      title="Go to Document"
                      href={`/project/${projectId}/knowledge/${collectionId}/document/${document_source}`}
                    >
                      <DocumentMagnifyingGlassIcon className="h-8 w-8 duration-150 ease-out hover:scale-105" />
                    </Link>
                    <Link
                      title="Go to Analysis Step"
                      href={`/project/${projectId}/traces/${trace}?observation=${observation}`}
                    >
                      <Footprints className="h-8 w-8 duration-150 ease-out hover:scale-105" />
                    </Link>
                  </div>
                  <span className=" flex-1 text-sm">{`${house_no} ${street} - ${apartment_no} ${zip} ${city} ${state} ${country}`}</span>
                  <div className="grid grid-cols-2 gap-1">
                    <Button title="Verify" variant="default" size="sm">
                      <CheckBadgeIcon className="h-6 w-6" />
                    </Button>
                    <Button title="Reject" variant="destructive" size="sm">
                      <CrossCircledIcon className="h-6 w-6" />
                    </Button>
                  </div>
                </div>
              ),
            )}
          {type &&
            type === "financial_account" &&
            (values as FinancialAccount[]).map(
              ({
                value,
                // : {
                //   flag,
                //   financial_account_number,
                //   account_pin,
                //   routing_number,
                //   security_code,
                // },
                chunk_source,
                document_source,
                observation,
                trace,
              }) => (
                <div
                  key={chunk_source}
                  className="flex h-full w-full items-center justify-between gap-4"
                >
                  <div className="flex items-center justify-end gap-1">
                    <Link
                      title="Go to Document"
                      href={`/project/${projectId}/knowledge/${collectionId}/document/${document_source}`}
                    >
                      <DocumentMagnifyingGlassIcon className="h-8 w-8 duration-150 ease-out hover:scale-105" />
                    </Link>
                    <Link
                      title="Go to Analysis Step"
                      href={`/project/${projectId}/traces/${trace}?observation=${observation}`}
                    >
                      <Footprints className="h-8 w-8 duration-150 ease-out hover:scale-105" />
                    </Link>
                  </div>
                  <span className="grid flex-1 text-xs">
                    {JSON.stringify(value)}
                    {/* {flag && <span>Flag {JSON.stringify(flag)}</span>}
                    {financial_account_number && (
                      <span>Account {financial_account_number}</span>
                    )}
                    {account_pin && (
                      <span>
                        PIN: *{account_pin.charAt(0)}
                        {account_pin.charAt(1)}*
                      </span>
                    )}
                    {security_code && (
                      <span>
                        Access Code: {security_code.charAt(0)}**
                        {security_code.charAt(3)}*****
                      </span>
                    )}
                    {routing_number && (
                      <span>Routing No. {routing_number}</span>
                    )} */}
                  </span>
                  <div className="grid grid-cols-2 gap-1">
                    <Button title="Verify" variant="default" size="sm">
                      <CheckBadgeIcon className="h-6 w-6" />
                    </Button>
                    <Button title="Decline" variant="destructive" size="sm">
                      <CrossCircledIcon className="h-6 w-6" />
                    </Button>
                  </div>
                </div>
              ),
            )}

          {type &&
            type === "payment_card" &&
            (values as PaymentCard[]).map(
              ({
                value: { payment_card_number, expiration_date, cvv },
                chunk_source,
                document_source,
                observation,
                trace,
              }) => (
                <div
                  key={chunk_source}
                  className="flex h-full w-full items-center justify-between gap-4"
                >
                  <div className="flex items-center justify-end gap-1">
                    <Link
                      title="Go to Document"
                      href={`/project/${projectId}/knowledge/${collectionId}/document/${document_source}`}
                    >
                      <DocumentMagnifyingGlassIcon className="h-8 w-8 duration-150 ease-out hover:scale-105" />
                    </Link>
                    <Link
                      title="Go to Analysis Step"
                      href={`/project/${projectId}/traces/${trace}?observation=${observation}`}
                    >
                      <Footprints className="h-8 w-8 duration-150 ease-out hover:scale-105" />
                    </Link>
                  </div>
                  <span className="grid flex-1 text-xs">
                    {payment_card_number && (
                      <span>Card: {payment_card_number}</span>
                    )}
                    {expiration_date && <span>Expires: {expiration_date}</span>}
                    {cvv && <span>CVV: {cvv.charAt(0)}**</span>}
                  </span>
                  <div className="grid grid-cols-2 gap-1">
                    <Button title="Verify" variant="default" size="sm">
                      <CheckBadgeIcon className="h-6 w-6" />
                    </Button>
                    <Button title="Decline" variant="destructive" size="sm">
                      <CrossCircledIcon className="h-6 w-6" />
                    </Button>
                  </div>
                </div>
              ),
            )}
          {type &&
            type === "credentials" &&
            (values as Credentials[]).map(
              ({
                value: { username, password },
                chunk_source,
                document_source,
                observation,
                trace,
              }) => (
                <div
                  key={chunk_source}
                  className="flex h-full w-full items-center justify-between gap-4"
                >
                  <div className="flex items-center justify-end gap-1">
                    <Link
                      title="Go to Document"
                      href={`/project/${projectId}/knowledge/${collectionId}/document/${document_source}`}
                    >
                      <DocumentMagnifyingGlassIcon className="h-8 w-8 duration-150 ease-out hover:scale-105" />
                    </Link>
                    <Link
                      title="Go to Analysis Step"
                      href={`/project/${projectId}/traces/${trace}?observation=${observation}`}
                    >
                      <Footprints className="h-8 w-8 duration-150 ease-out hover:scale-105" />
                    </Link>
                  </div>
                  <span className="grid flex-1 text-xs">
                    {username && <span>User: {username}</span>}
                    {password && (
                      <span>
                        Pass: {password.charAt(0)}**
                        {password.charAt(3)}*****
                      </span>
                    )}
                  </span>
                  <div className="grid grid-cols-2 gap-1">
                    <Button title="Verify" variant="default" size="sm">
                      <CheckBadgeIcon className="h-6 w-6" />
                    </Button>
                    <Button title="Decline" variant="destructive" size="sm">
                      <CrossCircledIcon className="h-6 w-6" />
                    </Button>
                  </div>
                </div>
              ),
            )}
          {type &&
            type === "dob" &&
            values.map(
              ({
                value,
                chunk_source,
                document_source,
                observation,
                trace,
                verified,
              }) => (
                <div
                  key={chunk_source}
                  className="flex h-full w-full items-center justify-between gap-4"
                >
                  <div className="flex items-center justify-end gap-1">
                    <Link
                      title="Go to Document"
                      href={`/project/${projectId}/knowledge/${collectionId}/document/${document_source}`}
                    >
                      <DocumentMagnifyingGlassIcon className="h-8 w-8 duration-150 ease-out hover:scale-105" />
                    </Link>
                    <Link
                      title="Go to Analysis Step"
                      href={`/project/${projectId}/traces/${trace}?observation=${observation}`}
                    >
                      <Footprints className="h-8 w-8 duration-150 ease-out hover:scale-105" />
                    </Link>
                    {/* <Link
                      title="Go to Extraction Step"
                      href={`/project/${projectId}/traces/${trace}?observation=${
                        observation.split("_")[1]
                      }`}
                    >
                      <Footprints className="h-8 w-8 duration-150 ease-out hover:scale-105" />
                    </Link> */}
                  </div>
                  <span className="flex-1 text-sm">
                    {typeof value === "string"
                      ? type === "dob"
                        ? value
                        // new Intl.DateTimeFormat("default", {
                        //     year: "numeric",
                        //     month: "short",
                        //     day: "numeric",
                        //   }).format(new Date(value))
                        : value
                      : value
                      ? "YES"
                      : "NO"}
                  </span>
                  <div className="grid grid-cols-2 gap-1">
                    <Button
                      className="bg-opacity-10 backdrop-blur-sm backdrop-filter"
                      title={verified ? "Revoke Verification" : "Verify"}
                      variant="default"
                      size="sm"
                    >
                      <CheckBadgeIcon className="h-6 w-6" />
                    </Button>
                    <Button title="Decline" variant="destructive" size="sm">
                      <CrossCircledIcon className="h-6 w-6" />
                    </Button>
                  </div>
                </div>
              ),
            )}
          {!type &&
            values.map(
              ({
                value,
                chunk_source,
                document_source,
                observation,
                trace,
                verified,
              }) => (
                <div
                  key={chunk_source}
                  className="flex h-full w-full items-center justify-between gap-4"
                >
                  <div className="flex items-center justify-end gap-1">
                    <Link
                      title="Go to Document"
                      href={`/project/${projectId}/knowledge/${collectionId}/document/${document_source}`}
                    >
                      <DocumentMagnifyingGlassIcon className="h-8 w-8 duration-150 ease-out hover:scale-105" />
                    </Link>
                    <Link
                      title="Go to Analysis Step"
                      href={`/project/${projectId}/traces/${trace}?observation=${observation}`}
                    >
                      <Footprints className="h-8 w-8 duration-150 ease-out hover:scale-105" />
                    </Link>
                    {/* <Link
                      title="Go to Extraction Step"
                      href={`/project/${projectId}/traces/${trace}?observation=${
                        observation.split("_")[1]
                      }`}
                    >
                      <Footprints className="h-8 w-8 duration-150 ease-out hover:scale-105" />
                    </Link> */}
                  </div>
                  <span className="flex-1 text-sm">
                    {typeof value === "string"
                      ? type === "dob"
                        ? new Intl.DateTimeFormat("default", {
                            year: "numeric",
                            month: "short",
                          }).format(new Date(value))
                        : value
                      : value
                      ? "YES"
                      : "NO"}
                  </span>
                  <div className="grid grid-cols-2 gap-1">
                    <Button
                      title={verified ? "Revoke Verification" : "Verify"}
                      variant="default"
                      size="sm"
                    >
                      <CheckBadgeIcon className="h-6 w-6" />
                    </Button>
                    <Button title="Decline" variant="destructive" size="sm">
                      <CrossCircledIcon className="h-6 w-6" />
                    </Button>
                  </div>
                </div>
              ),
            )}
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default ExtractedCellPopover;
