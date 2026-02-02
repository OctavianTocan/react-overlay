import { defineConfig } from "tsup";
import { copyFileSync, mkdirSync } from "fs";
import { join } from "path";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    "bottom-sheet": "src/bottom-sheet/index.ts",
    modal: "src/modal/index.ts",
    hooks: "src/hooks/index.ts",
    types: "src/types/index.ts",
  },
  format: ["esm", "cjs"],
  dts: true,
  splitting: false,
  clean: true,
  treeshake: true,
  external: ["react", "react-dom", "motion", "clsx", "tailwind-merge", "lucide-react"],
  onSuccess: async () => {
    // Copy CSS files to dist
    const distStylesDir = join(process.cwd(), "dist", "styles");
    mkdirSync(distStylesDir, { recursive: true });
    copyFileSync(join(process.cwd(), "src", "styles", "scrollbar.css"), join(distStylesDir, "scrollbar.css"));
    console.log("✓ Copied scrollbar.css to dist/styles");
  },
});
