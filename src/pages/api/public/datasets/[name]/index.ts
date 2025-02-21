import { prisma } from "@/src/server/db";
import { type NextApiRequest, type NextApiResponse } from "next";
import { z } from "zod";
import { cors, runMiddleware } from "@/src/features/public-api/server/cors";
import { verifyAuthHeaderAndReturnScope } from "@/src/features/public-api/server/apiAuth";

const DatasetsGetSchema = z.object({
  name: z.string(),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await runMiddleware(req, res, cors);

  // CHECK AUTH
  const authCheck = await verifyAuthHeaderAndReturnScope(
    req.headers.authorization,
  );
  if (!authCheck.validKey)
    return res.status(401).json({
      success: false,
      message: authCheck.error,
    });
  // END CHECK AUTH

  if (authCheck.scope.accessLevel !== "all") {
    return res.status(401).json({
      success: false,
      message:
        "Access denied - need to use basic auth with secret key to GET scores",
    });
  }

  if (req.method === "GET") {
    try {
      console.log(
        "trying to get dataset, project ",
        authCheck.scope.projectId,
        ", body:",
        JSON.stringify(req.body, null, 2),
        ", query:",
        JSON.stringify(req.query, null, 2),
      );
      const { name } = DatasetsGetSchema.parse(req.query);

      const dataset = await prisma.dataset.findFirst({
        where: {
          name: name,
          projectId: authCheck.scope.projectId,
          status: "ACTIVE",
        },
        include: {
          datasetItems: {
            where: {
              status: "ACTIVE",
            },
          },
          datasetRuns: {
            select: {
              name: true,
            },
          },
        },
      });

      if (!dataset) {
        return res.status(404).json({
          success: false,
          message: "Dataset not found or not active",
        });
      }

      const { datasetItems, datasetRuns, ...params } = dataset;
      const output = {
        ...params,
        items: datasetItems,
        runs: datasetRuns.map((run) => run.name),
      };

      return res.status(200).json(output);
    } catch (error: unknown) {
      console.error(error);
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      res.status(400).json({
        success: false,
        message: "Invalid request data",
        error: errorMessage,
      });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
