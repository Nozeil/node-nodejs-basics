import { getDirname, FileSystemError } from "../utils/index.js";
import { resolve } from "path";
import { readFile } from "fs/promises";

const read = async () => {
  try {
    const __dirname = getDirname(import.meta.url);
    const path = resolve(__dirname, "files/fileToRead.txt");
    const file = await readFile(path, "utf-8");
    console.log(file);
  } catch (error) {
    if (error?.code === "ENOENT") {
      throw new FileSystemError();
    }

    throw error;
  }
};

try {
  await read();
} catch (error) {
  console.error(error);
}
