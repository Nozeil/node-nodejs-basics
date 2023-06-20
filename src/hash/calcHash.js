import { readFile } from "fs/promises";
import { resolve } from "path";
import { getDirname } from "../utils/index.js";
import { createHash } from "crypto";

const calculateHash = async () => {
  const __dirname = getDirname(import.meta.url);
  const path = resolve(__dirname, 'files/fileToCalculateHashFor.txt');
  const data = await readFile(path);

  const hash = createHash('sha256').update(data).digest('hex');
  console.log(hash);
};

await calculateHash();
