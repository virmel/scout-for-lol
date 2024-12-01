import React from "react";
import { round } from "remeda";

export function CreepScore({
  value,
  durationInMinutes,
}: {
  value: number;
  durationInMinutes: number;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "30rem",
      }}
    >
      <span style={{ fontWeight: 700 }}>{value.toLocaleString()} CS</span>
      <span>{round(value / durationInMinutes, 2).toLocaleString()} / min</span>
    </div>
  );
}
