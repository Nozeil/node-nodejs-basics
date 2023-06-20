import { rename as fsRename } from "fs/promises";
import { getDirname, FileSystemError } from "../utils/index.js";
import { resolve } from "path";

const rename = async () => {
  try {
    const __dirname = getDirname(import.meta.url);
    const oldPath = resolve(__dirname, "files/wrongFilename.txt");
    const newPath = resolve(__dirname, "files/properFilename.md");

    await fsRename(oldPath, newPath);
    console.log('File renamed');
  } catch (error) {
    if (error?.code === 'ENOENT') {
      throw new FileSystemError();
    }
    
    throw error;
  }
};

try {
  await rename();
} catch (error) {
  console.error(error);
}

