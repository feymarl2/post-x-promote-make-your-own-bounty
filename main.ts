// Entry program for post-x-promote-make-your-own-bounty-01.
// Reads POST.json (the X post that is this entry), validates its address,
// copies it to /output for the gate, and prints the address.
// Standard library only, no network, deterministic: same input, same output.
import { readFileSync, copyFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const post = JSON.parse(readFileSync(join(root, "POST.json"), "utf8")) as Record<
  string,
  unknown
>;
const url = (post.url ?? "") as string;
if (!/^https:\/\/x\.com\/[A-Za-z0-9_]+\/status\/\d+$/.test(url)) {
  console.error("POST.json does not name a valid X post URL");
  process.exit(1);
}
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outputDir, { recursive: true });
copyFileSync(join(root, "POST.json"), join(outputDir, "POST.json"));
console.log(url);
