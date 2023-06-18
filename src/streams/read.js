import { createReadStream } from "fs";
import { getDirname } from "../utils/index.js";
import { resolve } from "path";
import { pipeline } from "stream/promises";

const read = async () => {
  const __dirname = getDirname(import.meta.url);
  const path = resolve(__dirname, "files/fileToRead.txt");

  try {
    await pipeline(createReadStream(path), process.stdout);
  } catch (error) {
    console.error(error);
  }
};

await read();
