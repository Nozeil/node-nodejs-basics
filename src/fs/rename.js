import { rename as fsRename } from "fs/promises";
import { getDirname } from "../utils/index.js";
import { resolve } from "path";
import { existsSync } from "fs";

const rename = async () => {
  try {
    const __dirname = getDirname(import.meta.url);
    const oldPath = resolve(__dirname, "files/wrongFilename.txt");
    const newPath = resolve(__dirname, "files/properFilename.md");

    const isOldFileExist = existsSync(oldPath);
    const isNewFileExist = existsSync(newPath);

    if (!isOldFileExist || isNewFileExist) {
      throw new FileSystemError();
    }

    await fsRename(oldPath, newPath);
  } catch (error) {
    console.error(error);
  }
};

await rename();
