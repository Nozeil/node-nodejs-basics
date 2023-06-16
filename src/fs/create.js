import { appendFile } from "fs/promises";
import { resolve } from "path";
import { getDirname } from "../utils/index.js";
import { existsSync } from "fs";

const create = async () => {
  try {
    const __dirname = getDirname(import.meta.url);
    const path = resolve(__dirname, "files/fresh.txt");
    const content = "I am fresh and young";
    const isExist = existsSync(path);

    if (isExist) {
      throw Error('FS operation failed')
    } else {
      await appendFile(path, content);
      console.log('File created');
    }
  } catch (error) {
    console.error(error);
  }
};

await create();
