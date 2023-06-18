import { getDirname } from "../utils/index.js";
import { pipeline } from "stream/promises";
import { resolve } from "path";
import { createWriteStream } from "fs";

const write = async () => {
  const __dirname = getDirname(import.meta.url);
  const path = resolve(__dirname, "files/fileToWrite.txt");

  try {
    await pipeline(process.stdin, createWriteStream(path, {flags: ''}));
  } catch (error) {
    console.error(error);
  }
};

await write();
