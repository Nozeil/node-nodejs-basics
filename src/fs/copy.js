import { copyFile, mkdir, opendir } from "fs/promises";
import { FileSystemError, getDirname } from "../utils/index.js";
import { resolve } from "path";

const copyWithFolders = async (pathFrom, pathTo) => {
  const dir = await opendir(pathFrom);
  await mkdir(pathTo);

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

    await copyWithFolders(filesPath, filesCopyPath);
    console.log("Files copied");
  } catch (error) {
    if (error?.code === 'ENOENT' || error?.code === 'EEXIST') {
      throw new FileSystemError();
    }

    throw error;
  }
};

try {
  await copy();
} catch (error) {
  console.error(error);
}

