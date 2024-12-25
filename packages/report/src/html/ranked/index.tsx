import React from "react";
import "react";
import {
  divisionToString,
  Rank,
  Tier,
  TierSchema,
  wasDemoted,
  wasPromoted,
} from "@scout/data";
import { palette } from "../../assets/colors.ts";
import { encodeBase64 } from "@std/encoding";
import { z } from "zod";

const images: Record<Tier, string> = z
  .record(TierSchema, z.string())
  .refine((obj): obj is Required<typeof obj> =>
    TierSchema.options.every((key) => obj[key] != null)
  )
  .parse(
    Object.fromEntries(
      await Promise.all(
        TierSchema.options.map(async (tier): Promise<[Tier, string]> => {
          const image = await Deno.readFile(
            new URL(`assets/Rank=${tier}.png`, import.meta.url)
          );
          return [tier, encodeBase64(image)];
        })
      )
    )
  );

export function RankedBadge({
  oldRank,
  newRank,
}: {
  oldRank: Rank | undefined;
  newRank: Rank;
}) {
  const badge = images[newRank.tier];

  const showPromoted = wasPromoted(oldRank, newRank);
  const showDemoted = wasDemoted(oldRank, newRank);
  return (
    <div
      style={{
        display: "flex",
        position: "relative",
      }}
    >
      <div
        style={{
          color: palette.gold[1],
          fontSize: "6rem",
          display: "flex",
          alignItems: "flex-end",
          gap: "4rem",
          position: "absolute",
          right: "2rem",
          top: "-20rem",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column-reverse",
            alignItems: "stretch",
            gap: "2rem",
          }}
        >
          <span
            style={{
              position: "relative",
              display: "flex",
              alignItems: "flex-end",
            }}
          >
            <img
              src={`data:image/png;base64,${badge}`}
              style={{ width: "24rem" }}
            />
            <span style={{ position: "relative", left: "-8rem", top: "-2rem" }}>
              {divisionToString(newRank.division)}
            </span>
          </span>
          <span style={{ position: "absolute", top: "22rem" }}>
            {showPromoted && `Promoted`}
            {showDemoted && `Demoted`}
          </span>
        </div>
      </div>
    </div>
  );
}
