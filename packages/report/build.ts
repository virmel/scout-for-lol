#!/usr/bin/env -S deno run
import { build, emptyDir } from "@deno/dnt";
import { copySync } from "@std/fs";

await emptyDir("./npm");

await build({
  entryPoints: ["./src/index.ts"],
  outDir: "./npm",
  shims: {
    // see JS docs for overview and more options
    deno: true,
  },
  test: false,
  scriptModule: false,
  package: JSON.parse(
    Deno.readTextFileSync("./packaging/package.json").replace(
      "$VERSION",
      Deno.env.get("version") || (() => {
        throw new Error("missing version");
      })(),
    ),
  ),
  importMap: "deno.json",
  filterDiagnostic(diagnostic) {
    if (
      diagnostic.file?.fileName.includes("@std/assert") ||
      diagnostic.file?.fileName.includes("@std/io") ||
      diagnostic.file?.fileName.includes("@std/testing")
    ) {
      return false; // ignore all diagnostics in this file
    }
    // etc... more checks here
    return true;
  },
  postBuild() {
    copySync("src/assets/fonts", "npm/esm/report/src/assets/fonts");
    copySync("src/html/ranked/assets", "npm/esm/report/src/html/ranked/assets");
    copySync("src/html/lane/assets", "npm/esm/report/src/html/lane/assets");
    Deno.copyFileSync(
      "README.md",
      "npm/README.md",
    );
  },
});
