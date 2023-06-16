import { writeFile } from "fs/promises";
import { resolve } from "path";
import { getDirname, FileSystemError } from "../utils/index.js";

const create = async () => {
  try {
    const __dirname = getDirname(import.meta.url);
    const path = resolve(__dirname, "files/fresh.txt");
    const content = "I am fresh and young";

    await writeFile(path, content, { flag: "wx" });
    console.log("File created");
  } catch (error) {
    if (error?.code === 'EEXIST') {
      throw new FileSystemError();
    }

    throw error;
  }
};

try {
  await create();
} catch (error) {
  console.error(error);
}

