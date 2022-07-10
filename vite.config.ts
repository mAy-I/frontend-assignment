import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: path.join(process.cwd(), "./src/client"),
  build: {
    outDir: path.join(process.cwd(), "./src/server/dist"),
    emptyOutDir: true,
  },
});
