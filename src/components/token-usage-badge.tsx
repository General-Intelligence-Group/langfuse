import { Badge } from "@/src/components/ui/badge";
import { type Observation } from "@prisma/client";

export const TraceAggUsageBadge = (props: { observations: Observation[] }) => {
  const usage = {
    promptTokens: props.observations
      .map((o) => o.promptTokens)
      .reduce((a, b) => a + b, 0),
    completionTokens: props.observations
      .map((o) => o.completionTokens)
      .reduce((a, b) => a + b, 0),
    totalTokens: props.observations
      .map((o) => o.totalTokens)
      .reduce((a, b) => a + b, 0),
    promptCosts: props.observations
      .map(
        (o) =>
          o.promptTokens *
          (o.model === "gpt-3.5-turbo-0613"
            ? 0.0015 / 1000
            : o.model === "gpt-4-0613"
            ? 0.03 / 1000
            : 0),
      )
      .reduce((a, b) => a + b, 0),
    completionCosts: props.observations
      .map(
        (o) =>
          o.completionTokens *
          (o.model === "gpt-3.5-turbo-0613"
            ? 0.002 / 1000
            : o.model === "gpt-4-0613"
            ? 0.06 / 1000
            : 0),
      )
      .reduce((a, b) => a + b, 0),
  };
  return (
    <TokenUsageBadge
      totalCosts={usage.promptCosts + usage.completionCosts}
      {...usage}
    />
  );
};

export const TokenUsageBadge = (
  props: (
    | {
        observation: Observation;
      }
    | {
        promptTokens: number;
        completionTokens: number;
        totalTokens: number;
        promptCosts: number;
        completionCosts: number;
        totalCosts: number;
      }
  ) & {
    inline?: boolean;
  },
) => {
  const totalCosts = "observation" in props ? 0 : props.totalCosts;
  const promptCosts = "observation" in props ? 0 : props.promptCosts;
  const completionCosts = "observation" in props ? 0 : props.completionCosts;

  const usage =
    "observation" in props
      ? {
          promptTokens: props.observation.promptTokens,
          completionTokens: props.observation.completionTokens,
          totalTokens: props.observation.totalTokens,
        }
      : props;

  if (
    usage.promptTokens === 0 &&
    usage.completionTokens === 0 &&
    usage.totalTokens === 0
  )
    return <></>;

  if (props.inline)
    return (
      <>
        <p>{}</p>
        <span>
          {usage.promptTokens} → {usage.completionTokens} (∑ {usage.totalTokens}
          )
        </span>
      </>
    );

  return (
    <>
      <i>Token</i>
      <Badge variant="outline">
        {usage.promptTokens} → {usage.completionTokens} (∑ {usage.totalTokens})
      </Badge>
      <i>Costs</i>
      <Badge variant="outline">
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(promptCosts)}{" "}
        →{" "}
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(completionCosts)}{" "}
        (∑{" "}
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(totalCosts)}
        )
      </Badge>
    </>
  );
};
