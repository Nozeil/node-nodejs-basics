import { createReadStream, createWriteStream } from "fs";
import { resolve } from "path";
import { pipeline } from "stream/promises";
import { createGzip } from "zlib";
import { getDirname } from "../utils/index.js";

const compress = async () => {
  const __dirname = getDirname(import.meta.url);

  const filePath = resolve(__dirname, "files/fileToCompress.txt");
  const archivePath = resolve(__dirname, "files/archive.gz");

  const rs = createReadStream(filePath);
  const ws = createWriteStream(archivePath);

  try {
    await pipeline(rs, createGzip(), ws);
    console.log("File compressed");
  } catch (error) {
    console.error(error);
  }
};

await compress();
