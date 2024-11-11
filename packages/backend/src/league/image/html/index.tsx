import satori from "satori";
import { Resvg } from "npm:@resvg/resvg-js@2.6.0";
import React from "react";
import { loadFonts } from "../assets/index.ts";
import { CompletedMatch } from "@discord/data";
import { Report } from "./report.tsx";

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
