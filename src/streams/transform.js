import { stdin, stdout } from "process";
import { Transform } from "stream";
import { pipeline } from "stream/promises";

const reverse = new Transform({
  transform(chunk) {
    let result = "";
    const stringifiedChunk = chunk.toString().trim();

    for (let i = stringifiedChunk.length - 1; i >= 0; i--) {
      result += stringifiedChunk[i];
    }

    this.push(result + "\n");
  },
});

const transform = async () => {
  try {
    await pipeline(stdin, reverse, stdout);
  } catch (error) {
    console.error(error);
  }
};

await transform();
