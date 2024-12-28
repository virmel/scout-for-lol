import React from "react";
import { type Lane, LaneSchema } from "@scout/data";
import { encodeBase64 } from "@std/encoding";
import { z } from "zod";

const images: Record<Lane, string> = z
  .record(LaneSchema, z.string())
  .refine((obj): obj is Required<typeof obj> =>
    LaneSchema.options.every((key) => obj[key] != null)
  )
  .parse(
    Object.fromEntries(
      await Promise.all(
        LaneSchema.options.map(async (lane): Promise<[Lane, string]> => {
          const image = await Deno.readFile(
            new URL(`assets/${lane}.svg`, import.meta.url),
          );
          return [lane, encodeBase64(image)];
        }),
      ),
    ),
  );

export function Lane({ lane }: { lane: Lane }) {
  return (
    <span style={{ width: "20rem", display: "flex", justifyContent: "center" }}>
      <img
        src={`data:image/svg+xml;base64,${images[lane]}`}
        style={{ width: "8rem" }}
      />
    </span>
  );
}
