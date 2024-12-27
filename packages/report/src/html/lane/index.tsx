import React from "react";
import { type Lane, LaneSchema } from "@scout/data";
import { encodeBase64 } from "@std/encoding";
import { z } from "zod";

const images: Record<Lane | "unknown", string> = z
  .record(z.union([LaneSchema, z.literal("unknown")]), z.string())
  .refine((obj): obj is Required<typeof obj> =>
    [...LaneSchema.options, "unknown" as const].every((key) => obj[key] != null)
  )
  .parse(
    Object.fromEntries(
      await Promise.all(
        [...LaneSchema.options, "unknown" as const].map(
          async (lane): Promise<[Lane | "unknown", string]> => {
            const image = await Deno.readFile(
              new URL(`assets/${lane}.png`, import.meta.url),
            );
            return [lane, encodeBase64(image)];
          },
        ),
      ),
    ),
  );

export function Lane({ lane }: { lane: Lane | undefined }) {
  return (
    <span style={{ width: "20rem", display: "flex", justifyContent: "center" }}>
      <img
        src={`data:image/png;base64,${images[lane || "unknown"]}`}
        style={{ width: "8rem" }}
      />
    </span>
  );
}
