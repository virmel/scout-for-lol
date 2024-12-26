#!/usr/bin/env -S deno run -A
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
  package: {
    // package.json properties
    name: "@scout-for-lol/report",
    version: Deno.args[0],
    description: "",
    license: "",
    repository: {
      type: "git",
      url: "git+https://github.com/username/repo.git",
    },
    bugs: {
      url: "https://github.com/username/repo/issues",
    },
    dependencies: {
      "react": "^19.0.0",
      "@types/react": "^19.0.0",
      "twisted": "^1.61.5",
      "zod": "^3.24.1",
      "satori": "^0.12.0",
      "@resvg/resvg-js": "^2.6.2",
      "ts-pattern": "^5.6.0",
      "remeda": "^2.18.0",
      "yoga-wasm-web": "^0.3.3",
    },
  },
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
  },
});
