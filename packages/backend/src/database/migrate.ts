#!/usr/bin/env deno --allow-read --allow-run
import { z } from "zod";

// get the prisma version from deno.json
const version = z.string().parse(
  JSON.parse(await Deno.readTextFile("deno.json")).imports["prisma"].split(
    "@",
  )[1],
);

const command = new Deno.Command("deno", {
  args: [
    "run",
    "--allow-read",
    "--allow-env",
    "--allow-write",
    "--allow-sys",
    "--allow-run",
    "--allow-net",
    `npm:prisma@${version}`,
    "migrate",
    "deploy",
  ],
  stdout: "inherit",
  stderr: "inherit",
});

await command.output();
