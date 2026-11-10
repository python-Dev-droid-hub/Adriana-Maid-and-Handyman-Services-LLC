import fs from "node:fs";

const path =
  "d:/Projects/Adriana Maid and Handyman Services LLC/components/ui/liquid-glass-wordmark-footer.tsx";
let src = fs.readFileSync(path, "utf8");

const start = src.indexOf("/* Embedded font");
const endMarker = "const font = new FontLoader().parse(typeface);";
const end = src.indexOf(endMarker);

if (start < 0 || end < 0) {
  console.error("markers not found", { start, end });
  process.exit(1);
}

src = `${src.slice(0, start)}const font = new FontLoader().parse(helvetikerBold as never);${src.slice(end + endMarker.length)}`;

if (!src.includes("helvetiker_bold.typeface.json")) {
  src = src.replace(
    'import { FontLoader } from "three/addons/loaders/FontLoader.js";',
    `import { FontLoader } from "three/addons/loaders/FontLoader.js";
import helvetikerBold from "@/lib/fonts/helvetiker_bold.typeface.json";`,
  );
}

fs.writeFileSync(path, src);
console.log("patched bytes", fs.statSync(path).size);
