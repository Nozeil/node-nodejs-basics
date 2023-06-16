import { rm } from "fs/promises";
import { FileSystemError, getDirname } from "../utils/index.js";
import { resolve } from "path";

const remove = async () => {
  try {
    const __dirname = getDirname(import.meta.url);
    const path = resolve(__dirname, "files/fileToRemove.txt");
    await rm(path);
    console.log("File deleted");
  } catch (error) {
    if (error?.code === "ENOENT") {
      throw new FileSystemError();
    }

    throw error;
  }
};

try {
  await remove();
} catch (error) {
  console.error(error);
}
