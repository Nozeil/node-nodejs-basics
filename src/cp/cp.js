import { resolve } from "path";
import { getDirname } from "../utils/index.js";
import { fork } from "child_process";
import { stdin, stdout } from "process";

const spawnChildProcess = async (args) => {
  const __dirname = getDirname(import.meta.url);
  const path = resolve(__dirname, "files/script.js");

  fork(path, args);

  // With silent option
  /* 
  const childProcess = fork(path, args, { silent: true });

  childProcess.stdout.pipe(stdout);
  stdin.pipe(childProcess.stdin); 
  */
};

// Put your arguments in function call to test this functionality
spawnChildProcess(/* [someArgument1, someArgument2, ...] */);
