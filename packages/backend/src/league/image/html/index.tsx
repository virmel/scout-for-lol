import satori from "satori";
import { init } from "satori/wasm";
import { Resvg } from "@resvg/resvg-js";
import React from "react";
import { loadFonts } from "../assets/index.ts";
import { CompletedMatch } from "@discord/data";
import { Report } from "./report.tsx";

import cacheDir from "cache_dir/mod.ts";
import initYoga, { type Yoga } from "yoga-wasm-web";

// https://github.com/anasrar/satori-resvg
const wasm = await Deno.readFile(
  `${cacheDir()}/deno/npm/registry.npmjs.org/yoga-wasm-web/0.3.3/dist/yoga.wasm`
);
const yoga = await (
  initYoga as unknown as (wasm: Uint8Array) => Promise<unknown>
)(wasm);
init(yoga as Yoga);

export async function matchToImage(match: CompletedMatch) {
  const svg = await matchToSvg(match);
  const png = svgToPng(svg);
  return png;
}

export async function matchToSvg(match: CompletedMatch) {
  const fonts = await loadFonts();
  const svg = await satori(<Report match={match} />, {
    width: 4760,
    height: 3500,
    fonts,
  });
  return svg;
}

export function svgToPng(svg: string) {
  const resvg = new Resvg(svg, {
    dpi: 600,
    shapeRendering: 2,
    textRendering: 2,
    imageRendering: 0,
  });
  const pngData = resvg.render();
  return pngData.asPng();
}
