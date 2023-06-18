import { createReadStream, createWriteStream } from "fs";
import { resolve } from "path";
import { pipeline } from "stream/promises";
import { createUnzip } from "zlib";
import { getDirname } from "../utils/index.js";

const decompress = async () => {
  const __dirname = getDirname(import.meta.url);

  const filePath = resolve(__dirname, "files/fileToCompress.txt");
  const archivePath = resolve(__dirname, "files/archive.gz");

  const rs = createReadStream(archivePath);
  const ws = createWriteStream(filePath);

  try {
    await pipeline(rs, createUnzip(), ws);
    console.log("File decompressed");
  } catch (error) {
    console.error(error);
  }
};

await decompress();
