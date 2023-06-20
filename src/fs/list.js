import { readdir } from "fs/promises";
import { FileSystemError, getDirname } from "../utils/index.js";
import { resolve } from "path";

const list = async () => {
  try {
    const __dirname = getDirname(import.meta.url);
    const path = resolve(__dirname, "files");
    const files = await readdir(path);
    console.log(files);
  } catch (error) {
    if (error?.code === "ENOENT") {
      throw new FileSystemError();
    }

    throw error;
  }
};

try {
  await list();
} catch (error) {
  console.error(error);
}
