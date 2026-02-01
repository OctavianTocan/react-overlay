import { defineConfig } from "tsup";
import { copyFileSync, mkdirSync } from "fs";
import { dirname, join } from "path";

export default defineConfig({
  entry: ["src/index.ts"],
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
