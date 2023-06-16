import { copyFile, mkdir, opendir } from "fs/promises";
import { FileSystemError, getDirname } from "../utils/index.js";
import { resolve } from "path";
import { existsSync } from "fs";

const copyWithFolders = async (pathFrom, pathTo) => {
  await mkdir(pathTo);
  const dir = await opendir(pathFrom);

  for await (const dirent of dir) {
    const src = resolve(pathFrom, dirent.name);
    const dest = resolve(pathTo, dirent.name);

    if (dirent.isFile()) {
      await copyFile(src, dest);
    } else {
      await copyWithFolders(src, dest);
    }
  }
};

const copy = async () => {
  try {
    const __dirname = getDirname(import.meta.url);
    const filesPath = resolve(__dirname, "files");
    const filesCopyPath = resolve(__dirname, "files_copy");

    const isFilesExist = existsSync(filesPath);
    const isFilesCopyExist = existsSync(filesCopyPath);

    if (!isFilesExist || isFilesCopyExist) {
      throw new FileSystemError();
    } else {
      await copyWithFolders(filesPath, filesCopyPath);
      console.log("Files copied");
    }
  } catch (error) {
    console.error(error);
  }
};

await copy();
