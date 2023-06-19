import { getDirname } from "../utils/index.js";
import { resolve } from "path";
import { Worker } from "worker_threads";
import { cpus } from "os";

const performCalculations = async () => {
  const __dirname = getDirname(import.meta.url);
  const path = resolve(__dirname, "worker.js");

  const threads = cpus().length;
  const workersPool = [];

  for (let i = 0, workerData = 10; i < threads; i++, workerData++) {
    const asyncWorker = new Promise((res, rej) => {
      const worker = new Worker(path, { workerData });

      worker.on("message", res);
      worker.on("error", rej);
    });

    workersPool.push(asyncWorker);
  }

  const result = (await Promise.allSettled(workersPool)).map((item) =>
    item.status === "fulfilled"
      ? { status: "resolved", data: item.value }
      : { status: "error", data: null }
  );

  console.log(result);
};

await performCalculations();
